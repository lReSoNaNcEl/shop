import Noty from "noty";
<template>
    <nuxt-link :to="link ? link : '#'" class="product" ref="product">
        <img class="product__img" :src="img"/>
        <h3 class="product__title">{{title}}</h3>
        <p v-show="renderInfo" class="product__desc">{{desc}}</p>
        <div v-show="renderInfo" class="product__wrapper">
            <div class="product__price">Цена: <span class="highlight">{{price}}</span> руб./кв.м</div>
            <div class="product__volume"> {{volume}} кв.м</div>
        </div>
        <div v-show="!showCloseIcon" class="product__controls">
            <div :data-id="id" @click="addProductToBasket" class="product__btn btn">Купить</div>
            <nuxt-link :to="`/shop/product/${id}`" class="product__info">Подробнее</nuxt-link>
        </div>
        <img ref="icon" :data-id="id" @click="removeProductfromBasket" @mouseleave="focusLeaveCloseIcon" @mouseover="hoverCloseIcon" v-show="showCloseIcon" class="product__icon" src="/img/close_static.svg"/>
    </nuxt-link>
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
        volume: Number,
        link: String,
    },
    data: () => ({
        renderInfo: true,
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
            const id = +e.target.getAttribute('data-_id')
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
            const id = +e.target.getAttribute('data-_id')
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
            this.showCloseIcon = true
        }
        else {
            this.showCloseIcon = false
        }

        if (location.pathname === '/shop/' ||
            location.pathname === '/shop' ||
            /\/category/i.test(location.pathname)
        ) {
            this.renderInfo = false
            this.showCloseIcon = true
            setTimeout(() => this.$refs.icon.style.display = 'none', 100)
        }
    }
}
</script>
