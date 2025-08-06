import { Mon, Move, MoveRecommendation } from './types'
import typesData from '@/assets/data/types.json'

const typeChart = new Map<string, number>()
typesData.forEach(entry => {
  typeChart.set(`${entry.Attacker}-${entry.Defender}`, entry.Multiplier)
})

export function getTypeEffectiveness(attackType: string, defenseType1: string, defenseType2: string | null): number {
  let multiplier = typeChart.get(`${attackType}-${defenseType1}`) ?? 1
  
  if (defenseType2) {
    const secondMultiplier = typeChart.get(`${attackType}-${defenseType2}`) ?? 1
    multiplier *= secondMultiplier
  }
  
  return multiplier
}

export function hasStab(move: Move, mon: Mon): boolean {
  return move.Type === mon.Type1 || move.Type === mon.Type2
}

export function calculateExpectedDamage(move: Move, attacker: Mon, defender: Mon): number {
  if (move.Power === 0) return 0
  
  const stab = hasStab(move, attacker) ? 1.5 : 1
  const effectiveness = getTypeEffectiveness(move.Type, defender.Type1, defender.Type2)
  const accuracy = move.Accuracy / 100
  
  return move.Power * stab * effectiveness * accuracy
}

export function recommendMoves(attackerMoves: Move[], attacker: Mon, defender: Mon): MoveRecommendation[] {
  return attackerMoves
    .map(move => ({
      move,
      expectedDamage: calculateExpectedDamage(move, attacker, defender),
      effectiveness: getTypeEffectiveness(move.Type, defender.Type1, defender.Type2),
      hasStab: hasStab(move, attacker)
    }))
    .sort((a, b) => {
      if (b.expectedDamage !== a.expectedDamage) {
        return b.expectedDamage - a.expectedDamage
      }
      if (b.move.Priority !== a.move.Priority) {
        return b.move.Priority - a.move.Priority
      }
      return b.move.Accuracy - a.move.Accuracy
    })
}

export function suggestSwitch(team: Mon[], currentMon: Mon, opponent: Mon, allMoves: Move[]): { mon: Mon, bestMove: MoveRecommendation } | null {
  const currentMoves = allMoves.filter(m => m.Mon === currentMon.Name)
  const currentBest = recommendMoves(currentMoves, currentMon, opponent)[0]
  
  if (!currentBest || currentBest.expectedDamage >= opponent.HP * 0.5) {
    return null
  }
  
  let bestSwitch: { mon: Mon, bestMove: MoveRecommendation } | null = null
  
  for (const teamMon of team) {
    if (teamMon.Name === currentMon.Name) continue
    
    const moves = allMoves.filter(m => m.Mon === teamMon.Name)
    const recommendations = recommendMoves(moves, teamMon, opponent)
    
    if (recommendations.length > 0) {
      const bestMove = recommendations[0]
      if (!bestSwitch || bestMove.expectedDamage > bestSwitch.bestMove.expectedDamage) {
        bestSwitch = { mon: teamMon, bestMove }
      }
    }
  }
  
  return bestSwitch
}