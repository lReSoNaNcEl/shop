<template>
    <div>
        <Header/>
        <section class="providers">
            <div class="providers__wrapper">
                <h1 class="providers__title title">Поставщики</h1>
                <p class="providers__desc paragraph">Magna voluptate laborum id deserunt veniam esse dolore cupidatat do duis ex ex mollit mollit velit fugiat quis commodo eiusmod enim cupidatat incididunt consequat irure ea est pariatur non exercitation ex esse</p>
            </div>
            <Hooper class="slider" :infiniteScroll="true" :itemsToShow="3">
                <Slide v-for="provider of providers[0]" class="slider__item">
                    <img class="slider__item" :src="provider.icon"/>
                </Slide>
            </Hooper>
            <img class="providers__bg" src="/img/product/5.png"/>
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
    computed: {
        providers() {return this.$store.getters['provider/getProviders']}
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
