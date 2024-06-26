<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { hideLoader, showLoader } from '../helpers/loader';
import Parent from './Parent.vue';

const router = useRouter();
const anime = ref<any>({});

const loadAnime = async () => {
  const response = await fetch(import.meta.env.VITE_BASE_URL + '/anime/' + router.currentRoute.value.params.name);
  const data = await response.json();
  anime.value = data.data;
};

const urls = ref<any>([]);
const loadUrls = async () => {
  const response = await fetch(import.meta.env.VITE_BASE_URL + '/anime/' + router.currentRoute.value.params.name + '/episodes/' + router.currentRoute.value.params.id);
  const data = await response.json();
  urls.value = data.data;
};

const previos = async (slug: string) => {
  if (slug) {
    showLoader();
    const response = await fetch(import.meta.env.VITE_BASE_URL + '/episode/' + slug);
    const data = await response.json();
    urls.value = data.data;
    hideLoader();
  }
};

const nextPage = async (slug: string) => {
  if (slug) {
    showLoader();
    const response = await fetch(import.meta.env.VITE_BASE_URL + '/episode/' + slug);
    const data = await response.json();
    urls.value = data.data;
    hideLoader();
  }
};

onMounted(async () => {
  showLoader();
  await loadAnime();
  await loadUrls();
  hideLoader();
});
</script>
<template>
  <Parent>
    <div class="row mb-3">
      <div class="col-12">
        <div class="alert alert-primary">
          <p class="mb-0 fs-12">
            Klik tombol <i class="bx bx-download"></i> untuk mendownload anime ini. Jika tombol download tidak muncul,
            berarti anime ini belum tersedia untuk diunduh.
          </p>
        </div>
      </div>
      <div class="col-md-3 text-center text-md-start mb-2">
        <img :src="anime.poster" alt="anime-picture" class="img-fluid">
      </div>
      <div class="col-md-9">
        <div class="bg-dark text-center py-1 text-white">
          <h4 class="mb-0">{{ anime.title }} | {{ anime.japanese_title }}</h4>
        </div>
        <div class="">
          <ul class="list-unstyled mt-3">
            <li class="fs-14">
              <b>Judul Anime:</b> {{ anime.title }}
            </li>
            <li class="fs-14">
              <b>Judul Anime Jepang:</b> {{ anime.japanese_title }}
            </li>
            <li class="fs-14">
              <b>Tanggal Rilis:</b> {{ anime.release_date }}
            </li>
            <li class="fs-14">
              <b>Studio:</b> {{ anime.studio }}
            </li>
            <li class="fs-14">
              <b>Producer:</b> {{ anime.produser }}
            </li>
            <li class="fs-14">
              <b>Genre:</b> {{ anime.genres ? anime.genres.map((genre: any) => genre.name).join(', ') : '' }}
            </li>
            <li class="fs-14">
              <b>Episode:</b> {{ anime.episode_count }}
            </li>
            <li class="fs-14">
              <b>Duration:</b> {{ anime.duration }}
            </li>
            <li class="fs-14">
              <b>Status:</b> {{ anime.status }}
            </li>
          </ul>
        </div>
      </div>
      <div class="col-12">
        <hr>
        <div class="bg-dark">
          <h6 class="text-white text-center py-2">Sinopsis</h6>
        </div>
        <div class="bg-light p-3">
          <p>{{ anime.synopsis == "" ? 'Sinopsis tidak tersedia' : anime.synopsis }}</p>
        </div>
      </div>
      <div class="col-12 mt-3">
        <div class="bg-dark">
          <h6 class="text-white text-center py-2">Download {{ anime.title }} | {{ anime.japanese_title }}</h6>
        </div>
      </div>
      <div class="col-12">
        <h6 class="bold mb-3"><b>{{ urls.episode }}</b></h6>
        <div class="row" v-for="(a, index) in urls.download_urls" :key="index">
          <div class="col-md-12 mt-auto">
            <div class="row">
              <div class="col-12 mt-1" v-for="(b, id) in a" :key="id">
                <div class="fs-14 text-white p-2" style="background-color: #305d7b;">{{ index }} {{ b.resolution }}
                </div>
                <div class="row justify-content-between">
                  <div class="col-4 col-md-2" v-for="(file, fileId) in b.urls" :key="fileId">
                    <a :href="file.url" class="btn btn-sm btn-primary w-100 my-2" target="_blank">
                      <i class="bx bx-download"></i> {{ file.provider }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="row mb-5">
      <div class="col-12">
        <div class="bg-dark text-white text-center py-2 mb-3">
          <h6 class="mt-auto mb-0"></h6>
        </div>
      </div>
      <div class="col-6">
        <button class="btn btn-danger" type="button" @click="previos(urls.previous_episode.slug)" v-if="urls.has_previous_episode">
          <i class="bx bx-left-arrow-alt"></i> Eps Sebelumnya
        </button>

      </div>
      <div class="col-6 text-end">
        <button class="btn btn-danger me-2" type="button" @click="nextPage(urls.next_episode.slug)" v-if="urls.has_next_episode">
          Berikutnya <i class="bx bx-right-arrow-alt"></i>
        </button>
        <button class="btn btn-light" @click="router.push('/ongoing-anime')">
          Lihat Anime Ongoing <i class="bx bx-arrow-to-right"></i>
        </button>

      </div>
    </div>
  </Parent>
</template>

<style scoped>
.fs-14 {
  font-size: 14px;
}

.fs-12 {
  font-size: 12px;
}
</style>