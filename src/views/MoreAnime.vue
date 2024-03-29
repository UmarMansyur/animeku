<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import OnGoingAnime from './OnGoingAnime.vue';
import Parent from './Parent.vue';
import { hideLoader, showLoader } from '../helpers/loader';
import CompleteAnime from './CompleteAnime.vue';
const router = useRouter();
const currentPage = ref<number>(1);

const datas = ref<any>({ ongoing_anime: [] });
const pagination = ref<any>({});
async function loadAnimeHome() {
  const response = await fetch(import.meta.env.VITE_BASE_URL + router.currentRoute.value.path + '/' + currentPage.value);
  const data = await response.json();
  datas.value = data.data;
  pagination.value = data.pagination;
  generateButtons();
}

async function prevPage(url: string) {
  if (url) {
    currentPage.value = currentPage.value - 1;
    showLoader();
    await loadAnimeHome();
    hideLoader();
  }
}

async function nextPage(url: string) {
  if (url) {
    currentPage.value = currentPage.value + 1;
    showLoader();
    await loadAnimeHome();
    hideLoader();
  }
}

async function goTo(page: number) {
  currentPage.value = page;
  showLoader();
  await loadAnimeHome();
  hideLoader();
}

const buttons = ref<any>([]);
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

onMounted(async () => {
  showLoader();
  await loadAnimeHome();
  hideLoader();
});
</script>
<template>
  <Parent>
    <div class="row">
      <div class="col-12">
        <div class="alert alert-primary">
          <p class="mb-0 fs-12">
            Klik gambar anime untuk melihat detail anime.
          </p>
        </div>
      </div>
    </div>
    <OnGoingAnime :datas="datas" v-if="router.currentRoute.value.path == '/ongoing-anime'"></OnGoingAnime>
    <CompleteAnime :datas="datas" v-if="router.currentRoute.value.path == '/complete-anime'"></CompleteAnime>
    <div class="row">
      <div class="col-12 text-center d-flex">
        <nav class="mx-auto" aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <button class="page-link" aria-label="Previous" type="button" @click="prevPage(pagination.previous_page)" :disabled="!pagination.previous_page">
                Sebelumnya
              </button>
            </li>
            <li class="page-item" v-for="i in buttons" :key="i">
              <button class="page-link" type="button" @click="goTo(i)" :class="i == currentPage ? 'active' : ''">
                {{ i }}
              </button>
            </li>
            <li class="page-item">
              <button class="page-link" aria-label="Next" type="button" @click="nextPage(pagination.next_page)" :disabled="!pagination.next_page">
                Selanjutnya
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </Parent>
</template>