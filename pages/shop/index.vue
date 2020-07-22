<template>
    <div>
        <Preloader/>
        <Header/>
        <section class="catalog">
            <h1 class="catalog__title title">Каталог</h1>
                <div class="catalog__products">
<!--                    <nuxt-link class="products__basket" to="/shop/basket">-->
<!--                        <img class="basket__img" src="/img/basket.svg"/>-->
<!--                    </nuxt-link>-->
                    <div class="products__container">
                        <Product :data-id="item.id" v-for="item in menu" :id="item.id" :title="item.title" :link="`/shop/category/${item.id}`" :img="item.image !== null ? item.image : '/img/product/1.png'"/>
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
export default {
    data: () => ({
        menu: null,
    }),
    computed: {
        products() {return this.$store.getters['product/getProducts']},
    },
    created() {
        this.$store.dispatch('menu/saveMenu').then(() => {
            this.menu = this.$store.getters['menu/getMenu']
            console.log(this.menu)
        })
    },
    components: {Header, Footer, Product, Preloader},
}
</script>
