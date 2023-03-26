<template>
  <el-card>
    <div class="t1">
      <div class="t2">全国连锁加盟热线：400-0799-883</div>
      <div class="t3" v-for="(item,index) in store.couponAmount" :key="item" @click="becomeMember(index+1)">成为会员￥{{item.amount}}</div>
      <!-- <div class="t3" @click="becomeMember(2)">成为会员￥2000</div> -->
    </div>
  </el-card>
</template>

<script setup>

import { inject, onMounted } from '@vue/runtime-core';
import {useRouter} from 'vue-router'
import { userStore } from "@/store/data";
const router = useRouter()
const $axios = inject("$axios")
const store = userStore();
onMounted(()=>{
  getdata()
  async function getdata(){
    const {data} = await $axios.get('/getAmount')
    store.setCouponAmount(data.code);
  }
})
 async function becomeMember(id){
  router.push("/detail?a=" + id);
  }
</script>

<style scoped>
.t1 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.t1 .t2 {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  color: red;
}
.t1 .t3 {
  margin-top: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content:center;
  font-size: 40px;
  color: red;
  cursor: pointer;
}
</style>