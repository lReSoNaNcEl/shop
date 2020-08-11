<template>
    <footer class="footer">
        <div class="footer__wrapper">
            <p v-if="links.phone" class="footer__phone">{{links.phone}}</p>
            <div v-if="links.phone" class="footer__barrier"></div>
            <p v-if="links.address" class="footer__address">{{links.address}}</p>
            <div v-if="links.address" class="footer__barrier"></div>
            <p v-if="links.email" class="footer__address">{{links.email}}</p>
        </div>
        <div class="footer__social">
            <a class="social__link" :href="links.vk" target="_blank">
                <img class="social__icon" src="/img/social/vk.svg"/>
            </a>
            <a class="social__link" :href="links.instagram" target="_blank">
                <img class="social__icon" src="/img/social/instagram.svg"/>
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
            this.$store.dispatch('social/saveLinks').then(() => this.links = this.$store.getters['social/getLinks'])
        }
    }
</script>

<style scoped>
    .footer {
        width: 100%;
        height: 6vh;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: absolute;
        z-index: 10;
        font-size: 1.0416vw;
        background-color: white;
        padding: 0 3%;
        margin: 0;
        box-sizing: border-box;
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
    .social__icon {
        width: 1.5vw;
        height: 1.5vw;
        margin: 0 .6vw 0 0;
    }
    @media only screen and (max-width: 1024px) {
        .footer {
            position: static;
            font-size: 1.5625vw;
            margin: 13.4375vw 0 2.34375vw 0;
        }
        .social__icon {
            width: 3vw;
            height: 3vw;
        }
    }
    @media only screen and (max-width: 480px) {
        .footer {font-size: 3.6vw;}
        .footer__barrier {display: none;}
        .footer__wrapper {
            flex-flow: column nowrap;
            align-items: flex-start;
        }
        .social__icon {
            width: 6vw;
            height: 6vw;
        }
    }
</style>

