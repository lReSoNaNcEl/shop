<template>
    <div>
        <Preloader/>
        <Header/>
        <section v-show="isRender" class="productfull">
            <h1 class="productfull__title title">{{product !== null ? product.title : ''}}</h1>
            <p v-html="product !== null ? product.desc : ''" class="productfull__desc"></p>
            <p class="productfull__price">Цена: <span class="highlight">{{product !== null ? product.price : '(подробнее о цене после оформления заказа)'}}</span> руб./кв.м</p>
            <img :src="product !== null ? product.image : '/img/product/1.png'" class="productfull__img"/>
        </section>

        <div v-show="!isRender" class="productfull__warning">По Вашему запросу ничего не найдено</div>
        <Footer/>
    </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Preloader from '@/components/Preloader'
export default {
    data: () => ({
        isRender: true,
        id: null,
        product: null
    }),
    created() {
        this.id = +this.$route.params.id
        this.$store.dispatch('product/saveProduct', this.id).then(() => {
            this.product = this.$store.getters['product/getProduct']
            this.product === null ? this.isRender = false : null
            console.log(this.product)
        })
    },
    components: {Header, Footer, Preloader},
}
</script>

<style scoped>
    .productfull {
        width: 32%;
        min-height: 30vw;
        padding: 0 0 0 3%;
    }

    .productfull__img {
        position: absolute;
        width: 59.375vw;
        height: 100vh;
        z-index: 2;
        top: 0;
        right: 0;
        background-size: 100% 100%;
        clip-path: polygon(0 62%, 24% 0, 100% 0, 100% 100%, 0 100%, 0 75%, 0 72%, 0 68%, 0 65%);
        filter: grayscale(20%);
    }

    .productfull__desc {
        font-size: .9375vw;
        margin: 0 0 2.083vw 0;
        line-height: 180%;
    }

    .productfull__price {
        font-size: 1.14583vw;
    }

    .productfull__warning {
        margin: 3vw 0 0 3%;
        font-size: 2vw;
        min-height: 35vw;
    }
</style>
