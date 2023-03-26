<template>
    <div class="center">
      <div class="item" v-for="item in imgsrc" :key="item">
        <div class="title">爱心资讯</div>
        <div class="content">
          <img :src="item.src" alt="">
        </div>
      </div>
    </div>
</template>

<script setup>
const imgsrc = [
  { src: require("@/static/zaocang-6.jpg") },
  { src: require("@/static/zaocang-2.jpg") },
  { src: require("@/static/zaocang-3.jpg") },
  { src: require("@/static/zaocang-4.jpg") },
  { src: require("@/static/zaocang-5.jpg") },
];



</script>

<style scoped>

.center {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.center .item {
  width: 1336px;
}
.center .item .title {
  display: flex;
  justify-content: center;
  font-size: 30px;
}
.center .item .content {
  width: 100%;
  height: 900px;
}

</style>