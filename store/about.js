export const state = () => ({
    about: null
})

export const actions = {
    async saveAbout(ctx) {
        const data = await fetch('https://backsteelhouse.ru/other-pages/')
        const about = await data.json()
        ctx.commit('setAbout', await about.results[0])
    }
}

export const mutations = {
    setAbout: (state, payload) => state.about = payload
}

export const getters = {
    getAbout: state => state.about


}
