<template>
  <Parent>
    <div class="row">
      <div class="col-md-6 mb-3" v-for="(i, index) in result" :key="index">
        <div class="row">
          <div class="col-auto">
            <img :src="i.poster" alt="anime" class="img-fluid" width="90">
          </div>
          <div class="col">
            <RouterLink :to="'/' + i.slug" class="text-decoration-none">
              <h5 class="mb-0">{{ i.title }}</h5>
            </RouterLink>
            <p class="mb-0 fs-12">Genres: {{ i.genres ? i.genres.map((genre: any) => genre.name).join(', ') : '' }}</p>
            <p class="mb-0 fs-12">Rating: {{ i.rating }}</p>
            <p class="mb-0 fs-12">Status: {{ i.status }}</p>
          </div>
        </div>
      </div>
    </div>
  </Parent>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import Parent from './Parent.vue';
import { ref, onMounted } from 'vue';
import { hideLoader, showLoader } from '../helpers/loader';

const route = useRoute();
const result = ref<any>([]);

const loadSearch = async () => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/search/${route.params.query}`);
  const data = await response.json();
  result.value = data.data;
};

onMounted(async () => {
  showLoader();
  await loadSearch();
  hideLoader();
});
</script>

<style scoped>
  .fs-12 {
    font-size: 12px;
  }

  .img-fluid {
    max-width: 100%;
  }

  .mb-3 {
    margin-bottom: 1rem;
  }

  h5 {
    font-size: 19px;
  }
</style>