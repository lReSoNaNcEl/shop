<template>
    <div>
        <Header/>
        <section class="basket">
            <h1 class="basket__title title">Корзина</h1>
            <div class="basket__wrapper">
                <div class="basket__products">
                    <Product v-for="product in basket" :id="product.id" :title="product.title" :img="'/img/product/1.png'" :desc="product.desc" :price="product.price" :volume="product.volume"/>
                </div>
                <form class="basket__payment">
                    <h2 class="payment__title">Данные покупателя</h2>

                    <div class="payment__field">
                        <label class="field__caption">Имя</label>
                        <input class="field__input" type="text" placeholder="Иван" ref="name">
                    </div>

                    <div class="payment__field">
                        <label class="field__caption">Почта</label>
                        <input class="field__input" type="text" placeholder="ivan@mail.ru" ref="email">
                    </div>

                    <div class="payment__field">
                        <label class="field__caption">Телефон</label>
                        <input class="field__input" type="text" v-mask="'+7 (###) ###-##-##'" placeholder="+7 (900) 800-70-60" ref="phone">
                    </div>

                    <div class="payment__field">
                        <label class="field__caption">Комментарий</label>
                        <input class="field__input" type="text" placeholder="г.Липецк ул.Космонавтов д.1" ref="comment">
                    </div>

                    <p class="payment__amount">Всего товаров: <span class="highlight">{{basket.length}}</span></p>
                    <p class="payment__delivery">Стоимость доставки: <span class="highlight">500</span> р.</p>
                    <p class="payment__total">Всего к оплате: <span class="highlight">{{totalPrice}}</span> р.</p>

                    <div class="payment__wrapper">
                        <button type="button" class="payment__btn btn" @click="toMail()">Оформить заявку</button>
                        <p class="payment__info">
                            *при нажатии кнопку вы <br> принимаете условия оферты
                        </p>
                    </div>
                </form>
            </div>
        </section>
        <Footer/>
    </div>
</template>
<script>
    import Header from '@/components/Header'
    import Footer from '@/components/Footer'
    import Product from '@/components/Product'
    import VueMask from 'vue-the-mask'
    import {mask} from 'vue-the-mask'
    import Noty from 'noty'
    import 'noty/lib/noty.css'
    import 'noty/lib/themes/metroui.css'
    export default {
        data: () => ({}),
        directives: {mask},
        computed: {
            products() {return this.$store.getters['product/getProducts']},
            basket() {return this.$store.getters['basket/getBasket']},
            totalPrice() {return this.$store.getters['basket/getTotalPrice']}
        },
        methods: {
            toMail() {
                const name = this.$refs.name.value
                const email = this.$refs.email.value
                const phone = this.$refs.phone.value
                const comment = this.$refs.comment.value


                if (name && email && phone && comment) {
                    const products = this.basket.map(product => product.id)
                    const request = {name, email, phone, comment, products}

                    this.$store.dispatch('basket/saveMail', request).then(() => {
                        new Noty({
                            type: 'success',
                            layout: 'topRight',
                            theme: 'metroui',
                            text: 'Заявка успешно отправлена',
                            timeout: '1500',
                        }).show()
                        let res = this.$store.getters['basket/getMailResponse']
                        console.log(res)
                    })
                }


            }
        },
        created() {
            this.$store.commit('basket/syncBasket')
        },
        components: {Header, Footer, Product, VueMask}
    }
</script>
