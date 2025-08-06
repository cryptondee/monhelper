import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'

interface SearchFilterProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  typeFilter: string
  onTypeFilterChange: (value: string) => void
  classFilter: string
  onClassFilterChange: (value: string) => void
}

const types = [
  'Yin', 'Yang', 'Earth', 'Water', 'Fire', 'Metal', 'Ice', 'Nature',
  'Lightning', 'Mythic', 'Air', 'Mind', 'Cyber', 'Wild', 'Cosmic'
]

const moveClasses = ['Physical', 'Special', 'Self', 'Other']

export function SearchFilter({ 
  searchTerm, 
  onSearchChange, 
  typeFilter, 
  onTypeFilterChange,
  classFilter,
  onClassFilterChange 
}: SearchFilterProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-2 flex-wrap">
          <Input
            placeholder="Search mons or moves..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="flex-1 min-w-[200px]"
          />
          
          <Select value={typeFilter} onValueChange={onTypeFilterChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {types.map(type => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={classFilter} onValueChange={onClassFilterChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter by class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              {moveClasses.map(cls => (
                <SelectItem key={cls} value={cls}>
                  {cls}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}