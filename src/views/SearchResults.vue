<template>
    <div class="container">
        <div class="content">
            <div class="header">
                <button @click="goBack" class="back-button">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clip-path="url(#clip0_1_603)">
                            <path
                                d="M14.3083 20C14.1986 20.0006 14.0899 19.9796 13.9884 19.9381C13.8869 19.8967 13.7945 19.8356 13.7167 19.7583L6.90832 12.95C6.52029 12.5629 6.21244 12.1031 6.00238 11.5969C5.79233 11.0907 5.6842 10.5481 5.6842 9.99999C5.6842 9.45193 5.79233 8.90925 6.00238 8.40304C6.21244 7.89683 6.52029 7.43704 6.90832 7.04999L13.7167 0.241658C13.7944 0.16396 13.8866 0.102326 13.9881 0.0602753C14.0896 0.018225 14.1984 -0.00341797 14.3083 -0.00341797C14.4182 -0.00341797 14.527 0.018225 14.6285 0.0602753C14.73 0.102326 14.8223 0.16396 14.9 0.241658C14.9777 0.319357 15.0393 0.411599 15.0814 0.513117C15.1234 0.614636 15.1451 0.723442 15.1451 0.833325C15.1451 0.943208 15.1234 1.05201 15.0814 1.15353C15.0393 1.25505 14.9777 1.34729 14.9 1.42499L8.09165 8.23333C7.62348 8.70208 7.36052 9.33749 7.36052 9.99999C7.36052 10.6625 7.62348 11.2979 8.09165 11.7667L14.9 18.575C14.9781 18.6525 15.0401 18.7446 15.0824 18.8462C15.1247 18.9477 15.1465 19.0566 15.1465 19.1667C15.1465 19.2767 15.1247 19.3856 15.0824 19.4871C15.0401 19.5887 14.9781 19.6809 14.9 19.7583C14.8221 19.8356 14.7298 19.8967 14.6282 19.9381C14.5267 19.9796 14.418 20.0006 14.3083 20Z"
                                fill="white"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_1_603">
                                <rect width="20" height="20" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
                <div class="header-text">
                    <h1>Result</h1>
                    <p class="search-query" v-if="displayText">
                        {{ displayText }}
                    </p>
                </div>
            </div>
            <MovieSearch @search="handleSearch" />
            <ul v-if="searchResult.length" class="movie-list">
                <li
                    v-for="result in searchResult"
                    :key="result.id"
                    class="movie-item"
                >
                    <router-link
                        :to="{ name: 'movie', params: { id: result.id } }"
                        class="movie-card"
                    >
                        <div class="movie-card">
                            <div>
                                <img
                                    :src="result.poster"
                                    :alt="result.title"
                                    class="movie-poster"
                                />
                            </div>
                            <div class="movie-info">
                                <h2>{{ result.title }}</h2>
                                <p class="movie-genres">
                                    {{ result.genres.join(", ") }}
                                </p>
                                <p class="movie-details">
                                <span class="detail-item">{{ result.year }}</span>
                                <span class="detail-item">{{ result.country }}</span>
                                <span class="movie-rating">
                                    ⭐ {{ result.imdb_rating }}
                                </span>
                            </p>
                            </div>
                        </div>
                    </router-link>
                    <LikeButton
                        class="like-button"
                        :movieId="result.id"
                        :inSearchComponent="true"
                    />
                </li>
            </ul>
            <SkeletonLoader v-if="isLoadingMore" :count="5" />
            <div
                v-if="!isLoadingMore && searchResult.length === 0"
                class="no-results"
            ></div>
            <div ref="loadMoreTrigger" class="load-more-trigger"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import LikeButton from "@/components/LikeButton.vue";
import MovieSearch from "@/components/MovieSearch.vue";
import SkeletonLoader from "@/components/SkeletonLoader.vue";

const route = useRoute();
const router = useRouter();

const searchQuery = ref("");
const allResults = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const resultsPerPage = 10;
const loadMoreTrigger = ref(null);
const isSearching = ref(false);
const genreName = ref("");
const genreCache = ref(new Map());
const isLoadingMore = ref(false);

