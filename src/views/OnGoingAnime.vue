<template>
  <div class="row mb-3">
    <div class="col-md-2 col-6 mb-3" v-for="(i, index) in props.datas" :key="index">
      <RouterLink class="card" :to="`/${i.slug}/${(i.current_episode ? i.current_episode.split(' ')[1] : '')}`">
        <img :src="i.poster" class="card-img-top" alt="anime-picture">
        <div class="postedon bg-danger">{{ i.current_episode }}</div>
        <div class="postedon-left bg-primary">{{ i.newest_release_date }}</div>
        <div class="out-thumb">
          <h1>
            <a href="#">{{ i.title }}</a>
          </h1>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  datas: Object
});
</script>