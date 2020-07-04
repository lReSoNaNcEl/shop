<template>
    <div>
        <Preloader/>
        <Header/>
        <section class="about wrapper">
            <div class="about__wrapper">
                <h1 class="about__title title">О компании</h1>
                <p v-html="about.text" class="about__desc paragraph"></p>
            </div>
<!--            <div class="about__contacts">-->
<!--                Адрес: г.Липецк ул.Космонавтов д.1<br>-->
<!--                Телефон: 8 (800) 888-88-88<br>-->
<!--                Email: steel-house@example.ru-->
<!--            </div>-->
<!--            <div class="about__social">-->
<!--                Вконтакте: vk.com/steel-house<br>-->
<!--                Whats Up: 8 (800) 888-88-88<br>-->
<!--                FaceBook: facebook.com/steel-house<br>-->
<!--                Instagram: @steel-house-->
<!--            </div>-->
            <img class="photo" src="/img/about.png"/>
            <Footer/>
        </section>
    </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Preloader from '@/components/Preloader'
export default {
    data: () => ({
        about: {}
    }),
    created() {
        this.$store.dispatch('about/saveAbout').then(() => {
            this.about = this.$store.getters['about/getAbout']
        })
    },
    components: {Preloader, Header, Footer}
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

    @media only screen and (max-width: 1024px) {
        .about {width: 60%;}

        .about__wrapper {
            color: white;
            position: relative;
            z-index: 2;
        }
    }

    @media only screen and (max-width: 480px) {
        .about {width: 90%;}
    }
</style>
