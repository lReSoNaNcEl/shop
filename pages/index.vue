<template>
    <div @wheel="sliderObserver">
        <Header/>
        <div class="preview">
            <h1 ref="title" class="preview__title title">{{production[currentPage - 1].name}}</h1>
            <p ref="desc" class="preview__desc">{{production[currentPage - 1].desc}}</p>
            <div class="preview__wrapper">
                <nuxt-link to="/shop" class="preview__link btn">Каталог</nuxt-link>
                <p class="preview__amount">525 товаров</p>
            </div>
            <div class="preview__hint">
                <p class="hint__text">Крутите колёсико</p>
                <img class="hint__icon" src="img/hint.svg"/>
            </div>
        </div>

        <div ref="production" class="production">
            <h2 class="production__title">Наши работы</h2>
            <Hooper ref="carousel" :playSpeed="3000" :autoPlay="true" :itemsToShow="3" :infiniteScroll="true" class="slider">
                <Slide v-for="photo in production[currentPage - 1].photos">
                    <img @mousemove="sliderScroll" class="slider__item" :src="photo.path" :data-id="photo.id "/>
                </Slide>
            </Hooper>
        </div>
        <img ref="photo" class="photo" :src="production[currentPage - 1].photos[currentSlide - 1].path"/>
        <Footer/>
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
         production: [],
         switchSlides: null
     }),
     watch: {
        currentSlide: function () {
            const elements = [
                {
                    DOM: this.$refs.photo,
                    duration: 600,
                    name: 'ShiftRight'
                },
            ]

            this.setAnimation(elements)
            this.resetAnimation(elements)
        }
     },
     methods: {
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
                     duration: 700,
                     name: 'ShiftLeft'
                 },
                 {
                     DOM: this.$refs.desc,
                     duration: 900,
                     name: 'ShiftLeft'
                 },
                 {
                     DOM: this.$refs.photo,
                     duration: 800,
                     name: 'ShiftRight'
                 },
                 {
                     DOM: this.$refs.production,
                     duration: 1000,
                     name: 'ShiftLeft'
                 }
             ]

             if (e.deltaY > 0) {
                 if (this.currentPage < this.production.length) {
                     this.currentPage++
                     this.setAnimation(elements)
                     this.resetAnimation(elements)
                 }
             }
             else if (e.deltaY < 0) {
                 if (this.currentPage > 1) {
                     this.currentPage--
                     this.setAnimation(elements)
                     this.resetAnimation(elements)
                 }
             }
         },
         sliderScroll(e) {
             this.currentSlide = +this.$refs.carousel.currentSlide + 1

             if (this.currentSlide > this.production[this.currentPage - 1].photos.length || this.currentSlide < 1)
                 this.currentSlide = 1

         }
     },
     created() {
         this.production = this.$store.getters['production/getPreview']
     },
     mounted() {
         this.switchSlides = setInterval(this.sliderScroll, 10)
     },
     destroyed() {
         clearInterval(this.switchSlides)
     },
     components: {Header, Footer, Hooper, Slide}
 }
</script>

<style>
    body {
        overflow: hidden;
    }
    .photo {
        position: absolute;
        width: 59.375vw;
        height: 100vh;
        z-index: 2;
        top: 0;
        right: 0;
        background-size: 100% 100%;
        clip-path: polygon(0 62%, 24% 0, 100% 0, 100% 100%, 0 100%, 0 75%, 0 72%, 0 68%, 0 65%);
        filter: grayscale(50%);
    }

    .preview {
        width: 32%;
        padding: 0 0 0 3%;
        z-index: 2;
        overflow: hidden;
    }

    .preview__desc {
        height: 13.5416vw;
        font-size: .9375vw;
        line-height: 180%;
    }

    .preview__wrapper {
        display: flex;
        align-items: center;
        margin: 0 0 3.125vw 0;
    }

    .preview__amount {
        font-size: .72916vw;
        font-weight: 500;
        margin: 0 0 0 .833vw;
    }

    .preview__hint {
        display: flex;
        position: absolute;
        top: 31.25vw;
        left: 88.5416vw;
        z-index: 3;
    }

    .hint__text {
        width: 8.85416vw;
        padding: 7.2vw 0 0 0;
        font-size: .72916vw;
        color: white;
        transform: rotate(270deg);
    }

    .hint__icon {height: 8.85416vw;}

    .production {
        position: relative;
        padding: 0 0 0 3%;
        z-index: 0;
    }

    .production__title {
        font-size: 1.4583vw;
        margin: 0 0 1.875vw 0;
    }

    .slider {
        width: 50%;
        overflow-x: hidden;
        margin: 0 0 2.083vw 0;
    }

    .slider__item {
        width: 15.625vw;
        height: 7.2916vw;
        cursor: pointer;
        margin: 0 1.875vw 0 0;
        border-radius: .52083vw;
    }

</style>
