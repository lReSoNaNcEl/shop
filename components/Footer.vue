<template>
    <footer class="footer">
        <p class="footer__phone">8 (800) 888-88-88</p>
        <div class="footer__barrier"></div>
        <p class="footer__address">г.Липецк ул.Космонавтов д.1</p>
    </footer>
</template>

<style scoped>
    .footer {
        position: relative;
        height: 1.875vw;
        display: flex;
        align-items: center;
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
</style>
