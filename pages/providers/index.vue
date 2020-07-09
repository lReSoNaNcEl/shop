<template>
    <div @wheel="sliderObserver">
        <Preloader/>
        <Header/>
        <div class="wrapper">
            <div class="preview">
                <h1 ref="title" class="providers__title title">{{data.title}}</h1>
                <p ref="desc" v-html="data.text" class="preview__desc paragraph"></p>
                <div class="preview__wrapper">
                    <nuxt-link to="/shop" class="preview__link btn">Каталог</nuxt-link>
                </div>
            </div>

            <div class="photo__layout"></div>
            <img ref="photo" class="photo" :src="providers[currentPage - 1].photos[currentSlide - 1].path"/>

            <div ref="production" class="production">
                <h2 class="production__title">Галерея</h2>
                <Hooper @slide="updateCarousel" ref="carousel" :settings="sliderConfig" class="slider">
                    <Slide v-for="(photo, i) in providers[currentPage - 1].photos">
                        <img @click="slideTo(i)" @mousemove="sliderScroll" class="slider__item" :src="photo.path" :data-id="photo.id "/>
                    </Slide>
                </Hooper>
            </div>
            <Footer/>
        </div>
    </div>
</template>

<script>
import {Hooper, Slide} from 'hooper'
import 'hooper/dist/hooper.css';
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Preloader from '@/components/Preloader'
export default {
    data: () => ({
        currentSlide: 1,
        currentPage: 1,
        production: [],
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
        },
        data: {}
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
                // {
                //     DOM: this.$refs.production,
                //     duration: 1500,
                //     name: 'Show'
                // }
            ]

            if (this.delay !== true) {
                if (e.deltaY > 0) {
                    if (this.currentPage < this.providers.length) {
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
            }
        },
        sliderScroll(e) {
            this.currentSlide = +this.$refs.carousel.currentSlide + 1

            if (this.currentSlide > this.providers[this.currentPage - 1].photos.length || this.currentSlide < 1)
                this.currentSlide = 1

        }
    },
    computed: {
        providers() {return this.$store.getters['provider/getProviders']}
    },
    created() {
        this.$store.dispatch('provider/saveProviders').then(() => {
            console.log(this.$store.getters['provider/getImages'])
            this.data = this.$store.getters['provider/getImages']
        })
    },
    mounted() {
        this.switchSlides = setInterval(this.sliderScroll, 10)
    },
    destroyed() {
        clearInterval(this.switchSlides)
    },
    components: {Preloader, Header, Footer, Hooper, Slide}
}
</script>
