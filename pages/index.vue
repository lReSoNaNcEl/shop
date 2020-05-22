<template>
    <div class="app" @wheel="sliderObserver">
        <Header/>
        <div class="preview">
            <h1 class="preview__title">Фасад</h1>
            <p class="preview__desc">Фаса́д — наружная лицевая сторона здания. Также фасадом называют чертёж ортогональной проекции здания на вертикальную плоскость. Формы, пропорции, декор фасада определяются назначением архитектурного сооружения, его конструктивными особенностями, стилистическим решением его архитектурного образа.</p>
            <div class="preview__wrapper">
                <nuxt-link to="#" class="preview__link">Каталог</nuxt-link>
                <p class="preview__amount">525 товаров</p>
            </div>
            <div class="preview__hint">
                <p class="hint__text">Крутите колёсико</p>
                <img class="hint__icon" src="img/hint.svg"/>
            </div>
        </div>s

        <div class="photos">
            <h2 class="photos__title">Наши работы</h2>
            <div class="slider">
                <div ref="slider" class="slider__wrapper">
                    <img @click="sliderObserver" class="slider__item" src="img/img_1.png"/>
                    <img @click="sliderObserver" class="slider__item" src="img/img_2.png"/>
                    <img @click="sliderObserver" class="slider__item" src="img/img_3.png"/>
                    <img @click="sliderObserver" class="slider__item" src="img/img_1.png"/>
                    <img @click="sliderObserver" class="slider__item" src="img/img_2.png"/>
                    <img @click="sliderObserver" class="slider__item" src="img/img_3.png"/>
                </div>
            </div>
        </div>

        <Footer/>
    </div>
</template>

<script>
 import Header from '@/components/Header'
 import Footer from '@/components/Footer'
 export default {
     data() {
         return {
             scrollState: 0,
             currentSlide: 1,
         }
     },
     methods: {
         sliderObserver(e) {
            const slider = this.$refs.slider //DOM слайдера
            const count = slider.childElementCount //количество элементов в слайдере
            const countOnScreen = 2 //количество элементов на экране
            const itemWidth = slider.children[0].clientWidth //ширина одного слайда
            const margin = window.getComputedStyle(slider.children[0]).getPropertyValue('margin-right').replace('px', '') //ширина отступа между слайдами
            let offset = parseFloat(itemWidth) + Math.ceil(parseFloat(margin)) //сдвиг при скролле

             if (e.type !== 'click') {

                 if (e.deltaY > 0) {
                     if (this.currentSlide < count) {
                         this.currentSlide++;
                         slider.style.left = `${this.scrollState -= offset}px`
                     }
                 } else {
                     if (this.currentSlide > 1) {
                         this.currentSlide--;
                         slider.style.left = `${this.scrollState += offset}px`
                     }
                 }

             }
             else {
                 console.log(e)
             }

             console.dir(this.scrollState)
             console.dir(this.currentSlide)
             console.log(e)
         }
     },
     components: {Header, Footer}
 }
</script>

<style>
    .app {
        width: 100%;
        height: 100vh;
        background: url('../static/img/slide_1.svg') no-repeat;
        background-position: top right;
        background-size: 59.375vw 100vh;
    }

    .preview {
        width: 32%;
        padding: 0 0 0 3%;
    }

    .preview__title {
        font-size: 48px;
        font-weight: bold;
        margin: 100px 0 40px 0;
        text-transform: uppercase;
    }

    .preview__desc {
        font-size: 18px;
        margin: 0 0 40px 0;
        line-height: 180%;
    }

    .preview__wrapper {
        display: flex;
        align-items: center;
        margin: 0 0 60px 0;
    }

    .preview__link {
        font-size: 16px;
        font-weight: 500;
        padding: 14px 42px;
        border: 1px solid black;
        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 6px;
    }

    .preview__amount {
        font-size: 12px;
        font-weight: 500;
        margin: 0 0 0 16px;
    }

    .preview__hint {
        display: flex;
        position: absolute;
        bottom: 3%;
        right: 3%;
        z-index: 1;
    }

    .hint__text {
        height: inherit;
        padding: 130px 0 0 0;
        font-size: 14px;
        color: white;
        transform: rotate(270deg);
    }

    .photos {
        padding: 0 0 0 3%;
    }

    .photos__title {
        font-size: 28px;
        font-weight: bold;
        margin: 0 0 36px 0;
    }

    .slider {
        width: 50%;
        overflow-x: hidden;
        margin: 0 0 38px 0;
    }

    .slider__wrapper {
        width: 100%;
        position: relative;
        display: flex;
        flex-flow: row nowrap;
        transition: .5s all;
    }

    .slider__item {
        cursor: pointer;
        margin: 0 1.875vw 0 0;
    }

</style>
