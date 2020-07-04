<template>
    <div>
        <Preloader/>
        <Header/>
        <section class="catalog">
            <h1 class="catalog__title title">
                <Navigation :title="title"/>
            </h1>
            <div class="catalog__products">
                <nuxt-link class="products__basket" to="/shop/basket">
                    <img class="basket__img" src="/img/basket.svg"/>
                </nuxt-link>
                <div class="products__container">
                    <!--                :link="`/shop/product/${item.id}`"-->
                    <Product v-for="item in products" :linkOnImg="`/shop/product/${item.id}`" :id="item.id" :title="item.title" :price="item.price" :desc="item.pre_view" :linkToItem="`/shop/product/${item.id}/`" :img="'/img/product/1.png'"/>
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
import Preloader from '@/components/Preloader'
import Navigation from '@/components/Navigation'
export default {
    data: () => ({
        menu: null,
        title: null,
        products: null,
        id: null,
        navigation: null
    }),
    created() {
        this.id = +this.$route.params.id
        this.$store.dispatch('menu/saveMenuItem', this.id).then(() => {
            this.menu = this.$store.getters['menu/getMenuItem']
            this.products = this.menu.products
            this.title = this.menu.title
            this.navigation = this.$store.getters['menu/getNavigation']
        })
    },
    components: {Header, Footer, Product, Preloader, Navigation},
}
</script>
