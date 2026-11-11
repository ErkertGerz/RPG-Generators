// Сделал Андрей.
// Типы для public/Data/Akhetyps/space_marine.json — чтобы TypeScript подсказывал поля и ловил опечатки.

export type Characteristic = {
  id: string
  label: string
  name: string
}

export type Tier = {
  id: string
  label: string
  baseCharacteristic: number
  archetypes: string[]
}

export type ArchetypeBonus = {
  roles: string[]
  stats: string[]
  bonus: number
}

export type SpaceMarineData = {
  schemaVersion: number
  id: string
  title: string
  description: string
  sourceNotes: string[]
  testNamePrefix: string
  characteristics: Characteristic[]
  tiers: Tier[]
  archetypeBonuses: ArchetypeBonus[]
  legions: string[]
  warbands: string[]
  beliefs: string[]
  startingSkills: string[]
  startingTalents: string[]
  startingTraits: string[]
  startingEquipment: string[]
  // Ключ — название уровня или архетипа, значение — список вариантов.
  meleeWeaponsByTier: Record<string, string[]>
  rangedWeaponsByTier: Record<string, string[]>
  rangedWeaponsByArchetype: Record<string, string[]>
  armorByTier: Record<string, string[]>
  specialMeleeByArchetype: Record<string, string[]>
}
