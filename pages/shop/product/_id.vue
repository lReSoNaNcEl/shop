<template>
    <div>
        <Header/>
        <section class="product">
            <img :src="product.img" class="product__img"/>
            <h1 class="product__title title">{{product.title}}</h1>
            <p class="product__desc">{{product.desc}}</p>
            <div class="product__properties">
                Ширина листа : 1 175 мм<br>
                Монтажная ширина : 1 080 мм<br>
                Толщина листа : 0,35 - 0,5 мм
            </div>
            <p class="product__advantage">Каскад обладает замечательной эстетикой, большим запасом прочности и может устанавливаться на любую кровлю.</p>
            <p class="product__price">Цена: <span class="highlight">{{product.price}}</span> руб./кв.м</p>
        </section>
        <Footer/>
    </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
    data: () => ({
        id: null,
        product: null
    }),
    computed: {
        products() {return this.$store.getters['product/getProducts']},
    },
    created() {
        this.id = this.$route.params.id
        this.product = this.products.find(product => +product.id === +this.id)
    },
    components: {Header, Footer}
}
</script>

<style scoped>
    .product {
        width: 32%;
        height: 38vw;
        padding: 0 0 0 3%;
    }

    .product__img {
        position: absolute;
        width: 59.375vw;
        height: 100vh;
        z-index: 2;
        top: 0;
        right: 0;
        background-size: 100% 100%;
        clip-path: polygon(0 62%, 24% 0, 100% 0, 100% 100%, 0 100%, 0 75%, 0 72%, 0 68%, 0 65%);
    }

    .product__desc,
    .product__properties,
    .product__advantage {
        font-size: .9375vw;
        margin: 0 0 2.083vw 0;
        line-height: 180%;
    }

    .product__price {
        font-size: 1.14583vw;
    }
</style>
