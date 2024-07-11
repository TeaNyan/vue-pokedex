export const getFlavorText = (flavors) => {
  const index = Math.floor(Math.random() * 10)
  return flavors[index].flavor_text
}
