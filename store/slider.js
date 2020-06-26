export const state = () => ({
    slider: []

})

export const actions = {
    saveSlider: async ctx => {
        const data = await fetch('https://backsteelhouse.ru/index-pages/')
        const slider = await data.json()
        ctx.commit('setSlider', await slider.results)
    }
}

export const mutations = {
    setSlider: (state, payload) => state.slider = payload
}

export const getters = {
    getSlider: state => state.slider
}
