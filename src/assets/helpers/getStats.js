const getStatName = (name) => {
  switch (name) {
    case 'hp':
      return 'HP'
    case 'attack':
      return 'Attack'
    case 'defense':
      return 'Defense'
    case 'special-attack':
      return 'Sp. Atk'
    case 'special-defense':
      return 'Sp. Def'
    case 'speed':
      return 'Speed'
    default:
      return 'Unknown'
  }
}

export const getStats = (stats) => {
  return stats.map((stat) => {
    return {
      name: getStatName(stat.stat.name),
      value: stat.base_stat
    }
  })
}
