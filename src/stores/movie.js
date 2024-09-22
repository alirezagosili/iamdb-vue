import { ref } from "vue";
import { defineStore } from "pinia";

export const useMovieStore = defineStore("movie", () => {
    const movies = ref(new Map());
    const likedMovies = ref(new Set());

    
    const toggleLike = (movieId) => {
        if (likedMovies.value.has(movieId)) {
            likedMovies.value.delete(movieId); 
        } else {
            likedMovies.value.add(movieId);
        }
    };

    
    const isLiked = (movieId) => {
        return likedMovies.value.has(movieId);
    };

    
    const fetchMovieDetails = async (id) => {
        if (movies.value.has(id)) {
            return movies.value.get(id);
        } else {
            try {
                const response = await fetch(
                    `https://moviesapi.codingfront.dev/api/v1/movies/${id}`
                );
                if (response.ok) {
                    const movieData = await response.json();
                    movies.value.set(id, movieData); 
                    return movieData;
                } else {
                    console.error("Failed to fetch movie details");
                }
            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        }
    };

    return {
        movies, 
        likedMovies, 
        toggleLike, 
        isLiked, 
        fetchMovieDetails,
    };
});
