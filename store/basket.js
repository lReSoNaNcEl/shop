export const state = () => ({
  basket: []
})

export const mutations = {
  addProduct: (state, payload) => localStorage.setItem(`product-${payload.id}`, JSON.stringify(payload)),
  deleteProduct: (state, id) => {
    for (let product in localStorage)
      if (product === `product-${id}`) {
        localStorage.removeItem(`product-${id}`)
        state.basket.splice(state.basket.indexOf(state.basket.find(product => +product.id === +id)), 1)
      }
  },
  syncBasket: (state) => {
    state.basket = []
    for (let product in localStorage)
      if (/^product-/.test(product))
        state.basket.push(JSON.parse(localStorage[product]))
  }
}

export const getters = {
  getBasket: state => state.basket
}

