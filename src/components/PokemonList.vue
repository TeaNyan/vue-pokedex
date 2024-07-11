<script setup>
import { reactive, onMounted, onBeforeUnmount, ref, computed } from 'vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import PokemonCard from '@/components/PokemonCard.vue'
import { useStore } from 'vuex'

const state = reactive({
  isLoading: true,
  nextUrl: 'https://pokeapi.co/api/v2/pokemon?limit=20'
})

const store = useStore()

const pokemonList = computed(() => store.getters.pokemonList)
const selectedPokemon = computed(() => store.getters.selectedPokemon)
const setPokemonList = (list) => store.dispatch('setPokemonListAction', list)

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
    setPokemonList([...pokemonList.value, ...newList])
    if (!selectedPokemon.value) {
      store.dispatch('setSelectedPokemonAction', newList[0])
    } else {
      console.log('Selected Pokemon:', selectedPokemon.value)
    }
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
      <PokemonCard v-for="pokemon in pokemonList" :key="pokemon.id" :pokemon="pokemon" />
    </div>
    <div ref="sentinel" class="text-center py-4">
      <!-- Sentinel Element -->
    </div>
    <div v-if="state.isLoading" class="text-center py-4"><PulseLoader /></div>
  </section>
</template>
