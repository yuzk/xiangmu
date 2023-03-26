<template>
  <el-descriptions
    direction="vertical"
    size="default"
    :column="4"
    border
    v-for="item in store.coupon"
    :key="item"
  >
    <el-descriptions-item label="优惠券">
      {{item.name}}
    </el-descriptions-item>
    <el-descriptions-item label="剩余:">{{
      item[Object.keys(item)[0]]
    }}</el-descriptions-item>
    <el-descriptions-item label="剩余有效时间"
      >{{ item.time != -1?Math.floor(item.time / 3600 / 24)+'天':'永久' }}</el-descriptions-item
    >
    <el-descriptions-item label="使用"
      ><input type="radio" name='checked' @click="useCoupon(Object.keys(item)[0],item) " ></el-descriptions-item
    >
  </el-descriptions>
</template>

<script setup >
import { onBeforeMount, inject } from "vue";
import { userStore } from "@/store/data";
const $http = inject("$axios");
const store = userStore();
//优惠券数据写死
//data.js totalM
//
onBeforeMount(() => {
  getdata();
});
async function getdata() {
  const {
    data: { code },
  } = await $http.get("/obtainLuck");
  store.setCoupon(code);

}
function useCoupon(name,item){
    //响应式数据？结果是的
    for (const ite of store.coupon) {
        ite.value = false
    }
    item.value = true
    store.setUseCouponMoney(item.discountMoney)
    store.setUseCoupon(name)
}

</script>

<style scoped>
.el-descriptions {
  margin-top: 20px;
}
</style>