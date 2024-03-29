<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Parent from './Parent.vue';
import AnimeCard from './OnGoingAnime.vue';
import OnGoingAnime from './CompleteAnime.vue';
import { showLoader, hideLoader } from '../helpers/loader';

const datas = ref<any>({ ongoing_anime: [], complete_anime: [] });

async function loadAnimeHome() {
  const response = await fetch('http://localhost:3000/v1/home');
  const data = await response.json();
  datas.value = data.data;
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
      <div class="col-12 justify-content-center">
        <div class="mb-3 p-3 rounded" style="background-color: #36688a">
          <div class="d-flex align-items-center">
            <div class="me-auto mt-auto">
              <h6 class="text-white">ANIME SEDANG TAYANG</h6>
            </div>
            <RouterLink to="/ongoing-anime" class="btn btn-sm btn-danger">Lihat Semua</RouterLink>
          </div>
        </div>
      </div>
    </div>
    <AnimeCard :datas="datas.ongoing_anime" />
    <div class="row">
      <div class="col-12 justify-content-center">
        <div class="mb-3 p-3 rounded" style="background-color: #36688a">
          <div class="d-flex align-items-center">
            <div class="me-auto mt-auto">
              <h6 class="text-white">ANIME TAMAT</h6>
            </div>
            <RouterLink to="/complete-anime" class="btn btn-sm btn-danger">Lihat Semua</RouterLink>
          </div>
        </div>
      </div>
    </div>
    <OnGoingAnime :datas="datas.complete_anime" />
  </Parent>


</template>
