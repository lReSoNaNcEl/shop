export const state = () => ({
    product: null
})

export const actions = {
    async saveProduct(ctx, id) {
        const data = await fetch(`https://backsteelhouse.ru/product/${id}/`)
        const product = await data.json()
        data.status === 404 ? ctx.commit('setProduct', null) : ctx.commit('setProduct', await product)
    }
}

export const mutations = {
    setProduct: (state, payload) => state.product = payload
}

export const getters = {
    getProduct: state => state.product
}
