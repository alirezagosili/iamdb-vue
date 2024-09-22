<template>
    <form @submit.prevent="onSearch" class="search-form">
        <div class="search-input-container">
            <input
                v-model="movieName"
                type="text"
                placeholder="Search IAMDb"
                class="search-input"
            />
            <button type="submit" class="search-icon btn">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clip-path="url(#clip0_1_658)">
                        <path
                            d="M23.707 22.293L17.738 16.324C19.3647 14.3346 20.1644 11.7961 19.9719 9.23356C19.7793 6.67103 18.6092 4.28053 16.7036 2.55652C14.798 0.83251 12.3026 -0.0931079 9.73367 -0.0288761C7.16472 0.0353558 4.71873 1.08452 2.90164 2.90161C1.08455 4.7187 0.035382 7.16469 -0.0288498 9.73364C-0.0930816 12.3026 0.832537 14.798 2.55655 16.7036C4.28056 18.6092 6.67106 19.7793 9.23359 19.9718C11.7961 20.1644 14.3346 19.3646 16.324 17.738L22.293 23.707C22.4816 23.8892 22.7342 23.99 22.9964 23.9877C23.2586 23.9854 23.5094 23.8802 23.6948 23.6948C23.8803 23.5094 23.9854 23.2586 23.9877 22.9964C23.99 22.7342 23.8892 22.4816 23.707 22.293ZM10 18C8.41778 18 6.87106 17.5308 5.55546 16.6518C4.23987 15.7727 3.21449 14.5233 2.60899 13.0615C2.00349 11.5997 1.84506 9.99113 2.15374 8.43928C2.46243 6.88743 3.22435 5.46197 4.34317 4.34315C5.46199 3.22433 6.88746 2.4624 8.4393 2.15372C9.99115 1.84504 11.5997 2.00346 13.0615 2.60896C14.5233 3.21446 15.7727 4.23984 16.6518 5.55544C17.5308 6.87103 18 8.41775 18 10C17.9976 12.121 17.154 14.1544 15.6543 15.6542C14.1545 17.154 12.121 17.9976 10 18Z"
                            fill="white"
                            fill-opacity="0.8"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_1_658">
                            <rect width="24" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </button>
            <button @click.prevent="toggleListening" type="button" class="mic-icon btn" :class="{ 'listening': isListening }">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g opacity="0.8">
                        <g clip-path="url(#clip0_1_662)">
                            <path
                                d="M12 20C14.121 19.9976 16.1544 19.154 17.6542 17.6542C19.154 16.1544 19.9976 14.121 20 12V7.99999C20 5.87826 19.1571 3.84343 17.6569 2.34314C16.1566 0.842847 14.1217 -7.62939e-06 12 -7.62939e-06C9.87827 -7.62939e-06 7.84344 0.842847 6.34315 2.34314C4.84285 3.84343 4 5.87826 4 7.99999V12C4.00238 14.121 4.846 16.1544 6.34578 17.6542C7.84555 19.154 9.879 19.9976 12 20ZM12 1.99999C13.4166 2.00262 14.7866 2.50586 15.868 3.42079C16.9495 4.33572 17.6727 5.60345 17.91 6.99999H15C14.7348 6.99999 14.4804 7.10535 14.2929 7.29289C14.1054 7.48042 14 7.73478 14 7.99999C14 8.26521 14.1054 8.51956 14.2929 8.7071C14.4804 8.89464 14.7348 8.99999 15 8.99999H18V11H15C14.7348 11 14.4804 11.1053 14.2929 11.2929C14.1054 11.4804 14 11.7348 14 12C14 12.2652 14.1054 12.5196 14.2929 12.7071C14.4804 12.8946 14.7348 13 15 13H17.91C17.675 14.3975 16.9523 15.6665 15.8704 16.5817C14.7884 17.4969 13.4171 17.999 12 17.999C10.5829 17.999 9.21161 17.4969 8.12965 16.5817C7.04768 15.6665 6.32503 14.3975 6.09 13H9C9.26522 13 9.51957 12.8946 9.70711 12.7071C9.89464 12.5196 10 12.2652 10 12C10 11.7348 9.89464 11.4804 9.70711 11.2929C9.51957 11.1053 9.26522 11 9 11H6V8.99999H9C9.26522 8.99999 9.51957 8.89464 9.70711 8.7071C9.89464 8.51956 10 8.26521 10 7.99999C10 7.73478 9.89464 7.48042 9.70711 7.29289C9.51957 7.10535 9.26522 6.99999 9 6.99999H6.09C6.32727 5.60345 7.05052 4.33572 8.13197 3.42079C9.21342 2.50586 10.5834 2.00262 12 1.99999Z"
                                fill="white"
                            />
                            <path
                                d="M23 12C22.7348 12 22.4804 12.1054 22.2929 12.2929C22.1054 12.4804 22 12.7348 22 13C21.9974 15.3861 21.0483 17.6738 19.361 19.361C17.6738 21.0483 15.3861 21.9974 13 22H11C8.61395 21.9971 6.32645 21.0479 4.63925 19.3607C2.95206 17.6735 2.00291 15.3861 2 13C2 12.7348 1.89464 12.4804 1.70711 12.2929C1.51957 12.1054 1.26522 12 1 12C0.734784 12 0.48043 12.1054 0.292893 12.2929C0.105357 12.4804 0 12.7348 0 13C0.00344047 15.9163 1.16347 18.7122 3.22563 20.7744C5.28778 22.8365 8.08367 23.9966 11 24H13C15.9163 23.9966 18.7122 22.8365 20.7744 20.7744C22.8365 18.7122 23.9966 15.9163 24 13C24 12.7348 23.8946 12.4804 23.7071 12.2929C23.5196 12.1054 23.2652 12 23 12Z"
                                fill="white"
                            />
                        </g>
                    </g>
                    <defs>
                        <clipPath id="clip0_1_662">
                            <rect width="24" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </button>
        </div>
    </form>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useSpeechRecognition } from '@vueuse/core';

