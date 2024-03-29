<template>
  <div class="wrapper">
    <nav class="navbar navbar-dark bg-dark navbar-expand-lg fixed-top py-3 border-bottom">
      <div class="container">
        <RouterLink class="navbar-brand" to="/">ANIMEKU x Otaku Desu</RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <RouterLink class="nav-link" :class="$route.path === '/home' ? 'active' : ''" aria-current="page" to="/">Home
            </RouterLink>
            <RouterLink class="nav-link" :class="$route.path === '/complete-anime' ? 'active' : ''" to="/complete-anime">Complete
              Anime</RouterLink>
            <RouterLink class="nav-link" :class="$route.path === '/ongoing-anime' ? 'active' : ''" to="/ongoing-anime">Ongoing
              Anime</RouterLink>
              <RouterLink class="nav-link" :class="$route.path === '/genre' ? 'active' : ''" to="/genre">Daftar Genre</RouterLink>
          </div>
        </div>
        <div class="d-flex mx-auto d-none d-md-inline-block" role="search">
          <div class="input-group">
            <input class="form-control" type="search" placeholder="Masukkan kata kunci ..." aria-label="Search" v-model="search" @change="searching">
            
          </div>
        </div>
      </div>
    </nav>
    <main>
      <div class="container page-wrapper">
        <div class="row d-md-none">
          <div class="col-12 mb-3">
            <div class="input-group">
              <input class="form-control" type="search" placeholder="Masukkan kata kunci ..." aria-label="Search" v-model="search" @change="searching">
              <button class="btn btn-warning" type="button">
                <i class="bx bx-search-alt"></i>
              </button>
            </div>
          </div>
        </div>

        <slot></slot>

      </div>
    </main>
    <footer class="bg-dark border-top text-center text-white py-3">
      <p class="mb-0">© 2021 ANIMEKU x Otaku Desu</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import router from '../router';
const search = ref<string>('');

const searching = () => {
  console.log(search.value);
  if (search.value) {
    router.replace('/search/' + search.value);
  } else {
    router.replace('/home');
  }
}
</script>
