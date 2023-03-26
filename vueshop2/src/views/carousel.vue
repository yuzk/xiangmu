<template>
    <el-carousel height="670px" :interval="4000" style="margin-top:10px;border-radius: 6px;">
    <el-carousel-item v-for="item in store.carouselI" :key="item">
      <img :src="item.src" alt="" @click="detail(item.id)" />
    </el-carousel-item>
  </el-carousel>
</template>

<script setup>
import { useRouter } from "vue-router";
import { inject, onBeforeMount } from "vue";
import { userStore } from "@/store/data";
const store = userStore();
const $axios = inject("$axios");
const router = useRouter();
let i = [];
onBeforeMount(() => {
  getData();
});
//轮播图数据，类别代表数据
async function getData() {
  const { data } = await $axios.get("/getSubItem");
  for (const iterator of data) {
    if (iterator.src != null) {
      i.push(iterator);
    }
  }
  for (const iterator of i) {
    iterator.src = require("@/static/" + iterator.src);
  }
  store.setCarouselI(i);
}
function detail(id) {
  router.push("detail?a=" + id);
}
</script>
 
<style>
img {  
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.el-carousel:hover{
  box-shadow: 0px 0px 5px;
}
.el-carousel:hover img{
  transform: scale(1.05);
  transition: ease 0.5s;
}
</style>