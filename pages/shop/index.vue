<template>
    <div>
        <Header/>
        <section class="catalog">
            <h1 class="catalog__title title">Каталог</h1>
<!--            <div class="catalog__wrapper">-->
<!--                <div class="catalog__filter">-->
<!--                    <h2 class="filter__title">Фильтр</h2>-->
<!--                    <div class="filter__condition" v-for="filter in filters">-->
<!--                        <div class="condition__type" @click="renderFilterParams" :data-_id="filter._id">-->
<!--                            <p class="type__text">{{filter.type}}</p>-->
<!--                            <img class="type__icon" src="img/arrow_icon.svg"/>-->
<!--                        </div>-->
<!--                        <div class="condition__params">-->
<!--                            <div class="params__item" v-for="param in filter.params">-->
<!--                                <input class="params__state" type="checkbox">-->
<!--                                <div class="params__name">{{param.name}}</div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
                <div class="catalog__products">
                    <nuxt-link class="products__basket" to="/shop/basket">
                        <img class="basket__img" src="/img/basket.svg"/>
                    </nuxt-link>
                    <div class="products__container">
<!--                        <Product v-for="product in products" :_id="product._id" :title="product.title" :img="product.img" :desc="product.desc" :price="product.price" :volume="product.volume"/>-->
                        <Product :data-id="item.id" v-for="item in menu" :id="item.id" :title="item.title" :link="`/shop/category/${item.id}`" :img="'/img/product/1.png'"/>
                </div>
                </div>
<!--            </div>-->
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
    }),
    computed: {
        products() {return this.$store.getters['product/getProducts']},
        // filters() {return this.$store.getters['filter/getFilters']},
    },
    methods: {
        // renderFilterParams(e) {
        //     const filterParams = e.currentTarget.nextElementSibling
        //     const icon = e.currentTarget.lastChild
        //
        //     setTimeout(() => filterParams.classList.contains('show') ? filterParams.style.display = 'block' : filterParams.style.display = 'none', 300)
        //
        //     if (filterParams.classList.toggle('show')) {
        //         icon.style.transform = 'rotate(0deg)'
        //         filterParams.style.animation = '.6s Show'
        //     }
        //     else {
        //         icon.style.transform = 'rotate(180deg)'
        //         filterParams.style.animation = '.6s Hide'
        //     }
        // }
    },
    created() {
        this.$store.dispatch('menu/saveMenu').then(() => {
            this.menu = this.$store.getters['menu/getMenu']
            console.log(this.menu)
        })
    },
    components: {Header, Footer, Product}
}
</script>
