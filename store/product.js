export const state = () => ({
    products: [
        {id: 1, img: '/img/product/1.png', title: 'Product 1', desc: 'Металлочерепица Каскад произведена из высококачественной стали, проста в обслуживании и чрезвычайно долговечна.', price: 325, volume: 46},
        {id: 2, img: '/img/product/2.png', title: 'Product 2', desc: 'Супермонтеррей может использоваться в регионах с большим количеством зимних осадков.', price: 200, volume: 31},
        {id: 3, img: '/img/product/3.png', title: 'Product 3', desc: 'Внешне она очень похожа на керамику. При этом ее конструкция позволяет выдерживать большие нагрузки.', price: 150, volume: 63},
        {id: 4, img: '/img/product/4.png', title: 'Product 4', desc: 'Металлочерепица Каскад произведена из высококачественной стали, проста в обслуживании и чрезвычайно долговечна.', price: 170, volume: 42},
        {id: 5, img: '/img/product/5.png', title: 'Product 5', desc: 'Супермонтеррей может использоваться в регионах с большим количеством зимних осадков.', price: 125, volume: 64},
        {id: 6, img: '/img/product/6.png', title: 'Product 6', desc: 'Внешне она очень похожа на керамику. При этом ее конструкция позволяет выдерживать большие нагрузки.', price: 610, volume: 45},
        {id: 7, img: '/img/product/7.png', title: 'Product 7', desc: 'Металлочерепица Каскад произведена из высококачественной стали, проста в обслуживании и чрезвычайно долговечна.', price: 155, volume: 13},
        {id: 8, img: '/img/product/8.png', title: 'Product 8', desc: 'Металлочерепица Каскад произведена из высококачественной стали, проста в обслуживании и чрезвычайно долговечна.', price: 190, volume: 45}
    ],
    product: null
})


export const getters = {
    getProducts: state => state.products,
    getProduct: state => state.product
}
