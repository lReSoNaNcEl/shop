<template>
    <Category :id="+$route.params.id - 1"/>
</template>

<script>
    import Category from '@/components/Category'
    export default {
        components: {Category}
    }
</script>
