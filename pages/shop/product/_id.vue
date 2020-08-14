<template>
    <div>
        <Preloader/>
        <Header/>
        <section v-show="isRender" class="productfull">
            <img :src="previewImage ? previewImage : '/img/product/1.png'" class="productfull__img"/>
            <div class="productfull__wrapper">
                <h1 class="productfull__title title">{{product !== null ? product.title : ''}}</h1>
                <div v-show="colors.length" class="productfull__colors">
                    <div class="colors__title">Цвета:</div>
                    <div class="colors__container">
                        <img :src="product.image" @click="changeImage($event, product.image)" class="colors__img colors__img_active"/>
                        <img v-if="colors" v-for="color of colors" @click="changeImage($event, color)" :src="color" class="colors__img"/>
                    </div>
                </div>
                <div class="productfull__specifications" v-dragscroll.x="true">
                    <div v-if="product.desc" @click="menuSpecifications" data-type="information" class="specifications__item specifications__item_active">Описание</div>
                    <div v-if="product.specifications" @click="menuSpecifications" data-type="specification" class="specifications__item">Характеристики</div>
                    <div v-if="product.related_products && product.related_products.length !== 0" @click="menuSpecifications" data-type="attendant" class="specifications__item">Сопутствующие товары</div>
                    <div v-if="product.finished_objects" @click="menuSpecifications" data-type="objects" class="specifications__item">Готовые объекты</div>
                    <div v-if="product.installation_tips" @click="menuSpecifications" data-type="advice" class="specifications__item">Советы по монтажу</div>
                </div>
                <p v-html="html" class="productfull__desc"></p>
                <div v-if="related_products" class="productfull__products">
                    <Product v-for="product in product.related_products" :linkOnImg="`/shop/product/${product.id}`" :id="product.id" :title="product.title" :price="product.price" :desc="product.pre_view" :linkToItem="`/shop/product/${product.id}/`" :img="product !== null ? product.image : '/img/product/1.png'"/>
                </div>
                <p class="productfull__price">Цена: <span class="highlight">{{product !== null ? product.price : '(подробнее о цене после оформления заказа)'}}</span> руб.</p>
                <div :data-id="id" @click="addProductToBasket" class="productfull__btn btn">Купить</div>
            </div>
        </section>
        <div v-show="!isRender" class="productfull__warning">По Вашему запросу ничего не найдено</div>
        <Footer/>
    </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Preloader from '@/components/Preloader'
import Product from "@/components/Product"
import Noty from 'noty'
import 'noty/lib/noty.css'
import 'noty/lib/themes/metroui.css'
export default {
    data: () => ({
        isRender: true,
        id: null,
        product: {},
        html: null,
        previewImage: null,
        colors: [],
        related_products: null
    }),
    methods: {
        changeImage(e, color) {
            const images = document.getElementsByClassName('colors__img')

            for (let i = 0; i <= images.length - 1; i++) {
                images[i].classList.remove('colors__img_active')
            }

            e.currentTarget.classList.add('colors__img_active')
            this.previewImage = color
        },
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

            this.related_products = null

            type === 'information' ? this.html = this.product.desc : null
            type === 'specification' ? this.html = this.product.specifications : null
            type === 'objects' ? this.html = this.product.finished_objects : null
            type === 'advice' ? this.html = this.product.installation_tips : null
            if (type === 'attendant') {
                this.related_products = this.product.related_products
                this.html = null
            }
            // type === 'attendant' ? this.related_products = this.product.related_products : null
        }
    },
    created() {
        this.id = +this.$route.params.id
        this.$store.dispatch('product/saveProduct', this.id).then(() => {
            this.product = this.$store.getters['product/getProduct']
            this.product === null ? this.isRender = false : null
            this.html = this.product.desc
            this.previewImage = this.product.image
            this.colors = this.product.colors.map(color => color.image)
            console.log(this.product.related_products)
        })
    },
    components: {Header, Footer, Preloader, Product},
}
</script>
<style scoped>
    .footer {position: relative;}
    .title {margin: 2vw 0 0 0 !important;}
</style>
