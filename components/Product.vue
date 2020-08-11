import Noty from "noty";
<template>
    <nuxt-link :to="link ? link : '#'" class="product" ref="product">
        <nuxt-link :to="linkOnImg ? linkOnImg : link ? link : '#'">
            <img class="product__img" :src="img"/>
        </nuxt-link>
        <h3 class="product__title">{{title}}</h3>
        <p v-show="renderDesc" class="product__desc">{{desc}}</p>
        <div v-show="renderPrice" class="product__wrapper">
            <div class="product__price">Цена: <span class="highlight">{{price}}</span> руб.</div>
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
        linkToItem: String,
        linkOnImg: String
    },
    data: () => ({
        renderDesc: true,
        renderPrice: true,
        showCloseIcon: false,
    }),
    methods: {
        hoverCloseIcon() {
            this.$refs.icon.src = '/img/close_active.svg'
        },
        focusLeaveCloseIcon() {
            this.$refs.icon.src = '/img/close_static.svg'
        },
        alert(text, type, time = 1500) {
            new Noty({type: type, layout: 'topRight', theme: 'metroui', text: text, timeout: time,})
                .show()
        },
        removeProductfromBasket(e) {
            const id = +e.target.getAttribute('data-id')
            this.$store.commit('basket/deleteProduct', id)
            this.$store.commit('basket/syncBasket')
            this.alert('Товар убран из корзины', 'error', 1000)
        },
        addProductToBasket(e) {
            const id = +e.target.getAttribute('data-id')
            const product = {id: this.id, title: this.title, img: this.img, price: this.price}

            this.$store.commit('basket/addProduct', product)
            this.$store.commit('basket/syncBasket')
            this.alert('Товар добавлен в корзину', 'success')
        }
    },
    computed: {
        products() {return this.$store.getters['product/getProducts']}
    },
    mounted() {
        location.pathname === '/shop/basket' ? this.showCloseIcon = true : this.showCloseIcon = false

        if (!/\/shop\/category\/\d+\/products\//.test(location.pathname)) {
            this.renderDesc = false
            this.renderPrice = false
            this.showCloseIcon = true
            setTimeout(() => this.$refs.icon.style.display = 'none', 10)
        }


        if (location.pathname === '/shop/basket') {
            this.renderDesc = false
            this.renderPrice = true
            setTimeout(() => this.$refs.icon.style.display = 'block', 10)
        }

    }
}
</script>
