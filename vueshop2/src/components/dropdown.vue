<template>
  <img src="@/static/bitlogo.jpg" class="logo" @click="gohome" />
  <div class="topbar">
    <div class="left">
      <div class="data" v-for="(item, index) in store.subitem" :key="item">
        <div>
          <span class="el-dropdown-link" @click="clickItem(index)">
            {{item.name}}
          </span>
        </div>
      </div>
    </div>
    <el-dialog v-model="dialogVisible" title="修改密码" width="30%">
      <el-input
        v-model="input"
        type="password"
        placeholder="Please input password"
        show-password
      />
      <el-button type="primary" @click="changePd">确定</el-button>
    </el-dialog>
  </div>
  <div class="my">
    <el-dropdown v-if="store.loginData.id">
      <el-avatar :src="png" />
      <template #dropdown>
        <el-dropdown-menu>
          <div style="width: 280px">
            <el-dropdown-item disabled
              ><p>账号：{{ store.loginData.id }}</p></el-dropdown-item
            >
            <el-dropdown-item disabled
              ><p>昵称：{{ store.loginData.username }}</p></el-dropdown-item
            >
            <el-dropdown-item disabled
              ><p
                style="width: 100%; overflow: hidden; text-overflow: ellipsis"
              >
                地址：{{ store.loginData.dress }}
              </p></el-dropdown-item
            >
            <el-dropdown-item @click="signout">
              <el-button type="primary" size="large" style="width: 100%"
                >退出</el-button
              >
            </el-dropdown-item>
            <el-dropdown-item @click="goCar">
              <el-button type="primary" size="large" style="width: 100%"
                >购物车</el-button
              >
            </el-dropdown-item>
            <el-dropdown-item @click="xiugai">
              <el-button type="primary" size="large" style="width: 100%"
                >修改密码</el-button
              >
            </el-dropdown-item>
            <el-dropdown-item><adress></adress> </el-dropdown-item>
          </div>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dropdown v-else>
      <el-avatar :src="login" />
      <template #dropdown>
        <el-dropdown-menu>
          <div style="width: 280px">
            <el-dropdown-item @click="signin">
              <el-button type="primary" size="large" style="width: 100%"
                >登录</el-button
              ></el-dropdown-item
            >
            <el-dropdown-item @click="register">
              <el-button type="primary" size="large" style="width: 100%"
                >注册</el-button
              ></el-dropdown-item
            >
          </div>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>

  <el-backtop :right="100" :bottom="100" style="color: #909090" />
</template>

<script setup>
import {getData} from '@/utils/getSubitem'
import adress from "@/components/changeAdress.vue";
import { onBeforeMount, inject, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { userStore } from "@/store/data";
import { ElMessage } from "element-plus";
const store = userStore();
const vuerouter = useRouter();
const route = useRoute();
const $axios = inject("$axios");
const dialogVisible = ref(false);

const png = require("@/static/user.png");
const login = require("@/static/login.png");

const xiugai = () => {
  dialogVisible.value = true;
  // vuerouter.push("/changeP");
};
const input = ref("");

const changePd = async () => {
  // console.log(input.value);
  const { data } = await $axios.post("/changeP", { input: input.value });
  if (data.code != "error") {
    dialogVisible.value = false;
    return ElMessage({
      showClose: true,
      message: "修改成功!",
      type: "success",
    });
  }
  ElMessage({
    showClose: true,
    message: "修改失败!",
    type: "error",
  });
};

onBeforeMount(() => {
  getData(); //获取导航栏数据
});
// let fitem = [];
// async function getData() {
//   const { data } = await $axios.get("/getSubItem");
//   // console.log(data);
//   for (const iterator of data) {
//     if (iterator.src == null) {
//       if (iterator.child != null) {
//         fitem.push(iterator);
//       }
//     }
//   }
//   for (const iterator of fitem) {
//     if (iterator.child.indexOf != -1) {
//       iterator.child = iterator.child.split(",");
//     }
//     for (let i = 0; i < iterator.child.length; i++) {
//       const { data } = await $axios.post("/getSubItem", {
//         id: iterator.child[i],
//       });

//       iterator.child[i] = data[0];
//     }
//   }

//   store.setSubitem(fitem);
// }

function signin() {
  // if (store.loginData.id) {
  //   signout();
  // }

  vuerouter.push("/login?l=signin");
}
function register() {
  // if (store.loginData.id) {
  //   signout();
  // }
  vuerouter.push("/login?l=register");
}
function gohome() {
  vuerouter.push("/home");
}
function signout() {
  store.loginOut();
  ElMessage({
    showClose: true,
    message: "退出成功!",
    type: "success",
  });
  vuerouter.push("/login?l=signin");
}
function clickItem(index) {
  if (index == 2) {
    return vuerouter.push("/breakfast");
  } else if (index == 0) {
    return vuerouter.push("/hotel");
  } else if (index == 1) {
    return vuerouter.push("/supermaker");
  } else if (index == 3) {
    return vuerouter.push("/household");
  } else if (index == 4) {
    return vuerouter.push("/wellness");
  }
}
// }
function goCar() {
  vuerouter.push("/goodCar");
}
</script >

<style scoped>
.topbar .left .data div:hover,
.topbar .right div:hover,
.xiugai:hover {
  border-bottom: 1px solid orange;
}
.my {
  position: absolute;
  top: 3px;
  right: 130px;
  cursor: pointer;
}
.logo {
  position: absolute;
  width: 50px;
  height: 42px;
  cursor: pointer;
}
.topbar {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #fffcfd;
}

.topbar .left {
  flex: 15;
  display: flex;
}
.topbar .left .data {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;
}
.topbar .left .data div {
  font-size: 16px;
}
.topbar .right {
  flex: 2;
  justify-content: space-around;
  display: flex;
}
.topbar .right div,
.xiugai {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  line-height: 42px;
  font-size: 16px;
}
</style>