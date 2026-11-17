import { ref, watch, type Ref } from 'vue'
import { fetchPokemon } from '../lib/tyradex'
import type { Pokemon } from '../types'

export function usePokemon(id: Ref<string>) {
  const pokemon = ref<Pokemon | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  watch(
    id,
    async (value) => {
      loading.value = true
      error.value = null
      try {
        pokemon.value = await fetchPokemon(value)
      } catch (e) {
        pokemon.value = null
        error.value = e instanceof Error ? e.message : 'Erreur inconnue'
      } finally {
        loading.value = false
      }
    },
    { immediate: true },
  )

  return { pokemon, loading, error }
}
