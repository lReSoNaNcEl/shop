export const state = () => ({
    providers: [
        [
            {
                id: 1,
                name: 'Provider_1',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aspernatur culpa delectus ea est expedita, illo itaque iusto laudantium necessitatibus neque nesciunt obcaecati odit quaerat quas quibusdam quis quisquam rerum similique soluta tempore vel velit vero vitae voluptatum! Incidunt, voluptates!',
                icon: '/img/preview/slide_1/1.png'
            },
            {
                id: 2,
                name: 'Provider_2',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab architecto commodi consequatur culpa, distinctio dolor eaque enim et exercitationem expedita explicabo fugiat fugit harum itaque labore minima molestias necessitatibus nemo nisi non officia provident qui reiciendis temporibus unde ut voluptate?',
                icon: '/img/preview/slide_1/2.png'
            },
            {
                id: 3,
                name: 'Provider_3',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium distinctio expedita impedit molestias, mollitia nisi odit quaerat qui repellat. Amet ducimus, esse facere non provident quisquam similique velit voluptatibus? Alias, atque, ullam. Dicta facere fugiat illum ipsum mollitia nesciunt sit.',
                icon: '/img/preview/slide_2/3.png'
            }
        ],
        [
            {
                id: 4,
                name: 'Provider_4',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aspernatur culpa delectus ea est expedita, illo itaque iusto laudantium necessitatibus neque nesciunt obcaecati odit quaerat quas quibusdam quis quisquam rerum similique soluta tempore vel velit vero vitae voluptatum! Incidunt, voluptates!',
                icon: 'img/preview/slide_3/1.png'
            },
            {
                id: 5,
                name: 'Provider_5',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab architecto commodi consequatur culpa, distinctio dolor eaque enim et exercitationem expedita explicabo fugiat fugit harum itaque labore minima molestias necessitatibus nemo nisi non officia provident qui reiciendis temporibus unde ut voluptate?',
                icon: 'img/preview/slide_3/2.png'
            },
            {
                id: 6,
                name: 'Provider_6',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium distinctio expedita impedit molestias, mollitia nisi odit quaerat qui repellat. Amet ducimus, esse facere non provident quisquam similique velit voluptatibus? Alias, atque, ullam. Dicta facere fugiat illum ipsum mollitia nesciunt sit.',
                icon: 'img/preview/slide_3/3.png'
            }
        ]
    ],
})

export const getters = {
    getProviders: state => state.providers
}
