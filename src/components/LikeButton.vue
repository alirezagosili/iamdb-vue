<template>
    <button
        @click="handleClick"
        :class="[
            'favorite-button',
            { 'is-favorited': isLiked, 'search-button': inSearchComponent },
        ]"
    >
        <template v-if="isMobile && !inSearchComponent">
            {{ buttonText }}
        </template>
        <template v-else>
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="like-svg"
            >
                <g clip-path="url(#clip0)">
                    <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        :fill="isLiked ? '#9747FF' : 'transparent'"
                        :stroke="isLiked || hover ? '#9747FF' : '#CCCCCC'"
                        :stroke-width="2"
                    />
                </g>
                <defs>
                    <clipPath id="clip0">
                        <rect width="24" height="24" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </template>
    </button>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useMovieStore } from "@/stores/movie.js";

const props = defineProps({
    movieId: {
        type: String,
        required: true,
    },
    inMovieComponent: {
        type: Boolean,
        default: false,
    },
    inSearchComponent: {
        type: Boolean,
        default: false,
    },
});

const movieStore = useMovieStore();
const isLiked = computed(() => movieStore.isLiked(props.movieId));
const hover = ref(false);

const isMobile = ref(false);

const buttonText = computed(() =>
    isLiked.value ? "Remove from Favorite" : "Add to Favorite"
);

const handleClick = () => {
    movieStore.toggleLike(props.movieId);
};

onMounted(() => {
    const updateIsMobile = () => {
        if (props.inMovieComponent || props.inSearchComponent) {
            isMobile.value = window.innerWidth <= 768;
        }
    };

    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);

    onUnmounted(() => {
        window.removeEventListener("resize", updateIsMobile);
    });
});
</script>

<style scoped>
.favorite-button {
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 25px;
    border: none;
    font-weight: bold;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.favorite-button:not(.is-favorited) {
    background-color: #9747ff;
    color: white;
}

.favorite-button.is-favorited {
    background-color: #1e2a3b;
    color: white;
}

/* Different style for the search component */
.favorite-button.search-button {
    background: none;
    color: white;
}

@media (min-width: 769px) {
    .like-button {
        cursor: pointer;
        display: inline-block;
    }

    .like-svg {
        transition: fill 0.3s ease, stroke 0.3s ease;
    }

    .like-button:hover .like-svg path {
        transition: fill 0.3s ease, stroke 0.3s ease;
    }

    .favorite-button:not(.is-favorited) {
        background-color: transparent;
    }

    .favorite-button.is-favorited {
        background-color: transparent;
    }
}
</style>
