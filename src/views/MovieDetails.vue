<template>
    <div v-if="movie" class="movie-details">
        <div
            class="backdrop"
            :style="{ backgroundImage: `url(${movie.images})` }"
        >
            <div class="gradient-overlay"></div>
            <div class="content-wrapper">
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
                <div class="main-content">
                    <div class="poster-column">
                        <img
                            :src="movie.poster"
                            :alt="movie.title"
                            class="poster"
                        />
                        <CircularRating :movie-data="movie" />
                    </div>
                    <div class="info-column">
                        <div class="movie-header">
                            <h1 class="movie-title">{{ movie.title }}</h1>
                            <LikeButton
                                class="like-button"
                                :movieId="movie.id"
                                :inMovieComponent="true"
                            />
                        </div>
                        <p class="movie-genres">
                            {{ movie.genres.join(", ") }}
                        </p>
                        <p class="movie-description">{{ movie.plot }}</p>
                        <div class="movie-meta">
                            <span class="metadata-item">{{ movie.rated }}</span>
                            <span class="metadata-item">{{ movie.year }}</span>
                            <span class="metadata-item rating">
                                <svg
                                    width="12"
                                    height="13"
                                    viewBox="0 0 12 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M6 12.5C2.6915 12.5 0 9.8085 0 6.5C0 3.1915 2.6915 0.5 6 0.5C9.3085 0.5 12 3.1915 12 6.5C12 9.8085 9.3085 12.5 6 12.5ZM6 1.5C3.243 1.5 1 3.743 1 6.5C1 9.257 3.243 11.5 6 11.5C8.757 11.5 11 9.257 11 6.5C11 3.743 8.757 1.5 6 1.5ZM6.25 6.933L7.982 5.933C8.2215 5.795 8.303 5.489 8.165 5.25C8.0265 5.0105 7.7205 4.928 7.482 5.067L6.5 5.634V3.5C6.5 3.2235 6.276 3 6 3C5.724 3 5.5 3.2235 5.5 3.5V6.5C5.5 6.6785 5.595 6.844 5.75 6.933C5.8275 6.9775 5.9135 7 6 7C6.0865 7 6.1725 6.9775 6.25 6.933Z"
                                        fill="white"
                                    />
                                </svg>
                                {{ movie.runtime }}
                            </span>
                        </div>
                        <div class="poster-column-mobile">
                            <img
                                :src="movie.poster"
                                :alt="movie.title"
                                class="poster"
                            />
                            <CircularRating :movie-data="movie" />
                        </div>
                        <div class="details-section">
                            <h2 class="section-title">Details</h2>
                            <div class="flex-table">
                                <div
                                    v-for="(value, key) in movieDetails"
                                    :key="key"
                                    class="flex-row"
                                >
                                    <div class="flex-cell detail-label">
                                        {{ key }}
                                    </div>
                                    <div class="flex-cell detail-value">
                                        {{ value }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <Loading />
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useMovieStore } from "@/stores/movie";
import Loading from "@/components/Loading.vue";
import CircularRating from "../components/CircularRating.vue";
import LikeButton from "@/components/LikeButton.vue";

const route = useRoute();
const movieStore = useMovieStore();
const movie = ref(null);

const movieDetails = computed(() => {
    if (!movie.value) return {};
    return {
        Directors: movie.value.director,
        Writers: movie.value.writer,
        Actors: movie.value.actors,
        Country: movie.value.country,
        Language: movie.value.language,
        Awards: movie.value.awards,
    };
});

const goBack = () => history.back();

onMounted(async () => {
    const movieId = route.params.id;
    movie.value = await movieStore.fetchMovieDetails(movieId);
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
.movie-details {
    color: #ffffff;
    height: 100vh;
    background-color: #070d23;
    overflow-y: auto;
}

.backdrop {
    height: 50vh;
    background-size: cover;
    background-position: center;
    position: relative;
    z-index: 0;
}

.gradient-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
        180deg,
        rgba(7, 13, 35, 0) 0%,
        rgba(7, 13, 35, 0.7) 28.5%,
        rgba(7, 13, 35, 0.9) 60%,
        #070d23 99%
    );
}

.content-wrapper {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
}

.main-content {
    display: flex;
    gap: 70px;
    padding-top: 200px;
    padding-bottom: 50px;
}

.poster {
    width: 208px;
    border-radius: 18px;
    margin-bottom: 30px;
}

.movie-title {
    font-family: Inter;
    font-size: 48px;
    font-weight: 700;
    line-height: 58.09px;
    text-align: left;
}

