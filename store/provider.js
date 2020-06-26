export const state = () => ({
    providers: [
        {
            id: 1,
            name: 'Provider_1',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aspernatur culpa delectus ea est expedita, illo itaque iusto laudantium necessitatibus neque nesciunt obcaecati odit quaerat quas quibusdam quis quisquam rerum similique soluta tempore vel velit vero vitae voluptatum! Incidunt, voluptates!',
            photos: [
                {id: 1, path: '/img/preview/slide_1/1.png'},
                {id: 2, path: '/img/preview/slide_1/2.png'},
                {id: 3, path: '/img/preview/slide_1/3.png'},
            ]
        },
        {
            id: 2,
            name: 'Provider_2',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aspernatur culpa delectus ea est expedita, illo itaque iusto laudantium necessitatibus neque nesciunt obcaecati odit quaerat quas quibusdam quis quisquam rerum similique soluta tempore vel velit vero vitae voluptatum! Incidunt, voluptates!',
            photos: [
                {id: 1, path: '/img/preview/slide_2/1.png'},
                {id: 2, path: '/img/preview/slide_2/2.png'},
                {id: 3, path: '/img/preview/slide_2/3.png'},
            ]
        },
        {
            id: 3,
            name: 'Provider_3',
            desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium distinctio expedita impedit molestias, mollitia nisi odit quaerat qui repellat. Amet ducimus, esse facere non provident quisquam similique velit voluptatibus? Alias, atque, ullam. Dicta facere fugiat illum ipsum mollitia nesciunt sit.',
            photos: [
                {id: 1, path: '/img/preview/slide_3/1.png'},
                {id: 2, path: '/img/preview/slide_3/2.png'},
                {id: 3, path: '/img/preview/slide_3/3.png'},
            ]
        }
    ],
})

export const actions = {
    saveProviders: async ctx => {
        const data = await fetch('https://backsteelhouse.ru/other-pages/')
        const providers = await data.json()
        ctx.commit('setProviders', await providers)
    }
}

export const mutations = {
    setProviders: (state, payload) => state.providers = payload
}

export const getters = {
    getProviders: state => state.providers


}
