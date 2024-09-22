<template>
    <div class="rating-container">
        <div class="circular-chart-container">
            <svg class="circular-chart" viewBox="0 0 36 36">
                <path
                    class="circle-bg"
                    d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                    class="circle"
                    :stroke-dasharray="`${percentFilled}, 100`"
                    d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" class="percentage">
                    {{ imdbRating }}
                </text>
            </svg>
            <div class="imdb-rating">
                {{ imdbVotes }} <br />
                <span class="imdb-label"> ratings on IMDB </span>
            </div>
        </div>
        <div class="other-ratings">
            <div>{{ rottenTomatoesRating }}% on Rotten Tomatoes</div>
            <div>{{ metacriticRating }}/100 on Metacritic</div>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
    movieData: {
        type: Object,
        required: true,
    },
});

const imdbRating = computed(() => parseFloat(props.movieData.imdb_rating));
const percentFilled = computed(() => imdbRating.value * 10);
const imdbVotes = computed(() => props.movieData.imdb_votes.toLocaleString());

const getRatingValue = (source) => {
    const ratings = JSON.parse(props.movieData.ratings);
    const rating = ratings.find((r) => r.Source === source);
    return rating ? rating.Value : "N/A";
};

const rottenTomatoesRating = computed(() => {
    const rating = getRatingValue("Rotten Tomatoes");
    return rating !== "N/A" ? rating.replace("%", "") : "N/A";
});

const metacriticRating = computed(() => {
    const rating = getRatingValue("Metacritic");
    return rating !== "N/A" ? rating.split("/")[0] : "N/A";
});
</script>

<style scoped>
.rating-container {
    display: flex;
    flex-direction: column;
    gap: 30px;
    border-radius: 10px;
}

.circular-chart {
    width: 80px;
    height: 80px;
}
.circular-chart-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
}

.circle-bg {
    fill: none;
    stroke: #4b5563;
    stroke-width: 3.8;
}

.circle {
    fill: none;
    stroke: #8b5cf6;
    stroke-width: 2.8;
    stroke-linecap: round;
    animation: progress 1s ease-out forwards;
}

@keyframes progress {
    0% {
        stroke-dasharray: 0 100;
    }
}

.percentage {
    fill: #fff;
    font-family: sans-serif;
    font-size: 0.6em;
    text-anchor: middle;
    font-family: Inter;
    font-weight: 700;
}

.imdb-rating {
    display: flex;
    flex-direction: column;
    gap: 9px;
    margin-bottom: 10px;
    font-family: Roboto;
    font-size: 16px;
    font-weight: 700;
    line-height: 18.75px;
    text-align: left;
    color: #ffffff;
    opacity: 80%;
}
.imdb-label {
    font-family: Roboto;
    font-size: 14px;
    font-weight: 400;
    line-height: 16.41px;
    text-align: left;
    color: #ffffff;
    opacity: 60%;
    white-space: nowrap;
}
.other-ratings {
    color: #ffffff;
    opacity: 50%;
    font-family: Inter;
    font-size: 13px;
    font-weight: 400;
    line-height: 24px;
    text-align: left;
    white-space: nowrap;
}
@media (max-width: 768px) {
    .rating-container {
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    align-items: center;
    gap: 40px;
}
.imdb-rating{
    display: flex;
    margin-bottom: 0;
}
}
@media (min-width: 360px) and (max-width: 420px){
    .rating-container{
        gap: 30px;
    }
    .imdb-rating{
        font-size: 12px;
    }
    .imdb-label{
        font-size: 12px;
    }
    .other-ratings{
        font-size: 10px;
    }

}
</style>
