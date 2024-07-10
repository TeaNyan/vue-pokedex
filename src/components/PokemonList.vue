<script setup>
import { reactive, onMounted, onBeforeUnmount, ref } from 'vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import PokemonCard from '@/components/PokemonCard.vue'

const state = reactive({
  selectedPokemon: null,
  pokemonList: [],
  isLoading: true,
  nextUrl: 'https://pokeapi.co/api/v2/pokemon?limit=20'
})

const sentinel = ref(null)

const fetchPokemonData = async (url) => {
  try {
    state.isLoading = true
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  } finally {
    state.isLoading = false
  }
}

const fetchPokemonList = async () => {
  try {
    const response = await fetch(state.nextUrl)
    const data = await response.json()
    state.nextUrl = data.next
    const rawPokemons = data.results
    const newList = []
    for (const pokemon of rawPokemons) {
      const pokemonData = await fetchPokemonData(pokemon.url)
      newList.push(pokemonData)
    }
    state.pokemonList = [...state.pokemonList, ...newList]
  } catch (error) {
    console.error(error)
  } finally {
    state.isLoading = false
  }
}

const handleIntersect = async (entries) => {
  const [entry] = entries
  if (entry.isIntersecting && !state.isLoading && state.nextUrl) {
    await fetchPokemonList()
  }
}

onMounted(() => {
  fetchPokemonList()
  const observer = new IntersectionObserver(handleIntersect, {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  })
  if (sentinel.value) {
    observer.observe(sentinel.value)
  }
})

onBeforeUnmount(() => {
  if (sentinel.value) {
    const observer = new IntersectionObserver(handleIntersect)
    observer.unobserve(sentinel.value)
  }
})
</script>

<template>
  <!-- Pokemon List-->
  <section>
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
      <PokemonCard v-for="pokemon in state.pokemonList" :key="pokemon.id" :pokemon="pokemon" />
    </div>
    <div ref="sentinel" class="text-center py-4">
      <!-- Sentinel Element -->
    </div>
    <div v-if="state.isLoading" class="text-center py-4"><PulseLoader /></div>
  </section>
</template>
