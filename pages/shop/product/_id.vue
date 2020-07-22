<template>
    <div>
        <Preloader/>
        <Header/>
        <section v-show="isRender" class="productfull">
            <div class="productfull__wrapper">
                <h1 class="productfull__title title">{{product !== null ? product.title : ''}}</h1>
                <div class="productfull__specifications">
                    <div @click="menuSpecifications" data-type="information" class="specifications__item specifications__item_active">Описание</div>
                    <div @click="menuSpecifications" data-type="specification" class="specifications__item">Характеристики</div>
                    <div @click="menuSpecifications" data-type="objects" class="specifications__item">Готовые объекты</div>
                    <div @click="menuSpecifications" data-type="advice" class="specifications__item">Советы</div>
                </div>
                <p v-html="html" class="productfull__desc"></p>
<!--                <p v-html="product !== null ? product.specifications : ''" class="productfull__desc"></p>-->
                <p class="productfull__price">Цена: <span class="highlight">{{product !== null ? product.price : '(подробнее о цене после оформления заказа)'}}</span> руб.</p>
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
        product: null,
        html: null,

    }),
    methods: {
        alert(text, type, time = 1500) {
            new Noty({type: type, layout: 'topRight', theme: 'metroui', text: text, timeout: time,})
                .show()
        },
        addProductToBasket(e) {
            const id = +e.target.getAttribute('data-id')
            const product = {id: this.product.id, title: this.product.title, price: this.product.price, img: this.product.image}

            this.$store.commit('basket/addProduct', product)
            this.$store.commit('basket/syncBasket')
            this.alert('Товар добавлен в корзину', 'success')
        },
        menuSpecifications(e) {
            const menu = document.getElementsByClassName('specifications__item')
            const menuItem = e.currentTarget
            const type = e.currentTarget.getAttribute('data-type')
            for (let item of menu) item.classList.remove('specifications__item_active')
            menuItem.classList.add('specifications__item_active')

            type === 'information' ? this.html = this.product.desc : null
            type === 'specification' ? this.html = this.product.specifications : null
            type === 'objects' ? this.html = this.product.finished_objects : null
            type === 'advice' ? this.html = this.product.installation_tips : null
        }
    },
    created() {
        this.id = +this.$route.params.id
        this.$store.dispatch('product/saveProduct', this.id).then(() => {
            this.product = this.$store.getters['product/getProduct']
            this.product === null ? this.isRender = false : null
            this.html = this.product.desc
            console.log(this.product)
        })
    },
    components: {Header, Footer, Preloader},
}
</script>
