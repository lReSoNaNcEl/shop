<template>
    <div>
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
            <img class="about__bg" src="/img/about.png"/>
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

    .about__bg {
        position: absolute;
        width: 59.375vw;
        height: 100vh;
        z-index: 1;
        top: 0;
        right: 0;
    }

    @media only screen and (max-width: 1024px) {
        .about {
            width: 40%;
        }

        /*.about__bg {*/
        /*    width: 100%;*/
        /*    height: 73.2421875vw;*/
        /*    clip-path: none;*/
        /*    top: 10.7421875vw;*/
        /*    z-index: 0;*/
        /*    border-radius: 1.46484375vw;*/
        /*}*/
    }
</style>
