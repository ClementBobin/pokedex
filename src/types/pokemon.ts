import type { PokemonTalent } from './pokemonTalent'
import type { LocalizedName } from './localizedName'
import type { PokemonSprites } from './pokemonSprites'
import type { PokemonType } from './pokemonType'
import type { PokemonStats } from './pokemonStats'

export interface Pokemon {
  pokedex_id: number
  generation: number
  category: string
  name: LocalizedName
  sprites: PokemonSprites
  types: PokemonType[] | null
  talents: PokemonTalent[] | null
  stats: PokemonStats | null
  height: string | null
  weight: string | null
}
