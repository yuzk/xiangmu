<template>
  <div class="center">
    <div class="item">
      <div class="img">
        <fdj
          :sImg="store.userGood.src"
          :bImg="store.userGood.src"
          :sSize="{ width: 418, height: 650 }"
          :bSize="{ width: 500, height: 650 }"
          :mSize="{ width: 100, height: 100 }"
        ></fdj>
      </div>
      <div class="des">
        <div class="price">
          <div class="t1">{{ store.userGood.name }}</div>
          <div class="t2">￥{{ store.userGood.price }}元</div>
        </div>
        <div class="dec">
          <p style="font-size: 18px">{{ store.userGood.dec }}</p>
        </div>
        <div class="adress">
          <p >
            配送地址:<span style="font-weight: bold">
              {{ store.loginData.dress }}</span
            >
          </p>
          <div style="width:100px;"><adress></adress></div>
          
        </div>
        <div class="total">
          <div class="t3">
            <el-button @click="goCar" type="primary" size="large"
              >加入购物车</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import fdj from "@/components/fangdajing.vue";
import { inject, onBeforeMount, ref } from "@vue/runtime-core";
import { userStore } from "@/store/data";
import { ElMessage } from "element-plus";

import adress from "@/components/changeAdress.vue";
const $axios = inject("$axios");

const store = userStore();
const route = useRoute();
const router = useRouter();
const a = route.query.a;
let changee = ref(false);

onBeforeMount(() => {
  getItem();
});
async function getItem() {
  if (
    window.sessionStorage.getItem("token") == "" ||
    window.sessionStorage.getItem("token") == null
  ) {
    ElMessage({
      showClose: true,
      message: "请先登录!",
      type: "warning",
    });
    window.sessionStorage.clear();
    return router.push("/login?l=signin");
  } else {
    const q = route.query.a;
    const { data } = await $axios.post("/hotGoods/id", { q });
    if (data == "error") {
      ElMessage({
        showClose: true,
        message: "请重新登录!!",
        type: "error",
      });
      window.sessionStorage.clear();
    }
    // console.log(data);
    data[0].src = require("@/static/" + data[0].src);

    store.setUserGood(data[0]);
    //  console.log(store.userGood);
  }
}
function goCar() {
  // console.log(store.carData,'  s');
  const m = {};
  for (let i = 0; i < Object.keys(store.userGood).length; i++) {
    const n = Object.keys(store.userGood)[i];
    m[n] = store.userGood[n];
  }

  for (let j = 0; j < store.carData.length; j++) {
    if (store.carData[j].id == m.id) {
      ElMessage({
        showClose: true,
        message: "购物车已有添加商品!",
        type: "warning",
      });
      return router.push("/goodCar?c=" + a);
    }
  }
  store.setCarData([m].concat(store.carData));

  // console.log(m,'   sw');

  // console.log(store.carData);
  router.push("/goodCar?c=" + a);
}
// function buy() {
//   //直接调用支付接口
//   if (!store.loginData.dress) {
//     ElMessage({
//       showClose: true,
//       message: "请先添加地址!",
//       type: "warning",
//     });
//   }
// }
</script>

<style scoped>

.center {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.center .item {
  width: 1336px;
  height: 660px;
  display: flex;
}
.center .item .img {
  width: 418px;
  height: 650px;
}
.center .item .des {
  flex: 3;
  display: flex;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */
  padding-left: 20px;
}
.center .item .des .price {
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.center .item .des .price .t1 {
  flex: 1;
  color: #f40;
  font-size: 40px;
}
.center .item .des .price .t2 {
  flex: 1;
  color: #f40;
  font-size: 40px;
}
.center .item .des .dec {
  flex: 6;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  font-size: 22px;
  color: rgb(0, 0, 0);
}
.center .item .des .adress {
  flex: 1;
  display: flex;
  display: flex;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */
  /* justify-content: center;
  align-items: center; */
  /* flex-direction: column; */
}

/* .center .item .des .adress .t2 {
  flex: 1;
} */
.center .item .des .total {
  margin-top: 20px;
  flex: 1;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  flex-direction: column;
}
</style>