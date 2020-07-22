export const state = () => ({
    links: []
})

export const actions = {
    async saveLinks(ctx) {
        const data = await fetch('https://backsteelhouse.ru/info/')
        const links = await data.json()
        ctx.commit('setLinks', await links)
    }
}

export const mutations = {
    setLinks: (state, payload) => state.links = payload
}

export const getters = {
    getLinks: state => state.links
}
