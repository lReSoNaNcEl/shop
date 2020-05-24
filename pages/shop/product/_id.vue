<template>
    <div class="app">
        <Header/>
        <section class="product">
            <h1 class="product__title title">Продукт 1</h1>
            <p class="product__desc">Металлочерепица Каскад произведена из высококачественной стали, проста в обслуживании и чрезвычайно долговечна. Идеально подходит в строительстве новых объектов, а также ремонта зданий, где крыша нуждается в замене.</p>
            <div class="product__properties">
                Ширина листа : 1 175 мм<br>
                Монтажная ширина : 1 080 мм<br>
                Толщина листа : 0,35 - 0,5 мм
            </div>
            <p class="product__advantage">Каскад обладает замечательной эстетикой, большим запасом прочности и может устанавливаться на любую кровлю.</p>
            <p class="product__price">Цена: <span class="highlight">325</span> руб./кв.м</p>
        </section>
        <Footer/>
    </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
    computed: {
        products() {return this.$store.getters['product/getProducts']},
    },
    components: {Header, Footer}
}
</script>

<style scoped>
    .app {
        height: 100vh;
        background: url('../../../static/img/product_item.png') no-repeat;
        background-position: top right;
        background-size: 59.375vw 100vh;
    }

    .product {
        width: 32%;
        height: 38vw;
        padding: 0 0 0 3%;
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
