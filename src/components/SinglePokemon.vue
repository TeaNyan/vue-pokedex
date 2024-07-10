<script setup>
import { computed } from 'vue'
import { calculateCardColor } from '@/assets/helpers/calculateCardColor'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { useStore } from 'vuex'

const store = useStore()

const selectedPokemon = computed(() => store.getters.selectedPokemon)

console.log(selectedPokemon)
</script>

<template>
  <!-- Single Pokemon -->
  <section class="h-full">
    <div class="px-8 py-8 w-[500px] h-full">
      <div
        :class="`${calculateCardColor(selectedPokemon?.types[0]?.type.name) || 'bg-white'} shadow-md rounded-lg p-4 h-full`"
      >
        <div v-if="selectedPokemon">
          <h2 class="text-xl font-semibold">{{ selectedPokemon.name }}</h2>
          <img
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png`"
            :alt="selectedPokemon.name"
            class="w-32 h-32 mx-auto"
          />
        </div>
        <h1 v-else><PulseLoader /></h1>
      </div>
    </div>
  </section>
</template>
