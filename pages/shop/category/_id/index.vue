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
                    <div @click="loadChildData" :data-id="item.id" class="product" v-for="item in category">
                        <Product  :id="item.id" :title="item.title" :img="item.image !== null ? item.image : '/img/product/1.png'"/>
                    </div>
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
            category: null,
            id: null,
            newId: null,
        }),
        created() {
            this.id = +this.$route.params.id
            this.$store.dispatch('menu/saveMenuItem', this.id).then(() => {
                this.menu = this.$store.getters['menu/getMenuItem']

                if (this.menu.children.length === 0) {
                    const container = document.getElementsByClassName('products__container')[0]
                    container.textContent = 'Товары в данной категории будут добавлены в ближайшее время'
                }

                if (this.menu.products.length === 0) {
                    this.category = this.menu.children
                    this.title = this.menu.title
                }
                else
                    this.$router.replace(`/shop/category/${this.id}/products/`)

            })
        },
        methods: {
            loadChildData(e) {
                this.newId = +e.currentTarget.getAttribute('data-id')
                this.$router.replace(`/shop/category/${this.newId}/`)

                this.$store.dispatch('menu/saveMenuItem', this.newId).then(() => {
                    this.menu = this.$store.getters['menu/getMenuItem']
                    this.category = this.menu.children
                    this.title = this.menu.title
                })
            }
        },
        components: {Header, Footer, Product, Preloader, Navigation},
    }
</script>
