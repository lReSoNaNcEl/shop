<template>
    <div>
        <Preloader/>
        <Header/>
        <div class="wrapper mobile__slider">
            <img ref="photo" class="photo photo_main" :src="providers[this.currentSlide - 1].path"/>
            <div class="preview">
                <h1 ref="title" class="providers__title title">{{data.title}}</h1>
                <p ref="desc" v-html="data.text" class="preview__desc paragraph"></p>
            </div>

            <div class="photo__layout"></div>

            <div ref="production" class="production">
                <h2 class="production__title">Галерея</h2>
                <Hooper ref="carousel" :settings="sliderConfig" class="slider">
                    <Slide v-for="(photo, i) in providers">
                        <img @click="slideTo(i)" class="slider__item" :src="photo.path" :data-id="photo.id "/>
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
        slideTo(index) {
            this.currentSlide = index + 1
            this.$refs.carousel.slideTo(index)
        },
        setAnimation(items) {for (let item of items) item.DOM.style.animation = `${item.duration}ms ${item.name}`},
        resetAnimation(items) {for (let item of items) setTimeout(() => item.DOM.style.animation = null, item.duration)},
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
    components: {Preloader, Header, Footer, Hooper, Slide}
}
</script>
