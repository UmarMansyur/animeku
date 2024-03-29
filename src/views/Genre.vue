<template>
  <Parent>
    <div class="row">
      <div class="col-12">
        <div class="alert alert-primary">
          <p class="mb-0 fs-12">
            Berikut adalah daftar genre yang tersedia di website ini. Silahkan klik genre yang ingin Anda lihat.
          </p>
        </div>
      </div>
      <div class="col-4 col-md-2" v-for="(genre, index) in genres" :key="index">
        <RouterLink class="btn btn-light w-100 my-2" :to="`/genre/${genre.slug}`">
          {{ genre.name }}
        </RouterLink>
      </div>
    </div>
  </Parent>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Parent from './Parent.vue';
import { hideLoader, showLoader } from '../helpers/loader';


const genres = ref<any>([]);
const loadGenres = async () => {
  const response = await fetch(import.meta.env.VITE_BASE_URL + '/genres');
  const data = await response.json();
  genres.value = data.data;
};

onMounted(async () => {
  showLoader();
  await loadGenres();
  hideLoader();
});
</script>