const searchResult = computed(() => allResults.value);
const displayText = computed(() => {
    if (searchQuery.value) {
        return `for "${searchQuery.value}"`;
    } else if (genreName.value) {
        return `in genre: ${genreName.value}`;
    }
    return "";
});
const handleSearch = (query) => {
    router.push({ name: "search", query: { q: query } });
};
const fetchMovies = async (query, page, genreId = null) => {
    const url = genreId
        ? `https://moviesapi.codingfront.dev/api/v1/genres/${genreId}/movies?page=${page}&perPage=${resultsPerPage}`
        : `https://moviesapi.codingfront.dev/api/v1/movies?q=${query}&page=${page}&perPage=${resultsPerPage}`;

    try {
        const response = await fetch(url);
        const result = await response.json();

        totalPages.value = result.metadata?.page_count || 1;
        return result.data || [];
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
};
const fetchGenreName = async (genreId) => {
    const cached = genreCache.value.get(genreId);
    if (cached !== undefined) {
        return cached;
    }

    try {
        const response = await fetch(
            `https://moviesapi.codingfront.dev/api/v1/genres/${genreId}?fields=name`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { name } = await response.json();
        genreCache.value.set(genreId, name);
        return name;
    } catch (error) {
        console.error("Error fetching genre name:", error);
        return null;
    }
};

const fetchAllGenres = async () => {
    try {
        const response = await fetch(
            "https://moviesapi.codingfront.dev/api/v1/genres"
        );
        const result = await response.json();
        if (result && Array.isArray(result)) {
            genreCache.value = new Map(
                result.map((genre) => [genre.id.toString(), genre.name])
            );
        } else {
            throw new Error(
                "Genres data not found in response or not in expected format"
            );
        }
    } catch (error) {
        console.error("Error fetching all genres:", error);
    }
};
const searchMovies = async (query, genreId = null, reset = true) => {
    if (isSearching.value) {
        return;
    }

    isSearching.value = true;
    isLoadingMore.value = true;

    if (reset) {
        allResults.value = [];
        currentPage.value = 1;
        totalPages.value = 1;
        genreName.value = "";
    }

    if (genreId) {
        const fetchedGenreName = await fetchGenreName(genreId);
        if (fetchedGenreName) {
            genreName.value = fetchedGenreName;
        } else {
            genreName.value = `Genre ${genreId}`;
        }
    } else {
        genreName.value = "";
    }

    try {
        let results = await fetchMovies(query, currentPage.value, genreId);
        if (results.length > 0) {
            allResults.value = [...allResults.value, ...results];
        } else {
            console.log("No results found");
        }
    } catch (error) {
        console.error("Error during search:", error);
    } finally {
        isSearching.value = false;
        isLoadingMore.value = false;
    }
};

const loadMore = async () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        await searchMovies(searchQuery.value, route.query.genre, false);
    } else {
        console.log("No more pages to load.");
    }
};
watch(
    () => route.query,
    async (newQuery, oldQuery) => {
        const query = newQuery.q || "";
        const genreId = newQuery.genre || null;

        if (query !== oldQuery.q || genreId !== oldQuery.genre) {
            searchQuery.value = query;
            if (query || genreId) {
                await searchMovies(query, genreId, true);
            } else {
                allResults.value = [];
                genreName.value = "";
            }
        }
    }
);

onMounted(async () => {
    await fetchAllGenres();
    const query = route.query.q || "";
    const genreId = route.query.genre || null;
    searchQuery.value = query;
    if (query || genreId) {
        await searchMovies(query, genreId, true);
    }

    // Set up Intersection Observer for infinite scrolling
    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                loadMore();
            }
        },
        { threshold: 1.0 }
    );

    if (loadMoreTrigger.value) {
        observer.observe(loadMoreTrigger.value);
    }
});

const goBack = () => history.back();
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
a {
    color: #fff;
    text-decoration: none;
}

.container {
    background-color: #070d23;
    color: #fff;
    min-height: 100vh;
    padding: 20px;
    font-family: Inter, sans-serif;
}
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 920px;
    margin: 0 auto;
    position: relative;
}
.header {
    display: flex;
    align-items: center;
    margin-bottom: 32px;
}
.header-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.search-query {
    font-family: Inter;
    font-size: 12px;
    font-weight: 300;
    line-height: 14.52px;
    text-align: center;
    opacity: 40%;
}
.back-button {
    background: #222c4f;
    border: none;
    cursor: pointer;
    padding: 10px 10px 10px 9px;
    border-radius: 13px;
    position: absolute;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
}

h1 {
    margin: 0 0 0 10px;
    font-family: Inter;
    font-size: 18px;
    font-weight: 700;
    line-height: 21.78px;
    text-align: center;
}
.movie-card {
    display: flex;
}
.search-input {
    flex-grow: 1;
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    padding: 0 10px;
}

.movie-list {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
}

.movie-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    position: relative;
    height: 157px;
    border-bottom: 1px solid #222c4f;
    padding-bottom: 10px;
}

.movie-poster {
    width: 137px;
    height: 137px;
    object-fit: cover;
    border-radius: 10px;
    margin-right: 20px;
}

.movie-info {
    flex-grow: 1;
}

.movie-info h2 {
    font-family: Inter;
    font-size: 28px;
    font-weight: 700;
    line-height: 33.89px;
    text-align: left;
}
.movie-genres {
    font-family: Inter;
    font-size: 12px;
    font-weight: 300;
    line-height: 14.52px;
    text-align: left;
    color: white;
    opacity: 40%;
    margin-bottom: 10px;
}

.movie-details {
    font-family: Inter;
    font-size: 18px;
    font-weight: 400;
    line-height: 21.78px;
    text-align: left;
    padding: 6px 0;
    opacity: 80%;
    display: flex;
    align-items: center;
}
.detail-item {
    position: relative;
    padding-right: 12px;
    margin-right: 10px;
}
.detail-item::after {
    content: '•';
    position: absolute;
    right: -5px;
    color: #222C4F; 
}
.detail-item:last-of-type::after {
    content: none;
}

.movie-rating {
    font-family: Inter;
    font-size: 18px;
    font-weight: 400;
    line-height: 21.78px;
    text-align: left;
    opacity: 80%;
}
.like-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
}

.load-more-trigger {
    height: 20px;
}
.no-results {
    text-align: center;
    font-size: 18px;
    margin-top: 20px;
}

.search-query {
    margin-left: 10px;
    font-size: 14px;
    color: #9aa0b9;
}
@media screen and (max-width: 768px) {
    .movie-item {
        min-height: auto;
        height: auto;
    }
    .movie-poster {
        width: 122px;
        height: auto;
    }
    .movie-info h2 {
        font-size: 20px;
        font-weight: 700;
        line-height: 29.05px;
        text-align: left;
        width: 140px;
    }
    .movie-details {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 220px;
        margin-top: 20px;
        align-items: baseline;
    }
    .detail-item::after{
        content: none;
    }
}
</style>
