<template>
    <div>
        <Preloader/>
        <Header/>
        <div class="wrapper mobile__slider">
            <img ref="photo" class="photo photo_main" :src="providers.images[currentSlide - 1].image"/>
            <div class="preview">
                <h1 ref="title" class="providers__title title">{{providers.title}}</h1>
                <p ref="desc" v-html="providers.text" class="preview__desc paragraph"></p>
            </div>

            <div class="photo__layout"></div>

            <div ref="production" class="production">
                <h2 class="production__title">Галерея</h2>
                <Hooper ref="carousel" :settings="sliderConfig" class="slider">
                    <Slide v-for="(item, i) in providers.images">
                        <img @click="slideTo(i)" class="slider__item" :src="item.image" :data-id="item.id "/>
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
        providers: {
            id: 1,
            title: 'Title',
            text: 'Text',
            images: [
                {id: 1, image: '/img/preview/slide_1/1.png'},
                {id: 2, image: '/img/preview/slide_1/2.png'},
                {id: 3, image: '/img/preview/slide_1/3.png'},
            ]
        },
        currentSlide: 1,
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
    }),
    watch: {
        currentSlide: function () {
            const elements = [{DOM: this.$refs.photo, duration: 1500, name: 'Show'},]
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
    created() {
        this.$store.dispatch('provider/saveProviders').then(() => {
            this.providers = this.$store.getters['provider/getProviders']
        })
    },
    components: {Preloader, Header, Footer, Hooper, Slide}
}
</script>
