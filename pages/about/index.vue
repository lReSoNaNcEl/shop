<template>
    <div class="app">
        <Header/>
        <section class="about">
            <h1 class="about__title title">О компании</h1>
            <p class="about__desc paragraph">Magna voluptate laborum id deserunt veniam esse dolore cupidatat do duis ex ex mollit mollit velit fugiat quis commodo eiusmod enim cupidatat incididunt consequat irure ea est pariatur non exercitation ex esse proident deserunt reprehenderit quis Lorem enim amet et eiusmod occaecat minim sit magna qui enim eu et voluptate exercitation mollit dolore qui sint sunt ea elit ullamco eiusmod</p>
            <div class="about__contacts">
                Адрес: г.Липецк ул.Космонавтов д.1<br>
                Телефон: 8 (800) 888-88-88<br>
                Email: steel-house@example.ru
            </div>
            <div class="about__social">
                Вконтакте: vk.com/steel-house<br>
                Whats Up: 8 (800) 888-88-88<br>
                FaceBook: facebook.com/steel-house<br>
                Instagram: @steel-house
            </div>
        </section>
        <Footer/>
    </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
    components: {Header, Footer}
}
</script>
<style scoped>
    .app {
        height: 100vh;
        background: url('../../static/img/about.png') no-repeat;
        background-position: top right;
        background-size: 59.375vw 100vh;
    }

    .about {
        width: 32%;
        padding: 0 0 0 3%;
    }

    .about__contacts {
        font-size: .9375vw;
        margin: 0 0 2.083vw 0;
        line-height: 180%;
    }

    .about__social {
        font-size: .9375vw;
        margin: 0 0 3.125vw 0;
        line-height: 180%;
    }

</style>
