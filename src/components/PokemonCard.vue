<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Pokemon } from '../types'

defineProps<{
  pokemon: Pokemon
}>()
</script>

<template>
  <RouterLink :to="`/pokemon/${pokemon.pokedex_id}`" class="card" data-cy="pokemon-card">
    <span class="card-id">#{{ String(pokemon.pokedex_id).padStart(4, '0') }}</span>
    <img class="card-img" :src="pokemon.sprites?.regular" :alt="pokemon.name?.fr" loading="lazy" />
    <h3 class="card-name">{{ pokemon.name?.fr }}</h3>
    <div class="types">
      <img
        v-for="t in pokemon.types ?? []"
        :key="t.name"
        :src="t.image"
        :alt="t.name"
        :title="t.name"
        class="type-icon"
        loading="lazy"
      />
    </div>
  </RouterLink>
</template>

<style scoped lang="scss" src="./PokemonCard.scss"></style>
