<template>
    <footer class="footer">
        <p class="footer__phone">8 (800) 888-88-88</p>
        <div class="footer__barrier"></div>
        <p class="footer__address">г.Липецк ул.Космонавтов д.1</p>
    </footer>
</template>

<style scoped>
    .footer {
        height: 36px;
        display: flex;
        align-items: center;
        padding: 0 0 0 3%;
    }

    .footer__barrier {
        width: 36px;
        height: 1px;
        background-color: #C9C9C9;
        transform: rotate(90deg);
    }
</style>
