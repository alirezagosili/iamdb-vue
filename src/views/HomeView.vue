<template>
  <div class="iamdb-container">
      <h1 class="iamdb-title">IAMDb</h1>
      <MovieSearch />

      <GenreSelector />
  </div>
</template>

<script setup>
import MovieSearch from "@/components/MovieSearch.vue";
import GenreSelector from "@/components/GenreSelector.vue";
</script>

<style>
.iamdb-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #070d23;
  color: white;
  font-family: Arial, sans-serif;
}

.iamdb-title {
  font-family: Inter;
  font-size: 140px;
  font-weight: 900;
  line-height: 169.43px;
  text-align: center;
}
@media screen and (max-width: 768px) {
  .iamdb-title {
      font-family: Inter;
      font-size: 100px;
      font-weight: 900;
      line-height: 121.02px;
      text-align: center;
  }
}
</style>
