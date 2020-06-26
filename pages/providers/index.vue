<template>
    <div @wheel="sliderObserver">
        <Header/>
        <div class="wrapper">
            <div class="preview">
                <h1 ref="title" class="providers__title title">{{providers[currentPage - 1].name}}</h1>
                <p ref="desc" class="providers__desc paragraph">Magna voluptate laborum id deserunt veniam esse dolore cupidatat do duis ex ex mollit mollit velit fugiat quis commodo eiusmod enim cupidatat incididunt consequat irure ea est pariatur non exercitation ex esse</p>
            </div>

            <div class="photo__layout"></div>
            <img ref="photo" class="photo" :src="providers[currentPage - 1].photos[currentSlide - 1].path"/>

            <div ref="production" class="production production__margin-top">
                <Hooper @slide="updateCarousel" ref="carousel" :settings="sliderConfig" class="slider">
                    <Slide v-for="(photo, i) in providers[currentPage - 1].photos">
                        <img @click="slideTo(i)" @mousemove="sliderScroll" class="slider__item" :src="photo.path"
                             :data-id="photo.id "/>
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
        // this.$store.dispatch('provider/saveProviders').then(() => {
        //     console.log(this.$store.getters['provider/getProviders'])
        // })
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
