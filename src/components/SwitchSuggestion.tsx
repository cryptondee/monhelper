import { useMemo } from 'react'
import { Mon, Move } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { suggestSwitch } from '@/lib/battle-calculator'
import { ArrowRight } from 'lucide-react'

interface SwitchSuggestionProps {
  team: Mon[]
  activeMon: Mon | null
  opponent: Mon | null
  moves: Move[]
  onSwitchTo: (mon: Mon) => void
}

export function SwitchSuggestion({ team, activeMon, opponent, moves, onSwitchTo }: SwitchSuggestionProps) {
  const suggestion = useMemo(() => {
    if (!activeMon || !opponent || team.length <= 1) return null
    
    return suggestSwitch(team, activeMon, opponent, moves)
  }, [team, activeMon, opponent, moves])

  if (!activeMon || !opponent || team.length <= 1) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Switch Suggestion</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {team.length <= 1 
              ? "Add more mons to your team to see switch suggestions."
              : "Select an active mon and opponent to see switch suggestions."
            }
          </p>
        </CardContent>
      </Card>
    )
  }

  if (!suggestion) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Switch Suggestion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-green-600">
            <span className="font-medium">✓ Stay with {activeMon.Name}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Your current mon has good matchup against the opponent.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full border-orange-200 bg-orange-50/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-700">
          Switch Suggestion
          <Badge variant="outline" className="text-orange-600 border-orange-300">
            Recommended
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">{activeMon.Name}</div>
            <div className="flex gap-1 justify-center mt-1">
              <Badge variant="outline" className="text-xs">{activeMon.Type1}</Badge>
              {activeMon.Type2 && (
                <Badge variant="outline" className="text-xs">{activeMon.Type2}</Badge>
              )}
            </div>
          </div>
          
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          
          <div className="text-center">
            <div className="text-sm font-medium">{suggestion.mon.Name}</div>
            <div className="flex gap-1 justify-center mt-1">
              <Badge variant="default" className="text-xs">{suggestion.mon.Type1}</Badge>
              {suggestion.mon.Type2 && (
                <Badge variant="secondary" className="text-xs">{suggestion.mon.Type2}</Badge>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded p-3 border">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="font-medium">{suggestion.bestMove.move.Name}</div>
              <div className="text-sm text-muted-foreground">
                Best move with {suggestion.mon.Name}
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-green-600">
                {suggestion.bestMove.expectedDamage.toFixed(1)}
              </div>
              <div className="text-xs text-muted-foreground">Expected DMG</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline">{suggestion.bestMove.move.Type}</Badge>
            {suggestion.bestMove.hasStab && (
              <Badge variant="default" className="text-xs">STAB</Badge>
            )}
            <span className="text-sm text-green-600">
              ×{suggestion.bestMove.effectiveness} effectiveness
            </span>
          </div>
        </div>

        <Button 
          onClick={() => onSwitchTo(suggestion.mon)}
          className="w-full"
          variant="default"
        >
          Switch to {suggestion.mon.Name}
        </Button>
      </CardContent>
    </Card>
  )
}