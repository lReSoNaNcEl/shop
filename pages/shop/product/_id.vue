<template>
    <div>
        <Header/>
        <section v-show="isRender" class="productfull">
            <h1 class="productfull__title title">{{product.title}}</h1>
            <p v-html="product.desc" class="productfull__desc"></p>
            <div class="productfull__properties">
                Ширина листа : 1 175 мм<br>
                Монтажная ширина : 1 080 мм<br>
                Толщина листа : 0,35 - 0,5 мм
            </div>
            <p class="productfull__advantage">Каскад обладает замечательной эстетикой, большим запасом прочности и может устанавливаться на любую кровлю.</p>
            <p class="productfull__price">Цена: <span class="highlight">{{product.price}}</span> руб./кв.м</p>
            <img :src="product.image" class="productfull__img"/>
        </section>

        <div v-show="!isRender" :style="{margin: '3vw 0 0 3%', fontSize: '2vw', minHeight: '35vw'}">Запрашиваемый товар не найден</div>
        <Footer/>
    </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
    data: () => ({
        isRender: true,
        id: null,
        product: {
            title: 'Test',
            desc: 'Test',
            price: '300',
            image: '/img/product/1.png',
        }
    }),
    created() {
        this.id = +this.$route.params.id
        this.$store.dispatch('product/saveProduct', this.id).then(() => {
            this.product = this.$store.getters['product/getProduct']
            if ('title' in this.product) {}
            else this.isRender = false
        })
    },
    components: {Header, Footer}
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
        filter: grayscale(90%);
    }

    .productfull__desc,
    .productfull__properties,
    .productfull__advantage {
        font-size: .9375vw;
        margin: 0 0 2.083vw 0;
        line-height: 180%;
    }

    .productfull__price {
        font-size: 1.14583vw;
    }
</style>
