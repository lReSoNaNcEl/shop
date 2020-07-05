import Noty from "noty";
<template>
    <div>
        <Preloader/>
        <Header/>
        <section v-show="isRender" class="productfull">
            <div class="productfull__wrapper">
                <h1 class="productfull__title title">{{product !== null ? product.title : ''}}</h1>
                <p v-html="product !== null ? product.desc : ''" class="productfull__desc"></p>
                <p class="productfull__price">Цена: <span class="highlight">{{product !== null ? product.price : '(подробнее о цене после оформления заказа)'}}</span> руб./кв.м</p>
                <div :data-id="id" @click="addProductToBasket" class="productfull__btn btn">Купить</div>
                <Footer/>
            </div>
            <img :src="product !== null ? product.image : '/img/product/1.png'" class="productfull__img"/>
        </section>

        <div v-show="!isRender" class="productfull__warning">По Вашему запросу ничего не найдено</div>
    </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Preloader from '@/components/Preloader'
import Noty from 'noty'
import 'noty/lib/noty.css'
import 'noty/lib/themes/metroui.css'
export default {
    data: () => ({
        isRender: true,
        id: null,
        product: null
    }),
    methods: {
        alert(text, type, time = 1500) {
            new Noty({type: type, layout: 'topRight', theme: 'metroui', text: text, timeout: time,})
                .show()
        },
        addProductToBasket(e) {
            const id = +e.target.getAttribute('data-id')
            const product = {id: this.id, title: this.title, desc: this.desc, price: this.price}

            this.$store.commit('basket/addProduct', product)
            this.$store.commit('basket/syncBasket')
            this.alert('Товар добавлен в корзину', 'success')
        }
    },
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
