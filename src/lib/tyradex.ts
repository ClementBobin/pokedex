import type { Pokemon } from '../types'

const BASE_URL = 'https://tyradex.app/api/v1'

const cache = new Map<string, unknown>()

async function get<T>(path: string): Promise<T> {
  if (cache.has(path)) return cache.get(path) as T
  const res = await fetch(`${BASE_URL}${path}`)
  if (!res.ok) throw new Error(`Erreur API (${res.status})`)
  const data = (await res.json()) as T
  cache.set(path, data)
  return data
}

export async function fetchPokemonList(): Promise<Pokemon[]> {
  const list = await get<Pokemon[]>('/pokemon')
  return list.filter((p) => p.pokedex_id > 0)
}

export function fetchPokemon(id: string | number): Promise<Pokemon> {
  return get<Pokemon>(`/pokemon/${id}`)
}
