<template>
    <div class="skeleton-loader">
        <div v-for="i in count" :key="i" class="skeleton-item">
            <div class="skeleton-poster"></div>
            <div class="skeleton-info">
                <div class="skeleton-title"></div>
                <div class="skeleton-genres"></div>
                <div class="skeleton-details"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
    count: {
        type: Number,
        default: 5,
    },
});
</script>

<style scoped>
.skeleton-loader {
    width: 100%;
}

.skeleton-item {
    display: flex;
    margin-bottom: 20px;
    height: 157px;
    border-bottom: 1px solid #222c4f;
    padding-bottom: 10px;
}

.skeleton-poster {
    width: 137px;
    height: 137px;
    background-color: #222c4f;
    border-radius: 10px;
    margin-right: 20px;
}

.skeleton-info {
    flex-grow: 1;
}

.skeleton-title {
    height: 30px;
    width: 70%;
    background-color: #222c4f;
    margin-bottom: 10px;
}

.skeleton-genres {
    height: 15px;
    width: 50%;
    background-color: #222c4f;
    margin-bottom: 10px;
}

.skeleton-details {
    height: 20px;
    width: 60%;
    background-color: #222c4f;
}

@keyframes pulse {
    0% {
        opacity: 0.6;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0.6;
    }
}

.skeleton-poster,
.skeleton-title,
.skeleton-genres,
.skeleton-details {
    animation: pulse 1.5s infinite ease-in-out;
}
</style>
