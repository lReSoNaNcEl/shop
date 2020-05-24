<template>
    <div class="product" ref="product">
        <img class="product__img" :src="img"/>
        <h3 class="product__title">{{title}}</h3>
        <p class="product__desc">{{desc}}</p>
        <div class="product__wrapper">
            <div class="product__price">Цена: <span class="highlight">{{price}}</span> руб./кв.м</div>
            <div class="product__volume"> {{volume}} кв.м</div>
        </div>
        <div class="product__controls">
            <nuxt-link to="#" class="product__btn btn">Купить</nuxt-link>
            <nuxt-link :to="`/shop/product/${id}`" class="product__info">Подробнее</nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        id: Number,
        title: String,
        img: String,
        desc: String,
        price: Number,
        volume: Number
    },
    mounted() {
        if (location.pathname === '/shop/basket') {
            const product = this.$refs.product

            product.style.width = '25%'
            product.style.margin = '0 8% 2.083vw 0'
        }
    }
}
</script>

<style scoped>
    .product {
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
        height: 4.6875vw;
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

    .product__price {

    }

    .product__info {
        font-size: .83vw;
        color: #7D7D7D;
        margin: 0 0 0 .52083vw;
        cursor: pointer;
    }
</style>
