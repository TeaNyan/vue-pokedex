<script setup>
import { calculateCardColor } from '@/assets/helpers/calculateCardColor'
import { useStore } from 'vuex'

const props = defineProps({
  pokemon: Object
})
const { pokemon } = props

const store = useStore()

const setSelectedPokemon = (pokemon) => {
  store.dispatch('setSelectedPokemonAction', pokemon)
}
</script>

<template>
  <button
    :class="`${calculateCardColor(pokemon.types[0].type.name)} shadow-md rounded-2xl p-4`"
    @click="() => setSelectedPokemon(pokemon)"
  >
    <div class="grid grid-cols-2">
      <div>
        <h2 class="text-xl font-semibold text-white">
          {{ pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) }}
        </h2>
        <div>
          <ul>
            <li
              v-for="type in pokemon.types"
              :key="type.slot"
              class="rounded-3xl w-fit bg-opacity-20 text-white bg-white py-1 px-4 my-1 text-center items-center border-box"
            >
              {{ type.type.name }}
            </li>
          </ul>
        </div>
      </div>
      <img
        :src="pokemon.sprites.front_default"
        :alt="pokemon.name"
        class="md:w-32 md:h-32 w-36 h-36"
      />
    </div>
  </button>
</template>
