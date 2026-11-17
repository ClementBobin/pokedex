<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { providePokemonContext } from './contexts/pokemon'

providePokemonContext()
</script>

<template>
  <header class="topbar">
    <RouterLink to="/" class="brand">
      <span class="ball" aria-hidden="true"></span>
      Pokédex
    </RouterLink>
  </header>

  <main class="container">
    <RouterView />
  </main>
</template>
