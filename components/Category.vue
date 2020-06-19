<template>
    <div>
        <Header/>
        <section class="catalog">
            <h1 class="catalog__title title">{{this.title}}</h1>
            <div class="catalog__products">
                <nuxt-link class="products__basket" to="/shop/basket">
                    <img class="basket__img" src="/img/basket.svg"/>
                </nuxt-link>
                <div class="products__container">
                    <Product :data-id="item.id" v-for="item in category " :id="item.id" :title="item.title" :img="'/img/product/1.png'"/>
                </div>
            </div>
        </section>
        <Footer/>
    </div>
</template>

<script>
    import Header from '@/components/Header'
    import Footer from '@/components/Footer'
    import Product from '@/components/Product'
    export default {
        props: {id: Number},
        data: () => ({
            menu: null,
            title: null,
            category: null
        }),
        created() {
            this.$store.dispatch('menu/saveMenu').then(() => {
                this.menu = this.$store.getters['menu/getMenu']
                this.category = this.menu[this.id].children
                this.title = this.menu[this.id].title
            })
        },
        components: {Header, Footer, Product}
    }
</script>
