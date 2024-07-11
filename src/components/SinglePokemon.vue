<script setup>
import { computed, reactive, watch } from 'vue'
import { calculateCardColor } from '@/assets/helpers/calculateCardColor'
import { calculatePokemonId } from '@/assets/helpers/calculatePokemonId'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { useStore } from 'vuex'
import { getFlavorText } from '@/assets/helpers/getFlavorText'
import { getStats } from '@/assets/helpers/getStats'

const store = useStore()
const state = reactive({
  species: null,
  isSpeciesLoading: true,
  stats: []
})

const selectedPokemon = computed(() => store.getters.selectedPokemon)

const fetchSpecies = async (pokemon) => {
  try {
    state.isSpeciesLoading = true
    const response = await fetch(pokemon.species.url)
    const data = await response.json()
    state.species = data
  } catch (error) {
    console.error(error)
  } finally {
    state.isSpeciesLoading = false
  }
}

watch(selectedPokemon, (newPokemon) => {
  if (newPokemon) {
    fetchSpecies(newPokemon)
    state.stats = getStats(newPokemon.stats)
    console.log(newPokemon)
  }
})

const calculateClass = (value) => {
  return `w-[${value}%] h-1 mx-auto my-4 bg-gray-100 border-0 rounded dark:bg-gray-400 col-span-2`
}

console.log(selectedPokemon.value)
</script>

<template>
  <!-- Single Pokemon -->
  <section class="h-full">
    <div class="px-8 py-8 w-[500px] h-full">
      <div
        :class="`${calculateCardColor(selectedPokemon?.types[0]?.type.name) || 'bg-white'} shadow-md rounded-3xl pt-4 h-full`"
      >
        <div v-if="selectedPokemon" class="h-full">
          <div class="h-1/3 flex flex-col justify-start items-center">
            <h2 class="font-semibold text-white text-3xl">
              {{ selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1) }}
            </h2>
            <div class="mt-6 flex flex-row justify-between items-center w-full px-8">
              <div>
                <span
                  v-for="type in selectedPokemon.types"
                  :key="type.slot"
                  class="rounded-3xl w-fit bg-opacity-20 text-white bg-white py-1 px-4 my-1 text-center items-center border-box mx-1"
                >
                  {{ type.type.name }}
                </span>
              </div>
              <div class="text-white text-md">
                {{ calculatePokemonId(selectedPokemon.id) }}
              </div>
            </div>
            <img
              :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png`"
              :alt="selectedPokemon.name"
              class="w-64 h-64 mx-auto"
            />
          </div>
          <div
            class="bg-white rounded-3xl h-2/3 flex flex-col justify-start items-start pt-16 px-6"
          >
            <span class="w-full text-2xl text-center" v-if="state.isSpeciesLoading"
              ><PulseLoader
            /></span>
            <hr class="w-96 h-0.5 mx-auto my-4 bg-gray-100 border-0 rounded dark:bg-gray-400" />
            <div class="w-full">
              <div
                v-for="stat in state.stats"
                :key="stat.name"
                class="grid grid-cols-4 gap-2 w-full justify-start items-start"
              >
                <h1 class="text-md text-gray-500 font-bold col-span-1 text-start">
                  {{ stat.name }}
                </h1>
                <h1 class="text-md text-slate-500 col-span-1 text-center">{{ stat.value }}</h1>
                <hr
                  :class="[
                    `h-1 justify-self-start my-4 ${stat.value > 49 ? 'bg-green-600' : 'bg-red-500'}  border-0 rounded  col-span-2`
                  ]"
                  :style="{ width: `${stat.value > 100 ? 100 : stat.value}%` }"
                />
              </div>
            </div>
            <hr class="w-96 h-0.5 mx-auto my-4 bg-gray-100 border-0 rounded dark:bg-gray-400" />

            <h1 v-if="state.species" class="italic text-md text-slate-500">
              {{ getFlavorText(state.species?.flavor_text_entries) }}
            </h1>
          </div>
        </div>
        <h1 v-else><PulseLoader /></h1>
      </div>
    </div>
  </section>
</template>
