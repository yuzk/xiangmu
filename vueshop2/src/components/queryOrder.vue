<template>
  <el-table :data="dd" style="width: 100%" border show-summary>
    <el-table-column label="id" prop="id" width="80" sortable/>
    <el-table-column label="创建时间" prop="createTime" width="160" sortable />
    <el-table-column label="用户Id" prop="userId" width="110" sortable />
    <el-table-column label="商品Id" prop="goodid" width="150" sortable />
    <el-table-column label="订单编号" prop="outTradeNo" width="130" sortable />
    <el-table-column
      label="支付时间"
      prop="send_pay_date"
      width="150"
      sortable
    />
    <el-table-column label="总价" prop="total" width="100" sortable />
    <el-table-column label="地址" prop="adress" width="230" sortable />
    <el-table-column label="优惠券" prop="isCoupon" width="150" sortable />
    <el-table-column label="是否删除" prop="isDel" width="140" sortable />
    <el-table-column label="订单是否Vip" prop="hVip" width="140" sortable />
    <el-table-column
      label="订单是否有效"
      prop="isAvailable"
      width="140"
      sortable
    />
    <el-table-column width="230">
      <template #header>
        <el-input v-model="search" size="small" placeholder="查询订单编号" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="check(scope.row.outTradeNo)"
          >查询订单</el-button
        >
        <el-button size="small" type="danger" @click="del(scope.row.outTradeNo)"
          >删除订单</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ElMessage } from "element-plus";
import {
  inject,
  onUnmounted,
  ref,
  computed,
} from "vue";
import { userStore } from "@/store/data";
import {  useRouter } from "vue-router";
const router = useRouter()
const $http = inject("$axios");
const store = userStore();
let t = "";
const search = ref("");
const dd = computed(() =>
  store.dataa.filter(
    (data) =>
      !search.value ||
      data.outTradeNo.toLowerCase().includes(search.value.toLowerCase())
  )
);
const del = async (outTradeNo) => {
  const { data } = await $http.post("/delOrder", {
    outTradeNo: outTradeNo,
  });

  if (data.code == "删除成功！") {
    ElMessage({
      showClose: true,
      message: data.code,
      type: "success",
    });
    queryall();
  }
};
  getdata();
async function check(orderNo) {
  const { data } = await $http.get(`/query?outTradeNo=${orderNo}`);
  // console.log(data);
  ElMessage({
    showClose: true,
    message: data.code,
    type: "warning",
  });
}

const axios = inject("$axios");

function getdata() {
  t = setInterval(async () => {
    const { data } = await axios.get("/queryOrder");
    if (data.code.length === 0) {
      clearInterval(t)
      ElMessage({
        showClose: true,
        message: '没有权限',
        type: "warning",
      });
      return router.push('/home')
    }
    store.setDataa(data.code);
  }, 2000);
}
onUnmounted(() => {
  clearInterval(t);
});
</script>

<style scoped>
.el-descriptions {
  margin-bottom: 10px;
}
</style>