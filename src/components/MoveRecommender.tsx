import { useMemo } from 'react'
import { Mon, Move, MoveRecommendation } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { recommendMoves } from '@/lib/battle-calculator'

interface MoveRecommenderProps {
  activeMon: Mon | null
  opponent: Mon | null
  moves: Move[]
}

function getEffectivenessColor(effectiveness: number): string {
  if (effectiveness === 0) return 'text-gray-500'
  if (effectiveness < 1) return 'text-red-500'
  if (effectiveness === 1) return 'text-foreground'
  if (effectiveness === 2) return 'text-green-500'
  return 'text-green-600'
}

function getEffectivenessText(effectiveness: number): string {
  if (effectiveness === 0) return 'No Effect'
  if (effectiveness < 1) return 'Not Very Effective'
  if (effectiveness === 1) return 'Normal'
  if (effectiveness === 2) return 'Super Effective'
  return 'Ultra Effective'
}

export function MoveRecommender({ activeMon, opponent, moves }: MoveRecommenderProps) {
  const recommendations = useMemo(() => {
    if (!activeMon || !opponent) return []
    
    const monMoves = moves.filter(move => move.Mon === activeMon.Name)
    return recommendMoves(monMoves, activeMon, opponent)
  }, [activeMon, opponent, moves])

  if (!activeMon || !opponent) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Move Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Select an active mon and opponent to see move recommendations.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Move Recommendations</CardTitle>
        <p className="text-sm text-muted-foreground">
          {activeMon.Name} vs {opponent.Name}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div key={rec.move.Name} className="border rounded p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold">#{index + 1}</span>
                  <span className="font-medium">{rec.move.Name}</span>
                  <Badge variant="outline">{rec.move.Type}</Badge>
                  {rec.hasStab && <Badge variant="default" className="text-xs">STAB</Badge>}
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">
                    {rec.expectedDamage.toFixed(1)}
                  </div>
                  <div className="text-xs text-muted-foreground">Expected DMG</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex gap-4">
                  <span>Power: {rec.move.Power}</span>
                  <span>Accuracy: {rec.move.Accuracy}%</span>
                  <span>Priority: {rec.move.Priority > 0 ? '+' : ''}{rec.move.Priority}</span>
                </div>
                <div className={`font-medium ${getEffectivenessColor(rec.effectiveness)}`}>
                  {getEffectivenessText(rec.effectiveness)}
                  {rec.effectiveness !== 1 && ` (×${rec.effectiveness})`}
                </div>
              </div>

              {rec.move.Description && (
                <div className="text-xs text-muted-foreground border-t pt-2">
                  {rec.move.Description}
                </div>
              )}
            </div>
          ))}

          {recommendations.length === 0 && (
            <p className="text-muted-foreground text-center py-4">
              No moves available for {activeMon.Name}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}