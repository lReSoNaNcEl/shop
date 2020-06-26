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
                        <label class="field__caption">Фамилия</label>
                        <input class="field__input" type="text" placeholder="Иванов">
                    </div>

                    <div class="payment__field">
                        <label class="field__caption">Имя</label>
                        <input class="field__input" type="text" placeholder="Иван">
                    </div>

                    <div class="payment__field">
                        <label class="field__caption">Отчество</label>
                        <input class="field__input" type="text" placeholder="Иванович">
                    </div>

                    <div class="payment__field">
                        <label class="field__caption">Адрес доставки</label>
                        <input class="field__input" type="text" placeholder="г. Липецк ул.Космонавтов д.1">
                    </div>

                    <p class="payment__amount">Всего товаров: <span class="highlight">{{basket.length}}</span></p>
                    <p class="payment__delivery">Стоимость доставки: <span class="highlight">500</span> р.</p>
                    <p class="payment__total">Всего к оплате: <span class="highlight">{{totalPrice}}</span> р.</p>

                    <div class="payment__wrapper">
                        <button type="button" class="payment__btn btn">Отправить заявку</button>
                        <p class="payment__info">
                            *при нажатии кнопки “Оплатить”<br>
                            вы принимаете условия оферты
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
    export default {
        data: () => ({
        }),
        'getBasket': function() {
            console.log('test')
        },
        computed: {
            products() {return this.$store.getters['product/getProducts']},
            basket() {return this.$store.getters['basket/getBasket']},
            totalPrice() {return this.$store.getters['basket/getTotalPrice']}
        },
        created() {
            this.$store.commit('basket/syncBasket')
        },
        components: {Header, Footer, Product}
    }
</script>
