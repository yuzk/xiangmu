<template>
  <div class="contain">
    <div class="gooditem">
      <el-card v-if="store.carData==0"><div style="display:flex;justify-content:center;">暂未选择商品,请先选购。</div></el-card>
      <el-card class="box" v-for="item in store.carData" :key="item">
        <ul>
          <li><img :src="item.src" alt="" /></li>
          <li>{{ item.name }}</li>
          <li>{{ item.price }}</li>
          <li><el-input-number v-model="item.num" :min="0" :max="10" /></li>
        </ul>
      </el-card>

      <el-card class="pay">
        <div class="coupon">
          <coupon></coupon>
        </div>
        <div
          style="position: absolute; width: 100%; height: 20px; margin-top: 5px"
        >
          <h1 style="font-weight: bold">总计:{{ store.totalM }}</h1>
          <p>
            配送地址:<span style="font-weight: bold">
              {{ store.loginData.dress }}</span
            >
          </p>
        </div>
        <ul>
          <!-- 显示所有订单、对订单操作 -->
          <li>
            <el-button type="primary" @click="queryall(true)" size="large"
              >查询所有订单</el-button
            >
          </li>
          <el-dialog v-model="dialogVisible" title="所有订单" width="80%">
            <el-table
              :data="filterTableData"
              style="width: 100%"
              border
              empty-text="无订单记录＞﹏＜"
            >
              <el-table-column prop="createTime" label="创建时间" width="180" />
              <el-table-column prop="outTradeNo" label="订单号ID" width="350" />
              <el-table-column prop="goodid" label="商品详细" width="300" />
              <el-table-column prop="total" label="应付金额" width="100" />
              <el-table-column
                prop="send_pay_date"
                label="支付时间"
                width="180"
              />
              <el-table-column label="操作">
                <template #header>
                  <el-input
                    v-model="search"
                    size="small"
                    placeholder="查找订单"
                  />
                </template>
                <template #default="scope">
                  <el-button
                    size="large"
                    type="primary"
                    @click="gopay(scope.row)"
                    >支付订单</el-button
                  >
                  <el-button
                    size="large"
                    type="primary"
                    @click="goquery(scope.row)"
                    >查询支付结果</el-button
                  >
                  <el-button size="large" type="danger" @click="del(scope.row)"
                    >删除订单</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-dialog>
          <!-- 结束 -->
          <li>
            <el-button type="primary" size="large" @click="gopay"
              >支付</el-button
            >
          </li>
          <el-dialog v-model="payDialog" width="50%">
            <iframe
              :src="store.ww"
              frameborder="0"
              width="100%"
              height="100%"
            ></iframe>
          </el-dialog>
          <li>
              <adress></adress>          
          </li>
        </ul>
      </el-card>
    </div>
  </div>

</template>

<script setup>
import { defineAsyncComponent } from "@vue/runtime-core";
import coupon from "@/components/youhuiquan.vue";
import { useRoute, useRouter } from "vue-router";
import { userStore } from "@/store/data";
import { ref, computed } from "vue";
import { inject, onMounted, onUnmounted } from "@vue/runtime-core";
import { ElMessage } from "element-plus";
import { changeAdress } from "@/utils/changeAdress";
// import getCities from "@/components/getCity.vue";
const getCities = defineAsyncComponent(()=>import("@/components/getCity.vue"))
// import adress from "@/components/changeAdress.vue";
const adress = defineAsyncComponent(()=>import("@/components/changeAdress.vue"))
const route = useRoute();
const store = userStore();
const router = useRouter();
const $http = inject("$axios");

const changee = ref(false); //新地址输入框的显示隐藏
let newValue = ref(""); //新地址
const dialogVisible = ref(false); //控制所有订单（el-dialog）显示隐藏
const payDialog = ref(false); //二维码展示flag
//表格查找flag
const search = ref("");
const filterTableData = computed(() =>
  store.UserOrder.filter(
    (data) =>
      !search.value ||
      data.outTradeNo.toLowerCase().includes(search.value.toLowerCase())
  )
);
onMounted(() => {
  store.setUseCouponMoney(0);
  document.addEventListener("visibilitychange", (e) => { //页面再次显现刷新页面并查询订单
    if (store.outTradeNo != "" && e.target.visibilityState == "visible") {
      location.reload();
      for (const item of store.UserOrder) {
        if (
          item.outTradeNo == store.outTradeNo &&
          item.send_pay_date == "未查询到数据"
        ) {
          goquery(store);
        }
      }
    }
  });
});
onUnmounted(() => {
  document.removeEventListener("visibilitychange", (e) => {
    if (store.outTradeNo != "" && e.target.visibilityState == "visible") {
      queryall(false);
      for (const item of store.UserOrder) {
        if (
          item.outTradeNo == store.outTradeNo &&
          item.send_pay_date == "未查询到数据"
        ) {
          goquery(store);
        }
      }
    }
  });
});

