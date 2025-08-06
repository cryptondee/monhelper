export interface Mon {
  Id: number
  Name: string
  HP: number
  Attack: number
  Defense: number
  SpecialAttack: number
  SpecialDefense: number
  Speed: number
  Type1: string
  Type2: string | null
  BST: number
  Flavor: string
}

export interface Move {
  Name: string
  Mon: string
  Power: number
  Stamina: number
  Accuracy: number
  Priority: number
  Type: string
  Class: string
  Description: string
  ExtraData: string
}

export interface TypeEffectiveness {
  Attacker: string
  Defender: string
  Multiplier: number
}

export interface MoveRecommendation {
  move: Move
  expectedDamage: number
  effectiveness: number
  hasStab: boolean
}