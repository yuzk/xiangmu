<template>
  <div class="d">
    <div class="dd">
      <ul>
        <li v-for="item in data" :key="item">
          <img :src=item.src alt="" />
          <h1>
            {{item.txt}}
          </h1>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const data = [
  {
    src: require("@/static/640.jpg"),
    txt: `萍乡推出“微心愿爱心早餐中国行”项目打造全省首个“互联网+实业+慈善”大平台...`,
  },
  {
    src: require("@/static/640.jpg"),
    txt: `萍乡推出“微心愿爱心早餐中国行”项目打造全省首个“互联网+实业+慈善”大平台...`,
  },
  {
    src: require("@/static/640.jpg"),
    txt: `萍乡推出“微心愿爱心早餐中国行”项目打造全省首个“互联网+实业+慈善”大平台...`,
  },
];
</script>

<style scoped>
.d {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.d .dd {
  width: 1336px;
  height: 100%;
}
.d .dd img {
  width: 100%;
  height: 500pz;
}
.d .dd ul {
  width: 100%;
  height: 100%;
  margin: 10px 10px;
}
.d .dd ul li {
  float: left;
  width: 50%;
  list-style-type: none;
}
</style>