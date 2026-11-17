<script setup lang="ts">
import PokemonCard from '../components/PokemonCard.vue'
import { usePokemonList } from '../hooks/usePokemonList'

const { search, filtered, visible, remaining, loading, error, resetPage, showMore } =
  usePokemonList()
</script>

<template>
  <section>
    <div class="toolbar">
      <h1>Liste des Pokémon</h1>
      <input
        v-model="search"
        type="search"
        placeholder="Rechercher un nom ou un numéro…"
        data-cy="search"
        @input="resetPage"
      />
    </div>

    <p v-if="loading" class="state">Chargement…</p>
    <p v-else-if="error" class="state error">Impossible de charger les Pokémon : {{ error }}</p>
    <p v-else-if="!filtered.length" class="state">Aucun Pokémon trouvé.</p>

    <div v-else class="grid">
      <PokemonCard v-for="p in visible" :key="p.pokedex_id" :pokemon="p" />
    </div>

    <div v-if="remaining > 0" class="more">
      <button @click="showMore">Voir plus ({{ remaining }} restants)</button>
    </div>
  </section>
</template>

<style scoped lang="scss" src="./HomeView.scss"></style>
