export const state = () => ({
    basket: [],
    totalPrice: null,
    mailResponse: null,
    amountProducts: 0
})

export const actions = {
    async saveMail(ctx, params) {
        const data = await fetch('https://backsteelhouse.ru/create-order/', {
            headers: {'Content-type': 'application/json'},
            method: 'POST',
            body: JSON.stringify(params)
        })
        console.log(JSON.stringify(params, null, 2))
        ctx.commit('setMailResponse', await data.text())
    }
}

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

        if (state.basket.length === 0)
            state.totalPrice = 0
        else
            state.totalPrice = state.basket
                .map(product => product.price)
                .reduce((acc, price) => acc + price)
        state.amountProducts = state.basket.length
    },
    setMailResponse: (state, payload) => state.mailResponse = payload
}

export const getters = {
    getBasket: state => state.basket,
    getTotalPrice: state => state.totalPrice,
    getMailResponse: state => state.mailResponse,
    getAmountProducts: state => state.amountProducts
}

