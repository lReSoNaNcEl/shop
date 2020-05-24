<template>
    <div>
        <Header/>
        <section class="catalog">
            <h1 class="catalog__title title">Каталог</h1>
            <div class="catalog__wrapper">
                <div class="catalog__filter">
                    <h2 class="filter__title">Фильтр</h2>
                    <div class="filter__condition" v-for="filter in filters">
                        <div class="condition__type" @click="renderFilterParams" :data-id="filter.id">
                            <p class="type__text">{{filter.type}}</p>
                            <img class="type__icon" src="img/arrow_icon.svg"/>
                        </div>
                        <div class="condition__params">
                            <div class="params__item" v-for="param in filter.params">
                                <input class="params__state" type="checkbox">
                                <div class="params__name">{{param.name}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="catalog__products">
                    <nuxt-link class="products__basket" to="/shop/basket">
                        <img class="basket__img" src="img/basket.svg"/>
                    </nuxt-link>
                    <div class="products__container">
                        <Product v-for="product in products" :id="product.id" :title="product.title" :img="product.img" :desc="product.desc" :price="product.price" :volume="product.volume"/>
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
    computed: {
        products() {return this.$store.getters['product/getProducts']},
        filters() {return this.$store.getters['filter/getFilters']},
    },
    methods: {
        renderFilterParams(e) {
            const filterParams = e.currentTarget.nextElementSibling
            const icon = e.currentTarget.lastChild

            setTimeout(() => filterParams.classList.contains('hide') ? filterParams.style.display = 'none' : filterParams.style.display = 'block', 300)

            if (filterParams.classList.toggle('hide')) {
                icon.style.transform = 'rotate(180deg)'
                filterParams.style.animation = '.6s Hide'
            }
            else {
                icon.style.transform = 'rotate(0deg)'
                filterParams.style.animation = '.6s Show'
            }

        }
    },
    components: {Header, Footer, Product}
}
</script>

<style scoped>

    .catalog {
        display: flex;
        flex-direction: column;
        padding: 0 3% 0 3%;
    }

    .catalog__wrapper {display: flex;}

    .catalog__filter {width: 15%;}

    .filter__title {
        font-size: 1.25vw;
    }

    .condition__type {
        display: flex;
        cursor: pointer;
        margin: .83vw 0;
    }

    .type__text {
        font-size: .9375vw;
    }

    .type__icon {
        width: .5vw;
        margin: .2083vw 0 0 .3125vw;
        transition: .6s all;
    }

    .params__item {
        display: flex;
        align-items: center;
        margin: 0 0 .4vw 0;
    }

    .params__item:last-child {margin: 0;}

    .params__state {
        width: .937vw;
        height: 1.0416vw;
        cursor: pointer;
    }

    .params__name {
        font-size: .83vw;
        margin: 0 0 0 .625vw;
    }

    .catalog__products {
        padding: 0 0 0 5%;
        width: 85%;
    }

    .products__basket {
        display: flex;
        justify-content: flex-end;
        margin: 0 0 1.5625vw 0;
    }

    .basket__img {width: 2.34375vw;}

    .products__container {
        display: flex;
        justify-content: flex-start;
        flex-flow: row wrap;
    }
</style>
