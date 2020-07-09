export const state = () => ({
    providers: [
        {id: 1, path: '/img/preview/slide_1/1.png'},
        {id: 2, path: '/img/preview/slide_1/2.png'},
        {id: 3, path: '/img/preview/slide_1/3.png'},
    ],
    images: []
})

export const actions = {
    async saveProviders(ctx) {
        const data = await fetch('https://backsteelhouse.ru/other-pages/')
        const providers = await data.json()
        ctx.commit('setProviders', await providers.results[1])
    }
}

export const mutations = {
    setProviders: (state, payload) => state.providers = payload,
}

export const getters = {
    getProviders: state => state.providers,
}
