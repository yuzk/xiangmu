<template>
  <div class="center">
    <div class="item">
      <div class="listBar">
        <div><router-link to="/join/introduction">企业介绍</router-link></div>
        <div><router-link to="/join/culture">企业文化</router-link></div>
        <div><router-link to="/join/model">商业模式</router-link></div>
        <div><router-link to="/join/charitable">慈善行动</router-link></div>
        <div><router-link to="/join/join">加入我们</router-link></div>
      </div>
      <el-card class="text">
        <router-view></router-view>
      </el-card>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.center {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.center .item {
  width: 1336px;
  height: 630px;
  display: flex;
}
.center .item .listBar {
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;

}
.center .item .listBar div {
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  cursor: pointer;
    position: relative;
}
.center .item .listBar div::after {
  color: rgba(177, 25, 26, 1);
  content: url('@/static/方向-右.png');
  position: absolute;
  right: 8px;
  top: 36px;
  z-index: 999;
}
.center .item .listBar div:hover {
  background-color: rgba(177, 25, 26, 1);
}
.center .item .text {
  flex: 3;
  /* background-color: #ffeff5; */
  /* border: 1px solid black; */
}
.router-link-active {
  color: red;
    text-decoration: none;
}

</style>