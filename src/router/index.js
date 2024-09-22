import { createRouter, createWebHistory } from "vue-router";
import { defineAsyncComponent } from "vue";
import HomeView from "../views/HomeView.vue";
const SearchResults = defineAsyncComponent(() =>
    import("@/views/SearchResults.vue")
);
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
