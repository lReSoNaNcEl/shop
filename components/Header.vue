<template>
    <header class="header">
        <img class="header__logo" src="img/logo.svg">
        <div class="header__navmenu">
            <nuxt-link class="navmenu__link" to="#">Главная</nuxt-link>
            <nuxt-link class="navmenu__link" to="#">Каталог</nuxt-link>
            <nuxt-link class="navmenu__link" to="#">О компании</nuxt-link>
            <nuxt-link class="navmenu__link" to="#">Поставщики</nuxt-link>
        </div>
    </header>
</template>

<style scoped>
    .header {
        padding: 0 3% 0 3%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .navmenu__link {
        margin: 0 0 0 3.125vw;
        color: white;
        font-size: .9375vw;
        font-weight: 600;
    }
</style>
