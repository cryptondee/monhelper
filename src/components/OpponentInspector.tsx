import { useState } from 'react'
import { Mon, Move } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'

interface OpponentInspectorProps {
  mons: Mon[]
  moves: Move[]
  selectedOpponent: Mon | null
  onOpponentSelect: (mon: Mon | null) => void
}

export function OpponentInspector({ mons, moves, selectedOpponent, onOpponentSelect }: OpponentInspectorProps) {
  const opponentMoves = selectedOpponent 
    ? moves.filter(move => move.Mon === selectedOpponent.Name)
    : []

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Opponent Inspector</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select 
          value={selectedOpponent?.Name || ""} 
          onValueChange={(value) => {
            const mon = mons.find(m => m.Name === value)
            onOpponentSelect(mon || null)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select opponent mon" />
          </SelectTrigger>
          <SelectContent>
            {mons.map(mon => (
              <SelectItem key={mon.Name} value={mon.Name}>
                {mon.Name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedOpponent && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <Badge variant="default">{selectedOpponent.Type1}</Badge>
              {selectedOpponent.Type2 && (
                <Badge variant="secondary">{selectedOpponent.Type2}</Badge>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-medium text-muted-foreground">HP</div>
                <div className="text-lg font-bold">{selectedOpponent.HP}</div>
              </div>
              <div>
                <div className="font-medium text-muted-foreground">Attack</div>
                <div className="text-lg font-bold">{selectedOpponent.Attack}</div>
              </div>
              <div>
                <div className="font-medium text-muted-foreground">Defense</div>
                <div className="text-lg font-bold">{selectedOpponent.Defense}</div>
              </div>
              <div>
                <div className="font-medium text-muted-foreground">Sp. Attack</div>
                <div className="text-lg font-bold">{selectedOpponent.SpecialAttack}</div>
              </div>
              <div>
                <div className="font-medium text-muted-foreground">Sp. Defense</div>
                <div className="text-lg font-bold">{selectedOpponent.SpecialDefense}</div>
              </div>
              <div>
                <div className="font-medium text-muted-foreground">Speed</div>
                <div className="text-lg font-bold">{selectedOpponent.Speed}</div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Moves</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {opponentMoves.map(move => (
                  <div key={move.Name} className="text-sm border rounded p-2">
                    <div className="flex justify-between items-start">
                      <div className="font-medium">{move.Name}</div>
                      <Badge variant="outline" className="text-xs">{move.Type}</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Power: {move.Power} | Accuracy: {move.Accuracy}% | Priority: {move.Priority}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              {selectedOpponent.Flavor}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}