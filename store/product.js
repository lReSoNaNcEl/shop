export const state = () => ({
    product: null
})

export const actions = {
    saveProduct: async (ctx, id) => {
        const data = await fetch(`https://backsteelhouse.ru/product/${id}/`)
        const product = await data.json()
        ctx.commit('setProduct', await product)
    }
}

export const mutations = {
    setProduct: (state, payload) => state.product = payload
}

export const getters = {
    getProduct: state => state.product
}
