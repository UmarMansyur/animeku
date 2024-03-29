<template>
     <div class="row mb-3">
     <div class="col-6 col-md-2 mb-3" v-for="(i, index) in props.datas" :key="index">
       <RouterLink class="card" :to="`/${i.slug}`">
         <img :src="i.poster" class="card-img-top" alt="anime-picture">
         <div class="postedon">{{ i.episode_count }} Eps</div>
         <div class="postedon-left bg-warning">{{ i.rating }}</div>
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