<template>
  <div class="f">
    <div class="contain">
      <div class="carousel">
        <carousel></carousel>
      </div>
    </div>
    <div class="anima">
    <div class="sititem">
      <siteitemm></siteitemm>
    </div>
  </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from "@vue/runtime-core";
// import carousel from "@/views/carousel.vue";
const carousel = defineAsyncComponent({
  loader: () => import("@/views/carousel.vue"),
  // loadingComponent: loding /* 在加载时显示 */,
  // errorComponent: ErrorComponent /* 显示是否有错误 */,
  // delay: 1000 /* 在显示加载组件之前延迟毫秒 */,
  // timeout: 3000 /* 这个毫秒之后的超时 */,
});
// import siteitemm from "@/views/siteitem.vue";
const siteitemm = defineAsyncComponent(() => import("@/views/siteitem.vue"));
</script>

<style scoped>
/* body {
  color: #747679;
  font-size: 14px;
  background-color: #ffeff5;
} */
.f {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.contain {
  width: 100%;
  height: 670px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.contain .carousel {
  width: 1336px;
  height: 670px;
  margin-bottom: 10px;
}
.sititem {
  width: 100%;
  height: 100%;
  margin-top: 10px;
  background-color: rgb(236, 229, 229);
}
</style>>

