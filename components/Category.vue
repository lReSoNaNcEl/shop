<template>
    <div>
        <Header/>
        <section class="catalog">
            <h1 class="catalog__title title">{{title}}</h1>
            <div class="catalog__products">
                <nuxt-link class="products__basket" to="/shop/basket">
                    <img class="basket__img" src="/img/basket.svg"/>
                </nuxt-link>
                <div class="products__container">
                    <div @click="loadChildData" :data-id="item.id" class="product" v-for="item in category">
                        <Product :id="item.id" :title="item.title" :img="'/img/product/1.png'"/>
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
    export default {
        data: () => ({
            menu: null,
            title: null,
            category: null,
            id: null,
            newId: null
        }),
        created() {
            this.id = +this.$route.params.id
            this.$store.dispatch('menu/saveMenuItem', this.id).then(() => {
                this.menu = this.$store.getters['menu/getMenuItem']
                this.category = this.menu.children
                this.title = this.menu.title
                console.log(this.menu)
            })
        },
        methods: {
            loadChildData(e) {
                this.newId = +e.currentTarget.getAttribute('data-id')
                this.$router.push(`/shop/category/${this.newId}/`)

                this.$store.dispatch('menu/saveMenuItem', this.newId).then(() => {
                    this.menu = this.$store.getters['menu/getMenuItem']
                    this.category = this.menu.children
                    this.title = this.menu.title
                })
            }
        },
        components: {Header, Footer, Product}
    }
</script>
