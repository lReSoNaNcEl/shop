<template>
    <div>
        <Header/>
        <section class="basket">
            <h1 class="basket__title title">Корзина</h1>
            <div class="basket__wrapper">
                <div class="basket__products">
                    <Product v-for="product in basket" :linkOnImg="`/shop/product/${product.id}`" :id="product.id" :title="product.title" :img="product.img ? product.img : '/img/product/1.png'" :desc="product.desc" :price="product.price" :volume="product.volume"/>
                </div>
                <form class="basket__payment">
                    <h2 class="payment__title">Данные покупателя</h2>

                    <div class="payment__field">
                        <label ref="nameLabel" class="field__caption">Имя</label>
                        <input class="field__input" @focusout="validateName($refs.name)" type="text" placeholder="Иван" ref="name">
                    </div>

                    <div class="payment__field">
                        <label ref="emailLabel" class="field__caption">Почта</label>
                        <input class="field__input" @focusout="validateEmail($refs.email)" type="text" placeholder="ivan@mail.ru" ref="email">
                    </div>

                    <div class="payment__field">
                        <label ref="phoneLabel" class="field__caption">Телефон</label>
                        <input class="field__input" @focusout="validatePhone($refs.phone)" type="text" v-mask="'+7 (###) ###-##-##'" placeholder="+7 (900) 800-70-60" ref="phone">
                    </div>

                    <div class="payment__field">
                        <label ref="commentLabel" class="field__caption">Комментарий</label>
                        <input class="field__input" @focusout="validateComment($refs.comment,)" type="text" placeholder="Комментарий" ref="comment">
                    </div>

                    <p class="payment__amount">Всего товаров: <span class="highlight">{{basket.length}}</span></p>
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
                const name = this.$refs.name.value.trim()
                const email = this.$refs.email.value.trim()
                const phone = this.$refs.phone.value.trim()
                const comment = this.$refs.comment.value.trim()

                const nameDOM = this.$refs.name
                const emailDOM = this.$refs.email
                const phoneDOM = this.$refs.phone
                const commentDOM = this.$refs.comment

                if (this.validateName(nameDOM) &&
                    this.validateEmail(emailDOM) &&
                    this.validatePhone(phoneDOM) &&
                    this.validateComment(commentDOM)
                ) {
                    const products = this.basket.map(product => product.id)
                    const request = {name, email, phone, comment, products}

                    this.$store.dispatch('basket/saveMail', request).then(() => {
                        this.alert('Заявка успешно отправлена', 'success')
                        let res = this.$store.getters['basket/getMailResponse']
                        console.log(res)
                    })
                }
                else this.alert('Заполните заявку', 'warning', 1000)

            },
            alert(text, type, time = 1500) {
                new Noty({type: type, layout: 'topRight', theme: 'metroui', text: text, timeout: time,})
                    .show()
            },
            activeField(label, css, message = 'Поле обязательно для заполнения', color = 'red') {
                label.textContent = message
                css.boxShadow = css.boxShadow = `1px 1px 1px 1px ${color}`
            },
            validateName(DOM) {
                const label = this.$refs.nameLabel
                const css = DOM.style
                if (DOM.value === '') this.activeField(label, css)
                else {
                    this.activeField(label, css, 'Имя', 'green')
                    return true
                }
                return false
            },
            validateEmail(DOM) {
                const label = this.$refs.emailLabel
                const css = DOM.style
                if (DOM.value === '')
                    this.activeField(label, css)
                else if (!/^([a-zA-z0-9])+([@])([a-z])+([.])([a-z]){2,5}$/.test(DOM.value))
                    this.activeField(label, css, 'Некорректный адрес почты', 'red')
                else {
                    this.activeField(label, css, 'Почта', 'green')
                    return true
                }
                return false
            },
            validatePhone(DOM) {
                const label = this.$refs.phoneLabel
                const css = DOM.style
                if (DOM.value === '') this.activeField(label, css)
                else {
                    this.activeField(label, css, 'Телефон', 'green')
                    return true
                }
                return false
            },
            validateComment(DOM) {
                const label = this.$refs.commentLabel
                const css = DOM.style
                if (DOM.value === '') this.activeField(label, css)
                else {
                    this.activeField(label, css, 'Комментарий', 'green')
                    return true
                }
                return false
            }
        },
        created() {
            this.$store.commit('basket/syncBasket')
        },
        mounted() {
            if (this.basket.length === 0) {
                const container = document.getElementsByClassName('basket__products')[0]
                container.textContent = 'Товары в корзину еще не были добавлены'
            }
        },
        components: {Header, Footer, Product, VueMask}
    }
</script>
<style scoped>
    .footer {position: static !important;}
</style>
