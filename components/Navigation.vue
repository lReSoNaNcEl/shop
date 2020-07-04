<template>
    <div class="navigation">
        <div class="catalog__wrapper" v-for="path in navigation">
            <nuxt-link class="catalog__navigation" :to="`/shop/category/${path.id}`">{{path.title}}</nuxt-link>
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
        this.$store.dispatch('menu/saveMenuItem', this.id).then(() => this.navigation = this.$store.getters['menu/getNavigation'])
    }
}
</script>
