export default {
  state: () => ({
    selectedPokemon: null,
    pokemonList: []
  }),
  actions: {
    setSelectedPokemonAction({ commit }, pokemon) {
      commit('setSelectedPokemon', pokemon)
    },
    setPokemonListAction({ commit }, pokemonList) {
      commit('setPokemonList', pokemonList)
    }
  },
  mutations: {
    setSelectedPokemon(state, pokemon) {
      state.selectedPokemon = pokemon
    },
    setPokemonList(state, pokemonList) {
      state.pokemonList = pokemonList
    }
  },
  getters: {
    selectedPokemon(state) {
      return state.selectedPokemon
    },
    pokemonList(state) {
      return state.pokemonList
    }
  }
}
