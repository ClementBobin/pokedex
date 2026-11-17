<script setup lang="ts">
import { computed, ref, toRef, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { usePokemon } from '../hooks/usePokemon'
import type { PokemonStats } from '../types'

const props = defineProps<{
  id: string
}>()

const { pokemon, loading, error } = usePokemon(toRef(props, 'id'))
const shiny = ref(false)

// On revient à la forme normale quand on change de Pokémon
watch(
  () => props.id,
  () => {
    shiny.value = false
  },
)

const image = computed(() =>
  shiny.value && pokemon.value?.sprites?.shiny
    ? pokemon.value.sprites.shiny
    : pokemon.value?.sprites?.regular,
)

const statLabels: Record<keyof PokemonStats, string> = {
  hp: 'PV',
  atk: 'Attaque',
  def: 'Défense',
  spe_atk: 'Att. Spé.',
  spe_def: 'Déf. Spé.',
  vit: 'Vitesse',
}

const stats = computed(() =>
  (Object.keys(statLabels) as (keyof PokemonStats)[]).map((key) => ({
    key,
    label: statLabels[key],
    value: pokemon.value?.stats?.[key] ?? 0,
  })),
)

const prevId = computed(() => Math.max(1, Number(props.id) - 1))
const nextId = computed(() => Number(props.id) + 1)
</script>

<template>
  <section>
    <nav class="nav">
      <RouterLink to="/" class="back">← Retour à la liste</RouterLink>
      <div class="pager">
        <RouterLink v-if="Number(id) > 1" :to="`/pokemon/${prevId}`" class="pager-link">
          ← #{{ String(prevId).padStart(4, '0') }}
        </RouterLink>
        <RouterLink :to="`/pokemon/${nextId}`" class="pager-link">
          #{{ String(nextId).padStart(4, '0') }} →
        </RouterLink>
      </div>
    </nav>

    <p v-if="loading" class="state">Chargement…</p>
    <p v-else-if="error" class="state error">Impossible de charger ce Pokémon : {{ error }}</p>

    <article v-else-if="pokemon" class="detail">
      <div class="hero">
        <img :src="image" :alt="pokemon.name?.fr" class="hero-img" />
        <button v-if="pokemon.sprites?.shiny" class="shiny-btn" @click="shiny = !shiny">
          {{ shiny ? 'Voir la forme normale' : 'Voir la forme chromatique ✨' }}
        </button>
      </div>

      <div class="info">
        <p class="num">#{{ String(pokemon.pokedex_id).padStart(4, '0') }}</p>
        <h1>{{ pokemon.name?.fr }}</h1>
        <p class="sub">{{ pokemon.category }} · Génération {{ pokemon.generation }}</p>

        <div class="types">
          <span v-for="t in pokemon.types ?? []" :key="t.name" class="type">
            <img :src="t.image" :alt="t.name" /> {{ t.name }}
          </span>
        </div>

        <div class="facts">
          <div>
            <strong>Taille</strong><span>{{ pokemon.height ?? '—' }}</span>
          </div>
          <div>
            <strong>Poids</strong><span>{{ pokemon.weight ?? '—' }}</span>
          </div>
        </div>

        <h2>Statistiques</h2>
        <ul class="stats">
          <li v-for="s in stats" :key="s.key">
            <span class="stat-label">{{ s.label }}</span>
            <span class="stat-value">{{ s.value }}</span>
            <span class="bar">
              <span class="fill" :style="{ width: Math.min(s.value / 2.55, 100) + '%' }"></span>
            </span>
          </li>
        </ul>

        <h2>Talents</h2>
        <ul v-if="pokemon.talents?.length" class="talents">
          <li v-for="t in pokemon.talents" :key="t.name" :class="{ hidden: t.tc }">
            {{ t.name }} <small v-if="t.tc">(talent caché)</small>
          </li>
        </ul>
        <p v-else class="empty">Aucun talent connu.</p>
      </div>
    </article>
  </section>
</template>

<style scoped lang="scss" src="./PokemonDetailView.scss"></style>
