<template>
    <div>
        <Header/>
        <section class="providers">
            <div class="providers__wrapper">
                <h1 class="providers__title title">Поставщики</h1>
                <p class="providers__desc paragraph">Magna voluptate laborum id deserunt veniam esse dolore cupidatat do duis ex ex mollit mollit velit fugiat quis commodo eiusmod enim cupidatat incididunt consequat irure ea est pariatur non exercitation ex esse</p>
            </div>
            <Hooper class="slider" :itemsToShow="3" group="group1">
                <Slide v-for="provider of providers[0]" class="slider__item">
                    <img class="slider__item" :src="provider.icon"/>
                </Slide>
            </Hooper>
            <Hooper class="slider" :itemsToShow="3" group="group2">
                <Slide v-for="provider of providers[1]" class="slider__item">
                    <img class="slider__item" :src="provider.icon"/>
                </Slide>
            </Hooper>

            <img class="providers__bg" src="/img/provider.png"/>
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
</style>
