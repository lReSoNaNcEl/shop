import Noty from "noty";
<template>
    <div class="product" ref="product">
        <img class="product__img" :src="img"/>
        <h3 class="product__title">{{title}}</h3>
        <p class="product__desc">{{desc}}</p>
        <div class="product__wrapper">
            <div class="product__price">Цена: <span class="highlight">{{price}}</span> руб./кв.м</div>
            <div class="product__volume"> {{volume}} кв.м</div>
        </div>
        <div v-show="!showCloseIcon" class="product__controls">
            <div :data-id="id" @click="addProductToBasket" class="product__btn btn">Купить</div>
            <nuxt-link :to="`/shop/product/${id}`" class="product__info">Подробнее</nuxt-link>
        </div>
        <img ref="icon" :data-id="id" @click="removeProductfromBasket" @mouseleave="focusLeaveCloseIcon" @mouseover="hoverCloseIcon" v-show="showCloseIcon" class="product__icon" src="/img/close_static.svg"/>
    </div>
</template>

<script>
import Noty from 'noty'
import 'noty/lib/noty.css'
import 'noty/lib/themes/metroui.css'
export default {
    props: {
        id: Number,
        title: String,
        img: String,
        desc: String,
        price: Number,
        volume: Number
    },
    data: () => ({
        showCloseIcon: false
    }),
    methods: {
        hoverCloseIcon() {
            this.$refs.icon.src = '/img/close_active.svg'
        },
        focusLeaveCloseIcon() {
            this.$refs.icon.src = '/img/close_static.svg'
        },
        removeProductfromBasket(e) {
            const id = +e.target.getAttribute('data-id')
            this.$store.commit('basket/deleteProduct', id)
            this.$store.commit('basket/syncBasket')
            new Noty({
                type: 'error',
                layout: 'topRight',
                theme: 'metroui',
                text: 'Товар убран из корзины',
                timeout: '1000',
            }).show()
        },
        addProductToBasket(e) {
            const id = +e.target.getAttribute('data-id')
            const product = this.products.find(product => product.id === id)
            this.$store.commit('basket/addProduct', product)
            this.$store.commit('basket/syncBasket')
            new Noty({
                type: 'success',
                layout: 'topRight',
                theme: 'metroui',
                text: 'Товар добавлен в корзину',
                timeout: '1500',
            }).show()
        }
    },
    computed: {
        products() {return this.$store.getters['product/getProducts']}
    },
    mounted() {
        if (location.pathname === '/shop/basket') {
            const product = this.$refs.product

            product.style.width = '25%'
            product.style.margin = '0 8% 2.083vw 0'

            this.showCloseIcon = true
        }
        else {
            this.showCloseIcon = false
        }
    }
}
</script>

<style scoped>
    .product {
        position: relative;
        width: 23%;
        margin: 0 0 2.083vw 2%;
    }

    .product__img {width: 100%;}

    .product__title {
        font-size: 1.14583vw;
        text-transform: uppercase;
        margin: 1.25vw 0 1.0416vw 0;
    }

    .product__desc {
        height: 5vw;
        font-size: .83vw;
        line-height: 150%;
    }

    .product__wrapper {
        display: flex;
        font-size: .9375vw;
        margin: 1.302083vw 0 1.5625vw 0;
    }

    .product__controls {
        display: flex;
        align-items: center;
    }

    .product__info {
        font-size: .83vw;
        color: #7D7D7D;
        margin: 0 0 0 .52083vw;
        cursor: pointer;
    }

    .product__icon {
        width: .83vw;
        position: absolute;
        top: 11.5625vw;
        left: 13.5416vw;
        cursor: pointer;
    }
</style>
