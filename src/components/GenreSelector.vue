<template>
    <div class="genres-container">
        <button
            v-for="(genre, index) in displayedGenres"
            :key="index"
            class="genre-button"
            @click="searchByGenre(genre.id)"
        >
            {{ genre.name }}
        </button>
        <button v-if="!showAll" @click="showAllGenres" class="genre-button">
            Show More &gt;
        </button>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const genres = ref([]);
const showAll = ref(false);
const router = useRouter();

const fetchGenres = async () => {
    const response = await fetch(
        "https://moviesapi.codingfront.dev/api/v1/genres"
    );
    const data = await response.json();
    genres.value = data;
};

onMounted(fetchGenres);

const displayedGenres = computed(() => {
    return showAll.value ? genres.value : genres.value.slice(0, 4);
});

const showAllGenres = () => {
    showAll.value = true;
};

const searchByGenre = (genreId) => {
    router.push({ name: "search", query: { genre: genreId } });
};
</script>

<style scoped>
.genres-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 920px;
    gap: 10px;
    background-color: #070d23;
    padding: 0px 100px;
    border-radius: 5px;
}

.genre-button {
    background-color: #1e2a47;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 6px 12px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-family: Inter;
    font-size: 12px;
    font-weight: 400;
    line-height: 14.52px;
    text-align: left;
}

.genre-button:hover {
    background-color: #2b3a5b;
}
@media (max-width: 768px) {
    .genres-container {
        padding: 0px 20px;
        width: 100%;
    }
}
</style>