.movie-genres {
    font-family: Inter;
    font-size: 12px;
    font-weight: 300;
    line-height: 14.52px;
    text-align: left;
    opacity: 40%;
    margin-bottom: 18px;
}
.poster-column {
    flex-shrink: 0;
}
.info-column {
    flex-grow: 1;
}
.movie-meta {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
}

.metadata-item {
    background-color: #222c4f;
    padding: 6px 12px;
    border-radius: 8px;
    font-family: Inter;
    font-size: 12px;
    font-weight: 400;
    line-height: 14.52px;
    text-align: left;
}
.rating {
    display: flex;
    align-items: center;
    gap: 6px;
}

.movie-description {
    font-family: Inter;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    text-align: justify;
    color: #ffffff99;
    margin-bottom: 18px;
}

.section-title {
    font-family: Inter;
    font-size: 28px;
    font-weight: 700;
    line-height: 50px;
    text-align: left;
    margin-bottom: 10px;
    color: #ffffff;
}

.flex-table {
    display: flex;
    flex-direction: column;
}

.flex-row {
    display: flex;
    border-bottom: 1px solid #222c4f;
    padding: 10px 0;
}
.flex-row:last-child {
    border-bottom: none;
}

.flex-cell {
    padding: 5px 0;
}

.detail-label {
    flex: 0 0 30%;
    color: #ffffff;
    opacity: 80%;
    font-family: Inter;
    font-size: 16px;
    font-weight: 700;
    line-height: 19.36px;
    text-align: left;
}

.detail-value {
    flex: 1;
    font-family: Inter;
    font-size: 14px;
    font-weight: 400;
    line-height: 16.94px;
    text-align: left;
    color: #ffffff99;
}
.movie-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.back-button {
    background: #222c4f;
    border: none;
    cursor: pointer;
    padding: 10px 10px 10px 9px;
    border-radius: 13px;
    position: absolute;
    top: 50px;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
}
@media (min-width: 768px) {
    .poster-column-mobile {
        display: none;
    }
}

@media (max-width: 768px) {
    .main-content {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-areas:
            "title"
            "genres"
            "description"
            "meta"
            "poster"
            "rating"
            "details";
        gap: 20px;
        padding-top: 170px;
        padding-inline: 20px;
    }
    .poster-column {
        display: none;
    }
    .movie-title {
        grid-area: title;
        font-size: 48px;
        text-align: left;
        margin-bottom: 10px;
    }

    .movie-genres {
        grid-area: genres;
        font-size: 12px;
        margin-bottom: 10px;
        opacity: 40%;
    }

    .movie-description {
        grid-area: description;
        font-family: Inter;
        font-size: 14px;
        font-weight: 400;
        line-height: 24px;
        text-align: justify;
        color: #FFFFFF99;
    }

    .movie-meta {
        grid-area: meta;
        display: flex;
        gap: 8px;
        margin-bottom: 18px;
    }
    .poster-column-mobile{
        display: flex;
        gap: 20px;
        flex-direction: column-reverse;
    }

    .poster {
        width: 100%;
        max-width: 406px;
        height: auto;
    }

    .details {
        grid-area: details;
    }

    .like-button {
        position: fixed;
        bottom: 12px;
        left: 12px;
        right: 12px;
        width: calc(100% - 24px);
        height: 41px;
        background: #724cf9;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        border-radius: 12px;
        color: #ffffff;
        font-family: Inter;
        font-size: 14px;
        font-weight: 400;
        line-height: 16.94px;
        text-align: left;
    }
    .back-button {
        top: 32px;
        left: 12px;
    }
    
}
@media (min-width: 360px) and (max-width: 420px) {
    .movie-title {
        font-size: 32px;
        line-height: 38px;
    }

    .movie-genres {
        font-size: 11px;
        line-height: 13px;
    }

    .movie-description {
        font-size: 10px;
        line-height: 22px;
        width: 330px;
    }

    .movie-meta {
        flex-wrap: wrap;
    }

    .metadata-item {
        font-size: 11px;
        padding: 4px 8px;
    }

    .section-title {
        font-size: 24px;
        line-height: 40px;
    }

    .detail-label {
        font-size: 14px;
        line-height: 17px;
    }

    .detail-value {
        font-size: 13px;
        line-height: 16px;
    }

    .poster {
        max-width: 100%;
    }

    .main-content {
        padding-top: 140px;
        padding-inline: 16px;
        gap: 16px;
    }

    .back-button {
        top: 24px;
        left: 16px;
    }

    .like-button {
        bottom: 16px;
        left: 16px;
        right: 16px;
        width: calc(100% - 32px);
        height: 40px;
        font-size: 13px;
    }
}
</style>
