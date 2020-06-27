<template>
    <div class="main" @wheel="sliderObserver">
        <Header/>
        <div class="wrapper">
            <div class="preview">
                <h1 ref="title" class="preview__title title">{{slider[currentPage - 1].title}}</h1>
                <p ref="desc" v-html="slider[currentPage - 1].text" class="preview__desc"></p>
                <div class="preview__wrapper">
                    <nuxt-link to="/shop" class="preview__link btn">Каталог</nuxt-link>
                </div>
                <div class="preview__hint">
                    <p class="hint__text">Крутите колёсико</p>
                    <img class="hint__icon" src="img/hint.svg"/>
                </div>
            </div>

            <div class="preview__controller">
                <div @click="switchPages" v-for="item in slider" :data-id="item.id" class="controller__item">{{item.title}} —</div>
            </div>

            <div class="photo__layout"></div>
            <img ref="photo" class="photo" :src="slider[currentPage - 1].images[currentSlide - 1].image"/>

            <div ref="production" class="production">
                <h2 class="production__title">Наши работы</h2>
                <Hooper @slide="updateCarousel" ref="carousel" :settings="sliderConfig" class="slider">
                    <Slide v-for="(image, i) in slider[currentPage - 1].images" >
                        <img @click="slideTo(i)" @mousemove="sliderScroll" class="slider__item" :src="image.image" :data-id="image.id "/>
                    </Slide>
                </Hooper>
            </div>
            <Footer/>
        </div>
    </div>
</template>

<script>
 import 'animate.css/animate.compat.css'
 import {Hooper, Slide} from 'hooper'
 import 'hooper/dist/hooper.css';
 import Header from '@/components/Header'
 import Footer from '@/components/Footer'
 export default {
     data: () => ({
         currentSlide: 1,
         currentPage: 1,
         slider: [{
             id: 1,
             title: 'Кровля',
             text: 'Кро́вля — верхний элемент покрытия здания, подвергающийся атмосферным воздействиям. Главной её функцией является защита внутренних помещений от атмосферных осадков и воздействий. Главными требованиями к кровле являются лёгкость, долговечность, экономичность в изготовлении и эксплуатации.',
             images: [
                 {id: 1, path: '/img/preview/slide_1/1.png'},
                 {id: 2, path: '/img/preview/slide_1/2.png'},
                 {id: 3, path: '/img/preview/slide_1/3.png'},
             ]
         }],
         switchSlides: null,
         delay: false,
         delayTime: 1500,
         myCarouselData: 0,
         sliderConfig: {
             playSpeed: 6000,
             autoPlay: true,
             itemsToShow: 3,
             infiniteScroll: true,
             transition: 600
         }
     }),
     watch: {
        currentSlide: function () {
            const elements = [
                {
                    DOM: this.$refs.photo,
                    duration: 1500,
                    name: 'Show'
                },
            ]

            this.setAnimation(elements)
            this.resetAnimation(elements)
        }
     },
     methods: {
         switchPages(e) {
             const id = +e.currentTarget.getAttribute('data-id')
             const items = document.getElementsByClassName('controller__item')
             for (let item of items)
                 item.textContent = item.textContent.replace('——', '—')
             e.currentTarget.textContent = e.currentTarget.textContent.replace('—', '——')
             this.currentPage = id
         },
         updateCarousel(payload) {
             this.myCarouselData = payload.currentSlide
         },
         slideTo(num){
             this.$refs.carousel.slideTo(num)
         },
         setAnimation(items) {
             for (let item of items) item.DOM.style.animation = `${item.duration}ms ${item.name}`
         },
         resetAnimation(items) {
             for (let item of items)
                 setTimeout(() => item.DOM.style.animation = null, item.duration)
         },
         sliderObserver(e) {
             this.$refs.carousel.currentSlide = 0
             const elements = [
                 {
                     DOM: this.$refs.title,
                     duration: 1200,
                     name: 'ShiftLeft'
                 },
                 {
                     DOM: this.$refs.desc,
                     duration: 1200,
                     name: 'ShiftLeft'
                 },
                 {
                     DOM: this.$refs.photo,
                     duration: 1500,
                     name: 'Show'
                 },
                 {
                     DOM: this.$refs.production,
                     duration: 1500,
                     name: 'Show'
                 }
             ]

             if (this.delay !== true) {
                 if (e.deltaY > 0) {
                     if (this.currentPage < this.slider.length) {
                         this.delay = true
                         this.currentPage++
                         this.setAnimation(elements)
                         this.resetAnimation(elements)
                         setTimeout(() => this.delay = false, this.delayTime)
                     }
                 }
                 else if (e.deltaY < 0) {
                     if (this.currentPage > 1) {
                         this.delay = true
                         this.currentPage--
                         this.setAnimation(elements)
                         this.resetAnimation(elements)
                         setTimeout(() => this.delay = false, this.delayTime)
                     }
                 }

                 const items = document.getElementsByClassName('controller__item')
                 for (let item of items) {
                     item.textContent = item.textContent.replace('——', '—')
                     const id = +item.getAttribute('data-id')
                     if (this.currentPage === id)
                        item.textContent = item.textContent.replace('—', '——')
                 }

             }
         },
         sliderScroll(e) {
             this.currentSlide = +this.$refs.carousel.currentSlide + 1

             if (this.currentSlide > this.slider[this.currentPage - 1].images.length || this.currentSlide < 1)
                 this.currentSlide = 1

         }
     },
     created() {
         this.$store.dispatch('slider/saveSlider').then(() => {
             this.slider = this.$store.getters['slider/getSlider']
         })
     },
     mounted() {
         const activeControllerItem = document.getElementsByClassName('controller__item')[0]
         activeControllerItem.textContent = activeControllerItem.textContent.replace('—', '——')
         this.switchSlides = setInterval(this.sliderScroll, 10)
     },
     destroyed() {
         clearInterval(this.switchSlides)
     },
     components: {Header, Footer, Hooper, Slide}
 }
</script>
