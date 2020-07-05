export const state = () => ({
    menu: null,
    menuItem: null,
    navigation: null
})

export const actions = {
    async saveMenu(ctx) {
        const data = await fetch('https://backsteelhouse.ru/menu/')
        const menu = await data.json()
        ctx.commit('setMenu', await menu.results)
    },
    async saveMenuItem(ctx, id) {
        const data = await fetch(`https://backsteelhouse.ru/menu/${id}/`)
        const menuItem = await data.json()
        ctx.commit('setMenuItem', await menuItem.menu_item)
        ctx.commit('setNavigation', await menuItem.bread_crumbs)
    }
}

export const mutations = {
    setMenu: (state, payload) => state.menu = payload,
    setMenuItem: (state, payload) => state.menuItem = payload,
    setNavigation: (state, payload) => state.navigation = payload,
    addNavItem: (state, payload) => state.navigation.unshift(payload)
}

export const getters = {
    getMenu: state => state.menu,
    getMenuItem: state => state.menuItem,
    getNavigation: state => state.navigation,
}
