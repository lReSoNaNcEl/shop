<template>
    <div @wheel="sliderObserver">
        <Header/>
        <div class="preview">
            <h1 class="preview__title title">{{production[currentPage - 1].name}}</h1>
            <p class="preview__desc">{{production[currentPage - 1].desc}}</p>
            <div class="preview__wrapper">
                <nuxt-link to="/shop" class="preview__link btn">Каталог</nuxt-link>
                <p class="preview__amount">525 товаров</p>
            </div>
            <div class="preview__hint">
                <p class="hint__text">Крутите колёсико</p>
                <img class="hint__icon" src="img/hint.svg"/>
            </div>
        </div>

        <div class="production">
            <h2 class="production__title">Наши работы</h2>
            <div class="slider">
                <div ref="slider" class="slider__wrapper">
                    <img v-for="photo in production[currentPage - 1].photos" @click="sliderScroll" class="slider__item" :src="photo.path" :data-id="photo.id"/>
                </div>
            </div>
            <div class="photos">
                <img ref="photo"  class="photos__item" :src="production[currentPage - 1].photos[currentSlide - 1].path"/>
            </div>
        </div>

        <Footer/>
    </div>
</template>

<script>
 import Header from '@/components/Header'
 import Footer from '@/components/Footer'
 export default {
     data: () => ({
         scrollState: 0,
         currentSlide: 1,
         currentPage: 1,
         production: []
     }),
     methods: {
         sliderObserver(e) {
            const slider = this.$refs.slider //DOM слайдера
            const photo = this.$refs.photo //DOM фотографии в крупном плане
            const count = slider.childElementCount //количество элементов в слайдере
            const countOnScreen = 2 //количество элементов на экране
            const itemWidth = slider.children[0].clientWidth //ширина одного слайда
            const margin = window.getComputedStyle(slider.children[0]).getPropertyValue('margin-right').replace('px', '') //ширина отступа между слайдами
            let offset = parseFloat(itemWidth) + Math.ceil(parseFloat(margin)) //сдвиг при скролле


             if (e.deltaY > 0) {

                 console.log(this.production.length)

                 if (this.currentPage < this.production.length) {
                     this.currentPage++
                     // slider.style.animation = 'unset'
                     // photo.style.animation = 'unset'
                     //
                     // slider.style.animationFillMode = 'forwards'
                     // photo.style.animationFillMode = 'forwards'
                     //
                     // slider.style.animation = '1s Hide'
                     // photo.style.animation = '1s Hide'
                 }

                 // if (this.currentSlide < count) {
                 //     this.currentSlide++;
                 //     slider.style.left = `${this.scrollState -= offset}px`
                 // }
             }
             else {
                 if (this.currentPage > 1) {
                     this.currentPage--
                 }

                 // if (this.currentSlide > 1) {
                 //     this.currentSlide--;
                 //     slider.style.left = `${this.scrollState += offset}px`
                 // }
             }

             console.dir(this.scrollState)



             // console.dir(this.scrollState)
             // console.dir(this.currentSlide)
         },
         sliderScroll(e) {
             const slider = this.$refs.slider //DOM слайдера
             const count = slider.childElementCount //количество элементов в слайдере
             const countOnScreen = 2 //количество элементов на экране
             const itemWidth = slider.children[0].clientWidth //ширина одного слайда
             const margin = window.getComputedStyle(slider.children[0]).getPropertyValue('margin-right').replace('px', '') //ширина отступа между слайдами
             let offset = parseFloat(itemWidth) + Math.ceil(parseFloat(margin)) //сдвиг при скролле
             const sliderWidth = count * offset
             const id = parseInt(e.target.getAttribute('data-id'))

            this.currentSlide = id
             //slider.style.left = `${this.scrollState -= offset}px`

             console.log(this.currentSlide)

         }
     },
     created() {
         this.production = this.$store.getters['production/getPreview']
         console.log(this.production)
     },
     components: {Header, Footer}
 }
</script>

<style scoped>

    .photos {
        position: absolute;
        width: 59.375vw;
        height: 100vh;
        z-index: 1;
        top: 0;
        right: 0;
    }

    .photos__item {
        position: relative;
        width: 100%;
        height: 100vh;
        background-size: 100% 100%;
        clip-path: polygon(0 62%, 24% 0, 100% 0, 100% 100%, 0 100%, 0 75%, 0 72%, 0 68%, 0 65%);
        z-index: 1;
    }

    .preview {
        position: relative;
        width: 32%;
        padding: 0 0 0 3%;
        z-index: 2;
    }

    .preview__title {}

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
        /*height: inherit;*/
        width: 8.85416vw;
        padding: 7.2vw 0 0 0;
        font-size: .72916vw;
        color: white;
        transform: rotate(270deg);
    }

    .hint__icon {
        height: 8.85416vw;
    }

    .production {
        padding: 0 0 0 3%;
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

    .slider__wrapper {
        width: 100%;
        position: relative;
        display: flex;
        flex-flow: row nowrap;
        transition: .5s all;
    }

    .slider__item {
        width: 15.625vw;
        height: 7.2916vw;
        cursor: pointer;
        margin: 0 1.875vw 0 0;
        border-radius: .52083vw;
    }

</style>