function kk() {
  for (const item of store.coupon) {
    if (item.value == true) {
      store.setUseCoupon(Object.keys(item)[0]);
      return store.useCoupon;
    }
  }
}

async function luck() {
  const {
    data: { code },
  } = await $http.get("/luck");
  console.log(code);
}

async function queryall(i) {
  // const { data } = await $http.get(`/quertAll`);
  // ElMessage({
  //   showClose: true,
  //   message: data.code,
  //   type: "success",
  // });
  dialogVisible.value = i;
  const { data } = await $http.get(`/quertAll`);
  let queryData = [];
  for (const item of data.code) {
    if (item.send_pay_date == "" || item.send_pay_date == null) {
      item.send_pay_date = "未查询到数据";
    }
    queryData.push(item);
  }
  store.setUserOrder(queryData);
}

async function gopay(row) {
  const useLuck = kk();
  if (useLuck) {
    if (store.totalM < 0) {
      return ElMessage({
        showClose: true,
        message: "请确认金额！",
        type: "warning",
      });
    }
  }
  let id = [];
  for (const iterator of store.carData) {
    if (iterator.num >= 1)
      id.push([
        { [iterator.id]: iterator.num }, //商品id和商品数量
        { userid: store.loginData.id }, //登录账户id
        { adress: store.loginData.dress }, //登录账户地址（购买前最后一次修改为准）
      ]);
  }
  if (id.length > 0 && store.loginData.dress != null) {
    try {
      if (row.outTradeNo != undefined) {
        var { data } = await $http.post("/pay", {
          id,
          useLuck,
          outTradeNo: row.outTradeNo,
        });
        queryall(false);
      } else {
        var { data } = await $http.post("/pay", { id, useLuck });
        queryall(false);
      }
      if (data.code == "没有优惠券！")
        return ElMessage({
          showClose: true,
          message: data.code,
          type: "warning",
        });
      // console.log(data);
      store.setoutTradeNo(data.outTradeNo);
      // console.log(data);
      // payDialog.value = true
      // store.setWw(data.code)
      window.open(data.code, "_blank"); //打开页面
    } catch (error) {
      ElMessage({
        showClose: true,
        message: "请重新登录！",
        type: "warning",
      });
    }
  } else {
    let dd = "请先添加商品!";
    if (store.loginData.dress == null) {
      dd = "请填写地址";
    }
    ElMessage({
      showClose: true,
      message: dd,
      type: "warning",
    });
  }
}
async function goquery(row) {
  if (row.outTradeNo == "")
    return ElMessage({
      showClose: true,
      message: "请先支付后再进行查询!",
      type: "warning",
    });
  const { data } = await $http.get(`/query?outTradeNo=${row.outTradeNo}`);
  if (data.code == "查询交易成功！") {
    ElMessage({
      showClose: true,
      message: data.code,
      type: "success",
    });
    queryall();
  } else {
    ElMessage({
      showClose: true,
      message: data.code,
      type: "warning",
    });
  }
}
const del = async (row) => {
  const { data } = await $http.post("/delOrder", {
    outTradeNo: row.outTradeNo,
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
</script>

<style scoped>
.t1 {
  position: relative;
}
.t2 {
  position: absolute;
  left: 0;
  transform: translate(50%);
}

.contain {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
}
.contain .gooditem {
  width: 1336px;
}
.contain .gooditem .box {
  width: 1336px;
  height: 150px;
}
.contain .gooditem .pay {
  width: 1336px;
  height: 581px;
  position: relative;
  box-sizing: border-box;
}
.contain .gooditem .box img {
  width: 70px;
  height: 55px;
}
.contain .gooditem .box ul,
.contain .gooditem .pay ul {
  margin-top: 40px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.contain .gooditem .box ul li {
  width: 25%;
  height: 100%;
  float: left;
  list-style: none;
  line-height: 30px;
}
.contain .gooditem .pay ul li {
  float: left;
  /* width: 17%; */
  margin-right: 5px;
  height: 60px;
  list-style: none;
  line-height: 60px;
}
</style>