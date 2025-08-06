import { useState } from 'react'
import { Mon } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { X } from 'lucide-react'

interface TeamSelectorProps {
  mons: Mon[]
  selectedTeam: Mon[]
  activeMon: Mon | null
  onTeamChange: (team: Mon[]) => void
  onActiveMonChange: (mon: Mon | null) => void
}

export function TeamSelector({ mons, selectedTeam, activeMon, onTeamChange, onActiveMonChange }: TeamSelectorProps) {
  const [selectedMonName, setSelectedMonName] = useState<string>("")

  const addToTeam = () => {
    if (!selectedMonName) return
    const mon = mons.find(m => m.Name === selectedMonName)
    if (mon && !selectedTeam.find(t => t.Name === mon.Name)) {
      const newTeam = [...selectedTeam, mon]
      onTeamChange(newTeam)
      if (!activeMon) {
        onActiveMonChange(mon)
      }
      setSelectedMonName("")
    }
  }

  const removeFromTeam = (mon: Mon) => {
    const newTeam = selectedTeam.filter(t => t.Name !== mon.Name)
    onTeamChange(newTeam)
    if (activeMon?.Name === mon.Name) {
      onActiveMonChange(newTeam.length > 0 ? newTeam[0] : null)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Team</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Select value={selectedMonName} onValueChange={setSelectedMonName}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Add mon to team" />
            </SelectTrigger>
            <SelectContent>
              {mons
                .filter(mon => !selectedTeam.find(t => t.Name === mon.Name))
                .map(mon => (
                  <SelectItem key={mon.Name} value={mon.Name}>
                    {mon.Name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <Button onClick={addToTeam} disabled={!selectedMonName}>
            Add
          </Button>
        </div>

        {selectedTeam.length > 0 && (
          <div>
            <h4 className="font-medium mb-2">Team Members</h4>
            <div className="space-y-2">
              {selectedTeam.map(mon => (
                <div key={mon.Name} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-2">
                    <Button
                      variant={activeMon?.Name === mon.Name ? "default" : "outline"}
                      size="sm"
                      onClick={() => onActiveMonChange(mon)}
                    >
                      {activeMon?.Name === mon.Name ? "Active" : "Switch"}
                    </Button>
                    <span className="font-medium">{mon.Name}</span>
                    <div className="flex gap-1">
                      <Badge variant="default" className="text-xs">{mon.Type1}</Badge>
                      {mon.Type2 && (
                        <Badge variant="secondary" className="text-xs">{mon.Type2}</Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromTeam(mon)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeMon && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Active: {activeMon.Name}</h4>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>HP: {activeMon.HP}</div>
              <div>ATK: {activeMon.Attack}</div>
              <div>DEF: {activeMon.Defense}</div>
              <div>SpA: {activeMon.SpecialAttack}</div>
              <div>SpD: {activeMon.SpecialDefense}</div>
              <div>SPD: {activeMon.Speed}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}