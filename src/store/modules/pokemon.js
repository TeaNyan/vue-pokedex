export default {
  state: () => ({
    selectedPokemon: null
  }),
  actions: {
    setSelectedPokemon({ commit }, pokemon) {
      commit('setSelectedPokemon', pokemon)
    }
  },
  mutations: {
    setSelectedPokemon(state, pokemon) {
      state.selectedPokemon = pokemon
    }
  },
  getters: {
    selectedPokemon(state) {
      return state.selectedPokemon
    }
  }
}
