<template>
  <div class="input">
    <el-input
      v-model="input"
      type="password"
      placeholder="Please input password"
      show-password
    />
    <el-button type="primary" @click="changePd">确定</el-button>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { inject, ref } from "vue";
const input = ref("");
const $axios = inject("$axios");
const changePd = async () => {
  console.log(input.value);
  const { data } = await $axios.post("/changeP", { input: input.value });
  if (data.code != "error") {
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
</script>

<style>

.input {
  width: 300px;
  height: 30px;
  margin-bottom: 5px;
}
</style>