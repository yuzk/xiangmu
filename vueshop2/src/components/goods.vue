<template>
  <el-row :gutter="20">
    <el-col :span="6" v-for="item in store.categoryGoods[0]" :key="item">
      <div class="grid-content ep-bg-purple" />
      <el-card v-if="item.src"
        ><img :src="item.src" @click="clickimg(item.id)" />
        <div
          style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap"
        >
          {{ item.dec }}
        </div>
        <h1 style="display: flex; justify-content: center">
          <span style="color: red; margin-top: 5px; font-size: 20px"
            >￥{{ item.price }}</span
          >
        </h1></el-card
      ></el-col
    >
  </el-row>
</template>
<script setup>
import { useRouter, useRoute } from "vue-router";
import { onBeforeMount } from "@vue/runtime-core";
import { userStore } from "@/store/data";
import { inject } from "vue";
import { ElMessage } from "element-plus";
const $axios = inject("$axios");
const store = userStore();
const router = useRouter();
const route = useRoute();
onBeforeMount(() => {
  store.setCategoryGoods([]);
  //此处需获取网址参数请求后台返回特定类别所有数据
  // console.log(route.query.c);//类别
  getCategoryGoods();
});
function clickimg(id) {
  router.push(`detail?a=${id}`);
}
async function getCategoryGoods() {
  if (store.loginData.length == 0) {
    ElMessage({
      showClose: true,
      message: "请先登录!",
      type: "warning",
    });
    return router.push("/login?l=signin");
  } else {
    const { data } = await $axios.get(`/goods?c=${route.query.c}`);
    // console.log(data);
    if (data.length != 0) {
      for (let i = 0; i < data.length; i++)
        data[i].src = require("@/static/" + data[i].src);
      return store.setCategoryGoods([
        //由后端返回数据，然后存入pinia
        data,
      ]);
    }
    return;
  }
}
</script >

<style scoped>
.el-row {
  position: relative;
  width: 1336px;
  left: 50%;
  transform: translate(-50%);
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
  margin-bottom: 10px;
}

.grid-content {
  border-radius: 4px;
  line-height: 36px;
}
.el-card {
  width: 100%;
  height: 100%;
}
.el-card img {
  width: 274px;
  height: 174px;
  cursor: pointer;
  transition: all ease 0.5s;
}
.el-card img:hover {
  position: relative;
  bottom: -1px;
  box-shadow: 5px 5px 5px #333333;
}
</style>
