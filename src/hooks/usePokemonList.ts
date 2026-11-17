import { computed, onMounted, ref } from 'vue'
import { usePokemonContext } from '../contexts/pokemon'

const PAGE_SIZE = 48

export function usePokemonList() {
  const { pokemons, loading, error, load } = usePokemonContext()

  const search = ref('')
  const visibleCount = ref(PAGE_SIZE)

  onMounted(load)

  const filtered = computed(() => {
    const q = search.value.trim().toLowerCase()
    if (!q) return pokemons.value
    return pokemons.value.filter(
      (p) =>
        p.name?.fr?.toLowerCase().includes(q) ||
        p.name?.en?.toLowerCase().includes(q) ||
        String(p.pokedex_id) === q,
    )
  })

  const visible = computed(() => filtered.value.slice(0, visibleCount.value))
  const remaining = computed(() => filtered.value.length - visible.value.length)

  function resetPage() {
    visibleCount.value = PAGE_SIZE
  }

  function showMore() {
    visibleCount.value += PAGE_SIZE
  }

  return { search, filtered, visible, remaining, loading, error, resetPage, showMore }
}
