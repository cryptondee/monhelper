import { 
  Zap, 
  Flame, 
  Droplets, 
  Mountain, 
  Snowflake, 
  Leaf, 
  Wrench, 
  Wind, 
  Brain, 
  Cpu, 
  TreePine, 
  Sparkles, 
  Sun, 
  Moon,
  Stars
} from 'lucide-react'

export interface TypeConfig {
  name: string
  icon: any
  color: string
  darkColor: string
  bgColor: string
  darkBgColor: string
  borderColor: string
  darkBorderColor: string
}

export const typeConfigs: Record<string, TypeConfig> = {
  Yin: {
    name: 'Yin',
    icon: Moon,
    color: 'text-slate-700',
    darkColor: 'text-slate-300',
    bgColor: 'bg-slate-100',
    darkBgColor: 'dark:bg-slate-800',
    borderColor: 'border-slate-300',
    darkBorderColor: 'dark:border-slate-600'
  },
  Yang: {
    name: 'Yang',
    icon: Sun,
    color: 'text-yellow-700',
    darkColor: 'text-yellow-300',
    bgColor: 'bg-yellow-100',
    darkBgColor: 'dark:bg-yellow-900/50',
    borderColor: 'border-yellow-300',
    darkBorderColor: 'dark:border-yellow-600'
  },
  Fire: {
    name: 'Fire',
    icon: Flame,
    color: 'text-red-700',
    darkColor: 'text-red-300',
    bgColor: 'bg-red-100',
    darkBgColor: 'dark:bg-red-900/50',
    borderColor: 'border-red-300',
    darkBorderColor: 'dark:border-red-600'
  },
  Water: {
    name: 'Water',
    icon: Droplets,
    color: 'text-blue-700',
    darkColor: 'text-blue-300',
    bgColor: 'bg-blue-100',
    darkBgColor: 'dark:bg-blue-900/50',
    borderColor: 'border-blue-300',
    darkBorderColor: 'dark:border-blue-600'
  },
  Earth: {
    name: 'Earth',
    icon: Mountain,
    color: 'text-amber-800',
    darkColor: 'text-amber-300',
    bgColor: 'bg-amber-100',
    darkBgColor: 'dark:bg-amber-900/50',
    borderColor: 'border-amber-400',
    darkBorderColor: 'dark:border-amber-600'
  },
  Air: {
    name: 'Air',
    icon: Wind,
    color: 'text-sky-700',
    darkColor: 'text-sky-300',
    bgColor: 'bg-sky-100',
    darkBgColor: 'dark:bg-sky-900/50',
    borderColor: 'border-sky-300',
    darkBorderColor: 'dark:border-sky-600'
  },
  Nature: {
    name: 'Nature',
    icon: Leaf,
    color: 'text-green-700',
    darkColor: 'text-green-300',
    bgColor: 'bg-green-100',
    darkBgColor: 'dark:bg-green-900/50',
    borderColor: 'border-green-300',
    darkBorderColor: 'dark:border-green-600'
  },
  Lightning: {
    name: 'Lightning',
    icon: Zap,
    color: 'text-violet-700',
    darkColor: 'text-violet-300',
    bgColor: 'bg-violet-100',
    darkBgColor: 'dark:bg-violet-900/50',
    borderColor: 'border-violet-300',
    darkBorderColor: 'dark:border-violet-600'
  },
  Ice: {
    name: 'Ice',
    icon: Snowflake,
    color: 'text-cyan-700',
    darkColor: 'text-cyan-300',
    bgColor: 'bg-cyan-100',
    darkBgColor: 'dark:bg-cyan-900/50',
    borderColor: 'border-cyan-300',
    darkBorderColor: 'dark:border-cyan-600'
  },
  Metal: {
    name: 'Metal',
    icon: Wrench,
    color: 'text-gray-700',
    darkColor: 'text-gray-300',
    bgColor: 'bg-gray-100',
    darkBgColor: 'dark:bg-gray-800',
    borderColor: 'border-gray-300',
    darkBorderColor: 'dark:border-gray-600'
  },
  Mind: {
    name: 'Mind',
    icon: Brain,
    color: 'text-pink-700',
    darkColor: 'text-pink-300',
    bgColor: 'bg-pink-100',
    darkBgColor: 'dark:bg-pink-900/50',
    borderColor: 'border-pink-300',
    darkBorderColor: 'dark:border-pink-600'
  },
  Cyber: {
    name: 'Cyber',
    icon: Cpu,
    color: 'text-teal-700',
    darkColor: 'text-teal-300',
    bgColor: 'bg-teal-100',
    darkBgColor: 'dark:bg-teal-900/50',
    borderColor: 'border-teal-300',
    darkBorderColor: 'dark:border-teal-600'
  },
  Wild: {
    name: 'Wild',
    icon: TreePine,
    color: 'text-orange-700',
    darkColor: 'text-orange-300',
    bgColor: 'bg-orange-100',
    darkBgColor: 'dark:bg-orange-900/50',
    borderColor: 'border-orange-300',
    darkBorderColor: 'dark:border-orange-600'
  },
  Mythic: {
    name: 'Mythic',
    icon: Sparkles,
    color: 'text-purple-700',
    darkColor: 'text-purple-300',
    bgColor: 'bg-purple-100',
    darkBgColor: 'dark:bg-purple-900/50',
    borderColor: 'border-purple-300',
    darkBorderColor: 'dark:border-purple-600'
  },
  Cosmic: {
    name: 'Cosmic',
    icon: Stars,
    color: 'text-indigo-700',
    darkColor: 'text-indigo-300',
    bgColor: 'bg-indigo-100',
    darkBgColor: 'dark:bg-indigo-900/50',
    borderColor: 'border-indigo-300',
    darkBorderColor: 'dark:border-indigo-600'
  }
}

export function getTypeConfig(typeName: string): TypeConfig | null {
  return typeConfigs[typeName] || null
}