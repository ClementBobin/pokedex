export interface LocalizedName {
  fr: string
  en: string
  jp: string
}

export interface PokemonType {
  name: string
  image: string
}

export interface PokemonSprites {
  regular: string
  shiny: string | null
  gmax?: unknown
}

export interface PokemonStats {
  hp: number
  atk: number
  def: number
  spe_atk: number
  spe_def: number
  vit: number
}

export interface PokemonTalent {
  name: string
  /** true si c'est un talent caché */
  tc: boolean
}

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