const router = useRouter();
const movieName = ref('');

const { isListening, result, toggle } = useSpeechRecognition({
    continuous: true,
    lang: 'en-US',
    onResult: (event) => {
    console.log('Speech recognition result:', event);
    movieName.value = event;
  },
  
  onError: (error) => {
    console.error('Speech recognition error:', error);
  },
});

watch(result, (newResult) => {
  console.log('Result changed:', newResult);
  movieName.value = newResult;
});

const toggleListening = () => {
  console.log('Toggling listening state');
  toggle(); // Toggles the listening state
  console.log('Is listening:', isListening.value);
};
const onSearch = () => {
  if (movieName.value) {
    router.push({ 
      name: 'search', 
      query: { q: movieName.value }
    });
  }
};
</script>

<style scoped>
.btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
}


.search-form {
    width: 100%;
    max-width: 920px;
    margin-bottom: 2rem;
}

.search-input-container {
    position: relative;
    width: 100%;
}
.search-input-container::after {
    content: "";
    position: absolute;
    right: 55px; 
    top: 50%;
    transform: translateY(-50%);
    height: 24px; 
    width: 2px; 
    background-color: #070d23; 
}
.search-input {
    width: 100%;
    padding: 12px 55px; 
    border-radius: 16px;
    background-color: #222c4f;
    border: none;
    height: 48px;
    color: white;
    font-size: 16px;
}

.search-icon {
    position: absolute;
    left: 16px; 
    top: 50%;
    transform: translateY(-50%);
}

.mic-icon {
    position: absolute;
    right: 16px; 
    top: 50%;
    transform: translateY(-50%);
}

.genre-tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    max-width: 80%;
}

.genre-button {
    background-color: #1f2937;
    color: #9ca3af;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.genre-button:hover {
    background-color: #374151;
}
.genre-container {
    width: 100%;
    max-width: 920px;
    margin-top: 1rem;
}

.genre-tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
}

.genre-button {
    background-color: #222c4f;
    color: #ffffff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 16px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.genre-button:hover,
.genre-button.selected {
    background-color: #374151;
}

.load-more-button {
    margin-top: 1rem;
    background-color: #222c4f;
    color: #ffffff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 16px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.load-more-button:hover {
    background-color: #374151;
}
@media screen and (max-width: 768px) {
    .search-form{
        padding-inline: 0.5rem;
    }
}
</style>
