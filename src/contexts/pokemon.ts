import { inject, provide, ref, type InjectionKey, type Ref } from 'vue'
import { fetchPokemonList } from '../lib/tyradex'
import type { Pokemon } from '../types'

export interface PokemonContext {
  pokemons: Ref<Pokemon[]>
  loading: Ref<boolean>
  error: Ref<string | null>
  load: () => Promise<void>
}

export const PokemonContextKey: InjectionKey<PokemonContext> = Symbol('pokemon-context')

export function providePokemonContext(): PokemonContext {
  const pokemons = ref<Pokemon[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  let loaded = false

  async function load() {
    if (loaded || loading.value) return
    loading.value = true
    error.value = null
    try {
      pokemons.value = await fetchPokemonList()
      loaded = true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  const context: PokemonContext = { pokemons, loading, error, load }
  provide(PokemonContextKey, context)
  return context
}

export function usePokemonContext(): PokemonContext {
  const context = inject(PokemonContextKey)
  if (!context) throw new Error('usePokemonContext doit être utilisé sous providePokemonContext')
  return context
}
