export const state = () => ({
    links: [],
    currentLink: 'test'
})

export const mutations = {
    addLink: (state, payload) => state.links.push(payload),
    setCurrentLink: (state, payload) => state.currentLink = payload,
    clearLinks: state => state.links = [],
    clearLastLink: state => state.links.pop()
}

export const getters = {
    getLinks: state => state.links,
    getCurrentLink: state => state.currentLink,
}
