<template>
<bounce-ball></bounce-ball>
  <div :class="ka ? 'top headTop' : 'top'">
    <div class="dropdown">
      <dropdown></dropdown>
    </div>
  </div>
  <div class="anima">
    <router-view></router-view>
  </div>
  <div>
    <fitem></fitem>
  </div>
</template>

<script setup>

import { defineAsyncComponent,onBeforeMount,onUnmounted, onMounted} from "@vue/runtime-core"
const dropdown = defineAsyncComponent(() =>
  import("@/components/dropdown.vue")
);
// import dropdown from '@/components/dropdown.vue'
const fitem = defineAsyncComponent(() => import("@/components/fitem.vue"));
// import fitem from '@/components/fitem.vue'
import bounceBall from '@/utils/bounceBall.vue'
import {getData} from '@/utils/getSubitem'
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const ka = ref(false);
function ks() {
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollTop > 0) {
    ka.value = true;
  } else {
    ka.value = false;
  }
}
onBeforeMount(() => {
  window.addEventListener('scroll', ks)
});onUnmounted(() => {
  window.addEventListener("scroll", ks);
});

</script>

<style >
html,
body,
#app {
  width: 100%;
  font-size: 14px;
}
body::-webkit-scrollbar {
  display: none;
}
@keyframes kk {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
.headTop {
  position: fixed;
  top: 0px;
  z-index: 999;
  animation: kk 1s;
}
.top {
  width: 100%;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
}
.top .dropdown {
  width: 1336px;
  height: 42px;
  line-height: 42px;
}
@keyframes anima {
  0% {
    opacity: 0;
    transform: translateY(20%);
  }
  70% {
    opacity: 0.1;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
}
.anima {
  animation: anima 3s;
}
</style>
