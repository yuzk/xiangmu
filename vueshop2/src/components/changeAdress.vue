<template>
<el-button type="primary" size="large" @click="dialogVisible = !dialogVisible" style="width:100%;">修改地址</el-button>
<el-dialog append-to-body v-model="dialogVisible" title="修改地址" width="40%">
<div class="t3">
    <getCities></getCities>
    <el-input
      type="text"
      v-model="newValue"
      style="margin-bottom: 5px"
      placeholder="修改地址"
    />
    <el-button @click="changeAdress(newValue, $axios),dialogVisible = !dialogVisible" type="primary"
      >提交</el-button
    >
    <el-button
      @click="dialogVisible = !dialogVisible"
      type="info"
      >取消</el-button
    >
  </div>
</el-dialog>
  
</template>

<script setup>
import { defineAsyncComponent } from "@vue/runtime-core";
import { inject, ref } from "vue";
import { changeAdress } from "@/utils/changeAdress";
// import getCities from "@/components/getCity.vue";
const getCities = defineAsyncComponent(()=>import("@/components/getCity.vue"))
const dialogVisible = ref(false)
const newValue = ref("");
const $axios = inject("$axios")
</script>

<style>

</style>