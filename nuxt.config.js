export default {
    mode: 'spa',
    /*
    ** Headers of the page
    */
    head: {
        title: 'Steel House',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: process.env.npm_package_description || ''},
            {name: 'keywords', content: 'Магазин кровли, Кровельные материалы в Липецке, купить кровельные материалы в липецке, купить кровлю в липецке, материалы для кровли в липецке, магазин кровельных материалов Липецке, интернет-магазин Steel house, кровельный магазин Липецк, кровельная компания, продукция для кровли'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/img/favicon.ico'},
            {rel: 'stylesheet', href: '/font/stylesheet.css'},
            {rel: 'stylesheet', href: '/css/index.css'},
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: {color: '#FFF'},
    /*
    ** Global CSS
    */
    css: [
        'assets/index.css'
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [],
    /*
    ** Nuxt.js modules
    */
    modules: [],
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
        }
    }
}
