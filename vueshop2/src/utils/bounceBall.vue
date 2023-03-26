<template>
   <div
      class="magicBox"
      ref="magicBox"
      @mousemove="stop()"
      @mouseleave="start()"
    >
      <div style="font-size: 38px; color: white">
        <p>小善大爱全国产业链加盟招商中,联系电话:</p> 
        <p style="font-size: 40px; color: red">400-0799-883</p>
        <p style="display: flex; justify-content: flex-end">
          <a href="#" style="font-size: 40px; color: red" @click.prevent="join"> 加入我们</a>
        </p>
      </div>
    </div>
</template>

<script setup>
import {onMounted} from "@vue/runtime-core";
import {ref} from 'vue'
import { useRouter } from "vue-router";
const router = useRouter()
let magicBox = ref(null);
// const value = ref(true);

let speedx = ref(1);
let speedy = ref(1);
let x = 1;
let y = 1;
    onMounted(() => {
  // 萍乡小善大爱文化大院是大江网萍乡头条民生工作室和萍乡市红心志愿者协会联合推出的“小善大爱、助农筑梦”爱心帮扶主体工程。此工程主要是通过开展“身边人讲身边事、身
  // 边人讲自己事、身边事教育身边人”,用“身边好人”带动千家万户,让好人文化成为一种社会风尚。通过对好人文化品牌的打造,将萍乡红安源好人文化大
  // 院打造成弘扬好人精神、培育好人文化、厚植好人沃土、筑造道德高地的好人文化示范点,带动更多人开展产业帮扶,对因病、因灾、突发返贫进行大力帮扶

  // const stylee = getComputedStyle(magicBox.value, null);

  // console.log(stylee);
  // console.log(magicBox.value.offsetLeft);
  // magicBox.value.style.top = parseInt(stylee["top"]) + 100 + "px";

  // start(stylee, magicBox.value.style);
  began(magicBox.value);

  function began(magicBox) {
    const t = setInterval(() => {
      start(magicBox);
    }, 10);
  }
  function start(magicBox) {
    let l = magicBox.offsetLeft + speedx.value;
    let t = magicBox.offsetTop + speedy.value;
    if (l >= document.body.clientWidth - magicBox.offsetWidth) {
      speedx.value *= -1;
      l = document.body.clientWidth - magicBox.offsetWidth;
    } else if (l <= 0) {
      speedx.value *= -1;
      l = 0;
    }
    if (t >= document.body.clientHeight - magicBox.offsetHeight) {
      speedy.value *= -1;
      t = document.body.clientHeight - magicBox.offsetHeight;
    } else if (t <= 0) {
      speedy.value *= -1;
      t = 0;
    }
    magicBox.style.left = l + "px";
    magicBox.style.top = t + "px";
  }
});
function join (){
  router.push("/join/join")
}
function stop() {
  speedy.value = 0;
  speedx.value = 0;
}
function start() {
  speedy.value = Math.random()>=0.5?1:-1;
  speedx.value = Math.random()>=0.5?1:-1;
}
</script>

<style>
.magicBox {
  position: absolute;
  width: 380px;
  height: 330px;
  background: linear-gradient(
    to bottom,
    rgba(51, 8, 153, 0.9),
    rgba(19, 21, 165, 0.8)
  );
  border-radius: 5px;
  box-shadow: 0px 0px 5px;
  z-index: 1000;
}
</style>