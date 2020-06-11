<template>
    <div @wheel="sliderObserver">
        <Header/>
        <section class="providers">
            <div class="providers__wrapper">
                <h1 ref="title" class="providers__title title">{{providers[currentPage - 1].name}}</h1>
                <p ref="desc" class="providers__desc paragraph">Magna voluptate laborum id deserunt veniam esse dolore cupidatat do duis ex ex mollit mollit velit fugiat quis commodo eiusmod enim cupidatat incididunt consequat irure ea est pariatur non exercitation ex esse</p>
            </div>
            <Hooper @slide="updateCarousel" ref="carousel" :settings="sliderConfig" class="slider">
                <Slide v-for="(photo, i) in providers[currentPage - 1].photos" >
                    <img @click="slideTo(i)" @mousemove="sliderScroll" class="slider__item" :src="photo.path" :data-id="photo.id "/>
                </Slide>
            </Hooper>
            <img ref="photo" class="providers__bg" :src="providers[currentPage - 1].photos[currentSlide - 1].path"/>
        </section>
        <Footer/>
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
    // created() {
    //     this.providers = this.$store.getters['production/getProduction']
    // },
    mounted() {
        this.switchSlides = setInterval(this.sliderScroll, 10)
    },
    destroyed() {
        clearInterval(this.switchSlides)
    },
    components: {Header, Footer, Hooper, Slide}
}
</script>

<style scoped>
    .providers {
        padding: 0 0 0 3%;
    }

    .providers__wrapper {
        display: flex;
        flex-flow: column wrap;
        width: 32%;
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

    .providers__bg {
        position: absolute;
        width: 59.375vw;
        height: 100vh;
        z-index: 1;
        top: 0;
        right: 0;
        -webkit-clip-path: polygon(0 62%, 24% 0, 100% 0, 100% 100%, 0 100%, 0 75%, 0 72%, 0 68%, 0 65%);
        clip-path: polygon(0 62%, 24% 0, 100% 0, 100% 100%, 0 100%, 0 75%, 0 72%, 0 68%, 0 65%);
        -webkit-filter: grayscale(50%);
        filter: grayscale(50%);
    }

    @media only screen and (max-width: 1024px) {
        .providers__wrapper {
            color: white;
            position: relative;
            z-index: 1;
            margin: 0 0 32vw 0;
        }

        .providers__bg {
            width: 100%;
            height: 73.2421875vw;
            clip-path: none;
            top: 10.7421875vw;
            z-index: 0;
            border-radius: 1.46484375vw;
        }

        .slider {
            position: relative;
            z-index: 1;
            width: 100%;
            overflow-x: hidden;
            margin: 0 0 3vw 0;
        }

        .hooper {
            height: 13.671875vw !important;
        }

        .slider__item {
            width: 29.296875vw;
            cursor: pointer;
            margin: 0 1.875vw 0 0;
            border-radius: .52083vw;
            height: 13.671875vw !important;
        }
    }
</style>
