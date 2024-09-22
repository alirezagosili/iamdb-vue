<template>
    <div class="loading-container">
      <div class="film-reel">
        <div class="reel-circle outer"></div>
        <div class="reel-circle inner"></div>
        <div class="film-strip"></div>
        <div class="film-strip"></div>
        <div class="film-strip"></div>
        <div class="film-strip"></div>
      </div>
      <p class="loading-text">Loading movie details...</p>
    </div>
  </template>
  
  <script setup>
  // No script needed for this component
  </script>
  
  <style scoped>
  .loading-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #070D23;
  }
  
  .film-reel {
    position: relative;
    width: 100px;
    height: 100px;
    animation: spin 2s linear infinite;
  }
  
  .reel-circle {
    position: absolute;
    border: 6px solid #e2e8f0;
    border-radius: 50%;
  }
  
  .outer {
    width: 100%;
    height: 100%;
  }
  
  .inner {
    width: 40%;
    height: 40%;
    top: 30%;
    left: 30%;
  }
  
  .film-strip {
    position: absolute;
    width: 120%;
    height: 10px;
    background-color: #e2e8f0;
    top: 45%;
    left: -10%;
    transform-origin: center;
  }
  
  .film-strip:nth-child(3) { transform: rotate(45deg); }
  .film-strip:nth-child(4) { transform: rotate(90deg); }
  .film-strip:nth-child(5) { transform: rotate(135deg); }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .loading-text {
    margin-top: 20px;
    color: #e2e8f0;
    font-size: 1.2rem;
  }
  </style>