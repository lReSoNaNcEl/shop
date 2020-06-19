export const state = () => ({
    menu: null
})

export const actions = {
    saveMenu: async (ctx) => {
        const data = await fetch('https://backsteelhouse.ru/menu/')
        const menu = await data.json()
        ctx.commit('setMenu', await menu.results)
    }
}

export const mutations = {
    setMenu: (state, payload) => state.menu = payload
}

export const getters = {
    getMenu: state => state.menu
}
