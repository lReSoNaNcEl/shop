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
        </div>

        <div class="photos">
            <h2 class="photos__title">Наши работы</h2>
            <div class="slider">
                <div ref="slider" class="slider__wrapper">
                    <img class="slider__item" src="img/img_1.png"/>
                    <img class="slider__item" src="img/img_2.png"/>
                    <img class="slider__item" src="img/img_3.png"/>
                    <img class="slider__item" src="img/img_1.png"/>
                    <img class="slider__item" src="img/img_2.png"/>
                    <img class="slider__item" src="img/img_3.png"/>
                </div>
            </div>
        </div>

        <div class="contacts">
            <p class="contacts__phone">8 (800) 888-88-88</p>
            <div class="contacts__barrier"></div>
            <p class="contacts__address">г.Липецк ул.Космонавтов д.1</p>
        </div>
    </div>
</template>

<script>
 import Header from '@/components/Header'
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

            if (e.deltaY > 0) {
                if (this.currentSlide < count) {
                    this.currentSlide++;
                    slider.style.left = `${this.scrollState -= offset}px`
                }
            }
            else {
                if (this.currentSlide > 1) {
                    this.currentSlide--;
                    slider.style.left = `${this.scrollState += offset}px`
                }
            }

            console.dir(this.scrollState)
            console.dir(this.currentSlide)
        }
     },
     components: {Header}
 }
</script>

<style>
    .app {
        width: 100%;
        height: 100vh;
        background: url('../static/img/slide_1.svg') no-repeat;
        background-position: top right;
        /*background-size: 59.375vw 100vh;*/
    }

    .preview {
        width: 32%;
        padding: 0 0 0 3%;
    }

    .preview__title {
        font-size: 48px;
        font-weight: bold;
        /*margin: 110px 0 45px 0;*/
        margin: 0 0 45px 0;
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
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
        /*left: 70px;*/
        font-size: 14px;
        color: white;
        /*margin: 10px 0 0 0;*/
        transform: rotate(270deg);
    }

    .photos {
        padding: 0 0 0 3%;
    }

    .photos__title {
        margin: 0 0 36px 0;
    }

    .slider {
        width: 50%;
        overflow-x: hidden;
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

    .contacts {
        height: 36px;
        display: flex;
        align-items: center;
        padding: 0 0 0 3%;
    }

    .contacts__barrier {
        width: 36px;
        height: 1px;
        background-color: #C9C9C9;
        transform: rotate(90deg);
    }

</style>
