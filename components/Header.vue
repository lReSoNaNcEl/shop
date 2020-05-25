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
        </div>
    </header>
</template>

<script>
export default {
    mounted() {
        let links = Array.from(document.getElementsByClassName('navmenu__link'))

        if (location.pathname === '/shop' || location.pathname === '/shop/basket') {
            for (let link of links) link.style.color = 'black'
            this.$refs.header.style.borderBottom = '1px solid #CCCCCC'
        }

    }
}
</script>

<style scoped>
    .header {
        position: relative;
        padding: 1.0416vw 3%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #CCCCCC;
    }

    .header__logo {
        width: 9.89583vw;
        height: 4.16vw;
    }

    .navmenu__navmenu {
        position: relative;
    }

    .navmenu__link {
        position: relative;
        top: 0;
        margin: 0 0 0 3.125vw;
        color: white;
        font-size: .9375vw;
        font-weight: 600;
        text-transform: uppercase;
        z-index: 10;
    }
</style>
