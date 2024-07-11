<script setup>
import PokemonList from '@/components/PokemonList.vue'
import SinglePokemon from '@/components/SinglePokemon.vue'
</script>

<template>
  <main>
    <div class="flex justify-center w-full bg-white">
      <div class="max-w-[1200px] w-full py-8">
        <PokemonList />
      </div>
      <div class="h-[850px] sticky top-16">
        <SinglePokemon />
      </div>
    </div>
  </main>
</template>
