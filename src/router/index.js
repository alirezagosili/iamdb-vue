import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SearchResults from "../views/SearchResults.vue";
import MovieDetails from "../views/MovieDetails.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/search",
            name: "search",
            component: SearchResults,
        },
        {
            path: "/movie/:id",
            name: "movie",
            component: MovieDetails,
        },
    ],
});

export default router;
