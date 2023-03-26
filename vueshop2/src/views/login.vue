<template>

  <div class="rwa">
    <div class="contain">
      <el-form
        label-width="100px"
        :model="formLabelAlign"
        style="max-width: 460px"
        ref="form"
        :rules="rules"
        v-if="radio == 'signin'"
      >
        <el-form-item>
          <el-radio-group v-model="radio" label="label position">
            <el-radio-button label="signin" @change="signin"
              >登录</el-radio-button
            >
            <el-radio-button label="register" @change="register"
              >注册</el-radio-button
            >

          </el-radio-group></el-form-item
        >
        <el-form-item prop="account">
          <el-input v-model="formLabelAlign.account" placeholder="账号:" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formLabelAlign.password"
            placeholder="密码:"
            type="password"
          />
        </el-form-item>
        <el-form-item>
          <el-button size="large" @click="Form(form)">登录</el-button>
        </el-form-item>
      </el-form>
      <el-form
        label-width="100px"
        :model="formLabelAlign"
        style="max-width: 460px"
        ref="forml"
        :rules="rulesl"
        v-if="radio == 'register'"
      >
        <el-form-item>
          <el-radio-group
            v-model="radio"
            label="label position"
            v-if="!store.loginData.username"
          >
            <el-radio-button label="signin" @change="signin"
              >登录</el-radio-button
            >
            <el-radio-button label="register" @change="register"
              >注册</el-radio-button
            >
          </el-radio-group></el-form-item
        >
        <el-form-item prop="raccount">
          <el-input v-model="formLabelAlign.raccount" placeholder="昵称:" />
        </el-form-item>
        <el-form-item prop="rpassword">
          <el-input
            v-model="formLabelAlign.rpassword"
            placeholder="密码:"
            type="password"
          />
        </el-form-item>
        <el-form-item prop="endPassword">
          <el-input
            v-model="formLabelAlign.endPassword"
            placeholder="确认密码:"
            type="password"
          />
        </el-form-item>
        <el-form-item>
          <el-button size="large" @click="Forml(forml)"  >注册 </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script  setup>
import {getData} from '@/utils/getSubitem'
import {encryption,decrypt} from '@/utils/jsencrypt'
import { onBeforeMount, reactive, ref, watch, inject } from "vue";
import { useRouter, useRoute } from "vue-router";
import { userStore } from "@/store/data";
import { ElMessage } from "element-plus";
const store = userStore();
const $axios = inject("$axios");

const route = useRoute();
const router = useRouter();
const radio = ref("signin");
const arr = ref([]);
const form = ref();
const forml = ref();
watch(router.currentRoute, () => {
  radio.value = route.query.l;
});

const formLabelAlign = reactive({
  account: "",
  password: "",
  raccount: "",
  rpassword: "",
  endPassword: "",
});
const Form = async (formEl) => {
  if (!formEl) return;

  await formEl.validate((valid, fields) => {
    if (valid) {
      zb();
    } else {
      return formEl.resetFields();
    }
  });
};
const Forml = async (formEl) => {
  if (!formEl) return;

  await formEl.validate((valid, fields) => {
    if (valid) {
      creData();
    } else {
      return formEl.resetFields();
    }
  });
};
const rules = reactive({
  account: [
    { required: true, message: "账号不能为空！", trigger: "blur" },
    { min: 1, max: 12, message: "账号长度需要1-12字符!", trigger: "blur" },
  ],
  password: [
    { required: true, message: "密码不能为空！", trigger: "blur" },
    { min: 4, max: 12, message: "密码长度需要4-12字符!", trigger: "blur" },
  ],
});
const rulesl = reactive({
  raccount: [
    { required: true, message: "昵称不能为空！", trigger: "blur" },
    { min: 1, max: 12, message: "昵称长度需要1-12字符!", trigger: "blur" },
  ],
  rpassword: [
    { required: true, message: "密码不能为空！", trigger: "blur" },
    { min: 4, max: 12, message: "密码长度需要4-12字符!", trigger: "blur" },
  ],
  endPassword: [
    { required: true, message: "密码不能为空！", trigger: "blur" },
    { validator: verify(), trigger: "blur" },
  ],
});
function verify() {
  return (rule, value, callback) => {
    if (formLabelAlign.rpassword != value) {
      callback(new Error("两次密码不一致！"));
    } else {
      callback();
    }
  };
}
onBeforeMount(() => {
  // store.loginOut();
  getData()
  radio.value = route.query.l;
});
function signin() {
  router.push("/login?l=signin");
}
function register() {
  router.push("/login?l=register");
}

async function zb() {
  store.loginOut();
  const username = formLabelAlign.account;
  const password = encryption(formLabelAlign.password)
  const change = radio.value;
  const { data } = await $axios.post("/login", { change, username, password });
  if (data != "error") {
    // console.log(data[0]);
    const v = route.query.r;
    ElMessage({
      showClose: true,
      message: "登录成功!",
      type: "success",
    });
    window.sessionStorage.setItem("token", data.token);
    store.setLoginData(data.data);
    // console.log(window.sessionStorage.getItem("returnUrl"));
    if(v!=''&&v!=null){
      return router.push(v)
    }else{
      return router.push("/home");
    }
    
  }
  return ElMessage({
    showClose: true,
    message: "登录失败!请检查账号密码",
    type: "error",
  });
}
async function creData() {
  store.loginOut();
  const username = formLabelAlign.raccount;
  const password = encryption(formLabelAlign.rpassword)
  const change = radio.value;
  const { data } = await $axios.post("/register", {
    change,
    username,
    password,
  });
  formLabelAlign.account = data.id
  formLabelAlign.password = formLabelAlign.rpassword
  zb()
  // router.push("/home");
  return ElMessage({
    showClose: true,
    message: "注册成功",
    type: "success",
  });
}
</script>
<style scoped>
.rwa {
  margin-top: 50px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.rwa .contain {
  width: 600px;
  height: 100%;
}
.el-button {
  width: 100%;
  background-color: #ffbd98;
}
</style>
