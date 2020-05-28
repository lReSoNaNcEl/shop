<template>
    <div>
        <Header/>
        <section class="basket">
            <h1 class="basket__title title">Корзина</h1>
            <div class="basket__wrapper">
                <div class="basket__products">
                    <Product v-for="product in basket" :id="product.id" :title="product.title" :img="product.img" :desc="product.desc" :price="product.price" :volume="product.volume"/>
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

<style scoped>
    .basket {
        padding: 0 3% 0 3%;
    }

    .basket__wrapper {
        display: flex;
        justify-content: space-between;
    }

    .basket__products {
        width: 65%;
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        margin: 2.083vw 0 0 0;
    }

    .basket__payment {
        width: 35%;
        height: max-content;
        border: 1px solid #CDCDCD;
        border-radius: 10px;
        padding: 2.083vw 5% 5vw 5%;
    }

    .payment__title {
        font-size: 1.6vw;
        text-align: center;
        margin: 0 0 2.083vw 0;
    }

    .payment__field {
        display: flex;
        flex-direction: column;
        margin: 0 0 1.0416vw 0;
    }

    .field__caption {
        font-size: 1.0416vw;
        color: #B0B0B0;
        margin: 0 0 .52083vw 0;
    }

    .field__input {
        padding: .72916vw 0;
        text-indent: 1.14583vw;
        border-radius: .3125vw;
        border: 1px solid #B0B0B0;
        font-size: 1.14583vw;
        color: #B0B0B0;
    }

    .field__input::-webkit-input-placeholder {color: #B0B0B0;}

    .payment__wrapper {
        display: flex;
        align-items: center;
        margin: 1.302083vw 0 0 0;
    }

    .payment__btn {
        padding: .52083vw .7vw;
    }

    .payment__info {
        font-size: .7vw;
        line-height: .7vw;
        margin: 0 0 0 .6vw;
    }

    .payment__amount,
    .payment__delivery,
    .payment__total {
        font-size: 1.14583vw;
        margin: 0 0 1.0416vw 0;
    }

</style>
