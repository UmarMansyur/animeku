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
      <div class="col-12 col-md-4" v-for="(genre, index) in genres" :key="index">
        <div class="card">
          <div class="card-body">
            <div class="row mt-0">
              <div class="col-12 bg-light py-1 fs-13">
                <RouterLink :to="`/${genre.slug}`" class="text-decoration-none text-dark">
                  {{ genre.title }}
                </RouterLink>
              </div>
              <div class="col-4 border fs-12">
                {{ genre.studio }}
              </div>
              <div class="col-4 border fs-12">
                {{ genre.rating == 0 ? 'N/A' : genre.rating }}
              </div>
              <div class="col-4 border fs-12">
                {{ genre.episode_count }} Episode
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-md-5 col-12 text-center text-md-start">
                <img :src="genre.poster" class="img-fluid" alt="Anime Image" />
              </div>
              <div class="col-md-7">
                <p class="card-text fs-12" style="height: 180px; overflow-y: auto; text-align: justify;">
                  {{ genre.synopsis == '' ? 'Tidak ada sinopsis' : genre.synopsis }}
                </p>
              </div>
            </div>
            <RouterLink class="btn btn-primary w-100 my-1" :to="`/${genre.slug}`">
              Lihat Anime
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-center d-flex">
        <nav class="mx-auto" aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <button class="page-link" aria-label="Previous" type="button" @click="prevPage(pagination.previous_page)"
                :disabled="!pagination.previous_page">
                Sebelumnya
              </button>
            </li>
            <li class="page-item" v-for="i in buttons" :key="i">
              <button class="page-link" type="button" @click="goTo(i)" :class="i == currentPage ? 'active' : ''">
                {{ i }}
              </button>
            </li>
            <li class="page-item">
              <button class="page-link" aria-label="Next" type="button" @click="nextPage(pagination.next_page)"
                :disabled="!pagination.next_page">
                Selanjutnya
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </Parent>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Parent from './Parent.vue';
import { hideLoader, showLoader } from '../helpers/loader';
import { useRoute } from 'vue-router';
const route = useRoute();
const pagination = ref<any>({});
const genres = ref<any>([]);
const loadGenres = async () => {
  const response = await fetch(import.meta.env.VITE_BASE_URL+'/genres/' + route.params.id + '/' + currentPage.value);
  const data = await response.json();
  genres.value = data.data.anime;
  pagination.value = data.data.pagination;
  generateButtons();
};

onMounted(async () => {
  showLoader();
  await loadGenres();
  hideLoader();
});

async function prevPage(url: string) {
  if (url) {
    currentPage.value = currentPage.value - 1;
    showLoader();
    await loadGenres();
    hideLoader();
  }
}

async function nextPage(url: string) {
  if (url) {
    currentPage.value = currentPage.value + 1;
    showLoader();
    await loadGenres();
    hideLoader();
  }
}

async function goTo(page: number) {
  currentPage.value = page;
  showLoader();
  await loadGenres();
  hideLoader();
}

const buttons = ref<any>([]);
const currentPage = ref<number>(1);

function generateButtons() {
  buttons.value = [];
  if (currentPage.value > 3 && currentPage.value < (pagination.value.last_visible_page - 1)) {
    buttons.value = [currentPage.value - 1, currentPage.value, currentPage.value + 1];
  } else if (currentPage.value > 3 && currentPage.value >= pagination.value.last_visible_page - 1) {
    buttons.value = [pagination.value.last_visible_page - 3, pagination.value.last_visible_page - 2, pagination.value.last_visible_page - 1, pagination.value.last_visible_page];
  } else if (currentPage.value === 1 && currentPage.value === pagination.value.last_visible_page) {
    buttons.value = [1];
  } else if (currentPage.value > 1 && currentPage.value === pagination.value.last_visible_page) {
    buttons.value = [pagination.value.last_visible_page - 1, pagination.value.last_visible_page];
  } else if (pagination.value.last_visible_page <= 4) {
    for (let i = 1; i <= pagination.value.last_visible_page; i++) {
      buttons.value.push(i);
    }
  } else {
    buttons.value = [1, 2, 3, 4];
  }
}
</script>

<style scoped>
.card img {
  height: 200px;
  object-fit: cover;
}

.card:hover img {
  transform: none;
  transition: transform 0.5s;
}

.card {
  margin-bottom: 20px;
}

.fs-12 {
  font-size: 12px;
}

.fs-13 {
  font-size: 13px;
  text-align: center;
  border: 1px solid #dee2e6;
}



.card {
  border-radius: 0;
  padding: 0;
}

.card-body {
  padding: 0px;
}

.pagination .page-item .page-link {
  cursor: pointer;
}
</style>