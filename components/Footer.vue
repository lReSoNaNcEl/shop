<template>
    <footer class="footer">
        <div class="footer__wrapper">
            <p class="footer__phone">8 (800) 888-88-88</p>
            <div class="footer__barrier"></div>
            <p class="footer__address">г.Липецк ул.Космонавтов д.1</p>
        </div>
        <div class="footer__social">
            <a class="social__link" href="#" target="_blank">
                <img class="social__icon" src="/img/social/vk.svg"/>
            </a>
            <a class="social__link" href="#" target="_blank">
                <img class="social__icon" src="/img/social/instagram.svg"/>
            </a>
            <a class="social__link" href="#" target="_blank">
                <img class="social__icon" src="/img/social/whatsapp.svg"/>
            </a>
        </div>
    </footer>
</template>

<script>
    export default {
        data: () => ({
            links: []
        }),
        created() {
            // this.$store.dispatch('social/saveLinks').then(() => {
            //     this.links = this.$store.getters['social/getLinks']
            //     console.log(this.links)
            // })
        }
    }
</script>

<style scoped>
    .footer {
        position: relative;
        height: 1.875vw;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 1.0416vw;
        padding: 0 0 0 3%;
        z-index: 2;
    }
    .footer__barrier {
        width: 1.875vw;
        height: 1px;
        background-color: #C9C9C9;
        transform: rotate(90deg);
    }
    .footer__wrapper {
        display: flex;
        align-items: center;
    }
    .footer__social {
        display: none;
    }
    .social__icon {
        width: 2vw;
        height: 2vw;
    }
    @media only screen and (max-width: 1024px) {
        .footer {
            position: static;
            font-size: 1.5625vw;
            margin: 13.4375vw 0 2.34375vw 0;
        }
    }
    @media only screen and (max-width: 480px) {
        .footer {font-size: 3.6vw;}
    }
</style>

