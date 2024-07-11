const pokemonTypesColors = {
  grass: 'bg-teal-400',
  fire: 'bg-red-400',
  water: 'bg-blue-400',
  bug: 'bg-yellow-400',
  normal: 'bg-gray-400',
  poison: 'bg-purple-400',
  electric: 'bg-yellow-400',
  ground: 'bg-yellow-400',
  fairy: 'bg-pink-400',
  fighting: 'bg-red-400',
  psychic: 'bg-purple-400',
  rock: 'bg-gray-400',
  steel: 'bg-gray-400',
  ice: 'bg-blue-400',
  ghost: 'bg-purple-400',
  dragon: 'bg-blue-400',
  dark: 'bg-gray-400',
  flying: 'bg-blue-400'
}

export const calculateCardColor = (type) => {
  return pokemonTypesColors[type]
}
