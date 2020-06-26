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
             this.currentPage = id;
         },
         updateCarousel(payload) {
             this.myCarouselData = payload.currentSlide;
         },
         slideTo(num){
             this.$refs.carousel.slideTo(num);
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
             console.log(this.slider)
         })
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

<style scoped>
    .main {
        overflow-x: hidden;
    }

    .preview {
        width: 32%;
        padding: 0 0 0 3%;
        position: relative;
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
    }

    .preview__controller {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-end;
        position: absolute;
        top: 40%;
        right: 3%;
        z-index: 3;
        font-size: .9vw;
        color: white;
        font-weight: 600;
    }

    .controller__item {
        margin: 0 0 1.2vw 0;
        cursor: pointer;
        text-align: right;
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
    }

    .slider__item {
        width: 14.5vw;
        height: 7.2916vw;
        cursor: pointer;
        margin: 0 1.875vw 0 0;
        border-radius: .52083vw;
    }

    @media only screen and (max-width: 1024px) {
        .preview {
            width: 60%;
            z-index: 1;
            color: white;
        }

        .preview__title {
            margin: 12.6953125vw 0 0 0;
        }

        .preview__desc {
            height: 24.4140625vw;
            font-size: 1.7578125vw;
            margin: 4.1015625vw 0 0 0;
        }

        .preview__wrapper {margin: 0;}

        .preview__link {
            font-size: 1.5625vw;
            border: 1px solid white;
            padding: 1.3671875vw 4.1015625vw;
        }

        .preview__controller {
            font-size: 1.6vw;
            top: 45vw;
            display: flex;
            flex-flow: column nowrap;
        }
        .controller__item {
            margin: 0 0 2vw 0;
        }

        .production {
            position: static;
            margin: 27.34375vw 0 0 0;
        }

        .production__title {
            font-size: 2.734375vw;
            margin: 0 0 3.125vw 0;
        }

        .slider {
            width: 100%;
            overflow-x: hidden;
            margin: 0 0 2.083vw 0;
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

        @media only screen and (max-width: 480px) {
            .production {
                margin: 32vw 0 0 0;
            }

            .preview {
                height: initial;
                width: 100%;
                padding: 0 3%;
            }

            .preview__controller {display: none;}

            .preview__hint {display: none;}

            .preview__desc {
                height: initial;
                font-size: 4.6vw;
            }

            .preview__wrapper {margin: 5vw 0 0 0;}

            .preview__link {
                font-size: 4.6vw;
                padding: 1.5vw 6vw;
                border-radius: 5px;
            }
        }
    }

</style>
