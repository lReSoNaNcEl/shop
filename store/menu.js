export const state = () => ({
    menu: null,
    menuItem: null,
    currentMenuId: null
})

export const actions = {
    saveMenu: async (ctx) => {
        const data = await fetch('https://backsteelhouse.ru/menu/')
        const menu = await data.json()
        ctx.commit('setMenu', await menu.results)
    },
    saveMenuItem: async (ctx, id) => {
        const data = await fetch(`https://backsteelhouse.ru/menu/${id}/`)
        const menuItem = await data.json()
        ctx.commit('setMenuItem', await menuItem)
    }
}

export const mutations = {
    setMenu: (state, payload) => state.menu = payload,
    setMenuItem: (state, payload) => state.menuItem = payload,
    setCurrentMenuId: (state, payload) => state.currentMenuId = payload,
}

export const getters = {
    getMenu: state => state.menu,
    getMenuItem: state => state.menuItem,
    getCurrentMenuId: state => state.currentMenuId,
}
