<template>
    <div class="navigation">
        <div class="catalog__wrapper" v-for="link in navigation">
            <nuxt-link class="catalog__navigation" :to="link.id ? `/shop/category/${link.id}` : link.path">{{link.title}}</nuxt-link>
            <div class="navigation__separator">›</div>
        </div>
        <p class="title__current">{{title}}</p>
    </div>
</template>

<script>
export default {
    data: () => ({navigation: null}),
    props: {title: String},
    created() {
        this.id = +this.$route.params.id
        this.$store.dispatch('menu/saveMenuItem', this.id).then(() => {
            this.$store.commit('menu/addNavItem', {title: 'Каталог', path: '/shop/'})
            this.navigation = this.$store.getters['menu/getNavigation']
        })

    }
}
</script>
