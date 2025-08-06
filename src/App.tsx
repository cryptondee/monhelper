import { useState, useMemo } from 'react'
import { Mon, Move } from '@/lib/types'
import { OpponentInspector } from '@/components/OpponentInspector'
import { TeamSelector } from '@/components/TeamSelector'
import { MoveRecommender } from '@/components/MoveRecommender'
import { SwitchSuggestion } from '@/components/SwitchSuggestion'
import { SearchFilter } from '@/components/SearchFilter'
import { useLocalStorage } from '@/hooks/useLocalStorage'

import monsData from '@/assets/data/mons.json'
import movesData from '@/assets/data/moves.json'

const mons = monsData as Mon[]
const moves = movesData as Move[]

function App() {
  const [selectedOpponent, setSelectedOpponent] = useLocalStorage<Mon | null>('opponent', null)
  const [selectedTeam, setSelectedTeam] = useLocalStorage<Mon[]>('team', [])
  const [activeMon, setActiveMon] = useLocalStorage<Mon | null>('activeMon', null)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [classFilter, setClassFilter] = useState('all')

  const filteredMons = useMemo(() => {
    return mons.filter(mon => {
      const matchesSearch = searchTerm === '' || 
        mon.Name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = typeFilter === 'all' || 
        mon.Type1 === typeFilter || 
        mon.Type2 === typeFilter
      return matchesSearch && matchesType
    })
  }, [searchTerm, typeFilter])

  const filteredMoves = useMemo(() => {
    return moves.filter(move => {
      const matchesSearch = searchTerm === '' || 
        move.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        move.Mon.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = typeFilter === 'all' || move.Type === typeFilter
      const matchesClass = classFilter === 'all' || move.Class === classFilter
      return matchesSearch && matchesType && matchesClass
    })
  }, [searchTerm, typeFilter, classFilter])

  const handleSwitchTo = (mon: Mon) => {
    setActiveMon(mon)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-4xl font-bold tracking-tight mb-2">Battle Helper</h1>
          <p className="text-lg text-muted-foreground">
            Strategic battle analysis and move recommendations
          </p>
        </div>

        <div className="mb-6">
          <SearchFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            typeFilter={typeFilter}
            onTypeFilterChange={setTypeFilter}
            classFilter={classFilter}
            onClassFilterChange={setClassFilter}
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <OpponentInspector
              mons={filteredMons}
              moves={filteredMoves}
              selectedOpponent={selectedOpponent}
              onOpponentSelect={setSelectedOpponent}
            />

            <TeamSelector
              mons={filteredMons}
              selectedTeam={selectedTeam}
              activeMon={activeMon}
              onTeamChange={setSelectedTeam}
              onActiveMonChange={setActiveMon}
            />
          </div>

          <div className="space-y-6">
            <MoveRecommender
              activeMon={activeMon}
              opponent={selectedOpponent}
              moves={moves}
            />

            <SwitchSuggestion
              team={selectedTeam}
              activeMon={activeMon}
              opponent={selectedOpponent}
              moves={moves}
              onSwitchTo={handleSwitchTo}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App