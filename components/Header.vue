<template>
    <header class="header" ref="header">
        <nuxt-link to="/">
            <img class="header__logo" src="/img/logo.svg">
        </nuxt-link>
        <div class="header__navmenu">
            <nuxt-link class="navmenu__link" to="/">Главная</nuxt-link>
            <nuxt-link class="navmenu__link" to="/shop">Каталог</nuxt-link>
            <nuxt-link class="navmenu__link" to="/about">О компании</nuxt-link>
            <nuxt-link class="navmenu__link" to="/providers">Поставщики</nuxt-link>
            <nuxt-link to="/shop/basket">
                <img class="basket__img" src="/img/basket.svg"/>
            </nuxt-link>
        </div>
        <div class="header__toggle" @click="showNavMenu">
            <div class="toggle__item"></div>
            <div class="toggle__item"></div>
            <div class="toggle__item"></div>
        </div>

        <div class="header__mblmenu" v-show="renderMenu">
            <div class="navmenu__overlay" @click="showNavMenu"></div>

            <nav class="navmenu__links">
                <nuxt-link to="/" class="links__item">Главная</nuxt-link>
                <nuxt-link to="/shop" class="links__item">Каталог</nuxt-link>
                <nuxt-link to="/about" class="links__item">О компании</nuxt-link>
                <nuxt-link to="/providers" class="links__item">Поставщики</nuxt-link>
            </nav>

            <nuxt-link to="/shop/basket">
                <img class="basket__img" src="/img/basket.svg"/>
            </nuxt-link>

        </div>
    </header>
</template>

<script>
export default {
    watch: {
        '$route.path': function () {
            setTimeout(() => this.renderMenu = false, 100)
        }
    },
    data: () => ({
        renderMenu: false
    }),
    mounted() {
        let links = Array.from(document.getElementsByClassName('navmenu__link'))

            // || /\/shop\/product\/\d+/.test(location.pathname)
        // if (location.pathname === '/shop' || location.pathname === '/shop/basket' || /\/shop\/category/.test(location.pathname)) {
        //     for (let link of links) link.style.color = 'black'
        //     this.$refs.header.style.borderBottom = '1px solid #CCCCCC'
        // }
    },
    methods: {
        showNavMenu() {this.renderMenu = !this.renderMenu}
    }
}
</script>

<style scoped>
    .header {
        height: 10vh;
        position: relative;
        padding: 0 3%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #CCCCCC;
        background-color: white;
        z-index: 9999;
    }

    .header__logo {
        width: 8vw;
        height: 4.16vw;
    }

    .header__navmenu {
        display: flex;
        align-items: center;
    }

    .navmenu__link {
        position: relative;
        top: 0;
        margin: 0 0 0 3.125vw;
        color: black;
        font-size: .9375vw;
        font-weight: 600;
        text-transform: uppercase;
        z-index: 10;
    }

    .header__mblmenu {
        display: none;
    }

    .header__toggle {
        display: none;
    }

    @media only screen and (max-width: 1024px) {
        .header {
            border: none;
            padding: 2.1484375vw 3%;
        }

        .header__logo {
            width: 14.648vw;
            height: 6.3476vw;
        }

        .navmenu__link {
            font-size: 1.3671875vw;
            color: black;
        }
    }

    @media only screen and (max-width: 480px) {
        .header {
            padding: 6vw 3%;
        }

        .header__logo {
            width: 30vw;
            height: initial;
        }

        .header__navmenu {
            display: none;
        }

        .header__mblmenu {
            width: 80%;
            height: 100vh;
            display: flex;
            justify-content: space-between;
            position: fixed;
            z-index: 5;
            top: 0;
            left: 0;
            background-color: white;
            padding: 5vw;
        }

        .navmenu__overlay {
            position: absolute;
            top: 0;
            right: calc((100vw - 100%) * -1);
            z-index: 1;
            width: calc(100vw - 100%);
            height: 100vh;
            background-color: black;
            opacity: .6;
            cursor: pointer;
        }

        .navmenu__links {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
        }

        .links__item {
            text-decoration: none;
            color: #08284D;
            font-size: 5.6vw;
            margin: 0 0 7vw 0;
        }

        .header__toggle {
            position: relative;
            z-index: 5;
            height: 6vw;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            cursor: pointer;
        }

        .toggle__item {
            width: 8vw;
            height: .8203125vw;
            background-color: black;
        }
    }
</style>
