<template>

    <div class="d" v-for="item in store.hotGoods" :key="item">
      <div class="dd">
        <div class="top">
          <div
            style="cursor: pointer; margin-right: 5px"
            class="gengduo"
            @click="more(item[Object.keys(item)[0]][[0]].classify)"
          >
            更多
          </div>
        </div>
        <div class="bottom">
          <div class="left">
            <div>
              <img
                :src="item[Object.keys(item)[0]][[0]].src"
                alt=""
                v-if="item[Object.keys(item)[0]][[0]]"
                @click="clickimg(item[Object.keys(item)[0]][[0]].id)"
              />
            </div>
          </div>
          <div class="right">
            <ul>
              <li v-for="i in item[Object.keys(item)[0]].slice(1, 7)" :key="i">
                <div class="img" @click="clickimg(i.id)">
                  <img :src="i.src" alt="" />
                </div>
                <div class="txt">
                  <div>
                    <div
                      style="
                        width: 100%;
                        height: 100%;
                        line-height: 48px;
                        color: #ff6b00;
                        font-size: 16px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                      "
                    >
                      {{ i.dec }}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

</template>

<script setup>
import { userStore } from "@/store/data";
import { onBeforeMount } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { inject } from "vue";
const $axios = inject("$axios");
const router = useRouter();
const store = userStore();

onBeforeMount(() => {
  aa();
});
async function aa() {
  const { data } = await $axios.get("/hotGoods");
  // console.log(data);
  for (let i = 0; i < data.length; i++) {
    //一半静态一半动态可以，完全动态不行，如require（‘路径前缀’+ 变量（文件名.后缀））
    // require（动态）报错
    // - 0 -
    data[i].src = require("@/static/" + data[i].src);
  }
  // console.log(data, "dfsf");
  // let ndata = [];
  // let str = ["sj", "dn", "sh"];
  // let temp = data;
  // let i = 0;

  let ndata = [];
  let myOrderedArray = data.reduce((accumulator, currentValue) => {
    if (
      accumulator.indexOf(currentValue.classify) === -1 &&
      currentValue.classify != "m" &&
      currentValue.classify != "fm"
    ) {
      accumulator.push(currentValue.classify);
    }
    return accumulator;
  }, []);
  for (const item of myOrderedArray) {
    ndata.push({ [item]: [] });
  }
  for (const index in ndata) {
    // console.log(ndata[index][Object.keys(ndata[index])[0]].push());
    for (const item of data) {
      if (item.classify == Object.keys(ndata[index])[0]) {
        ndata[index][Object.keys(ndata[index])[0]].push(item);
      }
    }
  }
  // console.log(ndata);
  store.setHotGoods(ndata);
  // console.log(store.hotGoods);
  // for (i; i < Math.floor(data.length / 7); i++) {
  //   temp = temp.slice(7 * i + 1, 7 * (i + 1) + 1);
  //   ndata[i] = { [str[i]]: temp };
  //   temp = data;
  //   // console.log(i);
  // }
  // if (data.length % 7 != 0) {
  //   temp = temp.slice(7 * i);
  //   ndata[i] = { [str[i]]: temp };
  // }
  // console.log(ndata, " s");
  // // console.log(ndata);
  // store.setHotGoods(ndata);
}

function clickimg(id) {
  if (!id) {
    router.push("/home");
  }
  router.push("/detail?a=" + id);
}
function more(item) {
  //形参item为大类别闯入
  //更多数据请求另一个接口
  // console.log(item);
  router.push("/goods?c=" + item);
}
</script>

<style scoped>
.gengduo {
  background-image: url("../static/bitlogo.jpg");
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.d {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
}
.d .dd {
  margin-top: 5px;
  width: 1336px;
  height: 670px;
  box-sizing: border-box;
}
.d .dd .top {
  width: 1336px;
  height: 30px;
  display: flex;
  justify-content: flex-end;
}
.d .dd .top h2 {
  font-size: 14px;
  color: #747679;
}
.d .dd .bottom {
  width: 1336px;
  height: 640px;
  box-sizing: border-box;
  background-color: #fff;
}
.d .dd .bottom .left {
  width: 260px;
  height: 640px;
  float: left;

  border-radius: 6px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.d .dd .bottom .left div {
  width: 250px;
  height: 620px;
  border-radius: 6px;
  overflow: hidden;
}
.d .dd .bottom .left div img {
  width: 100%;
  height: 100%;
}

.d .dd .bottom .right {
  width: 1066px;
  height: 640px;
  float: left;
  box-sizing: border-box;

  margin-top: 20px;
}
.d .dd .bottom .right ul {
  width: 100%;
  height: 100%;
  padding-bottom: 5px;
  box-sizing: border-box;
}
.d .dd .bottom .right ul li {
  float: left;
  list-style: none;
  width: 30%;
  height: 290px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin-left: 30px;
  margin-bottom: 36px;
  overflow: hidden;
  background-clip: content-box;
  border-radius: 6px;
}

.d .dd .bottom .right ul li:hover,
.d .dd .bottom .left:hover {
  box-shadow: 0 0 5px rgb(223, 59, 9);
}
.d .dd .bottom .right ul li:hover img,
.d .dd .bottom .left:hover img {
  transform: scale(1.05);
  transition: ease 0.5s;
  box-sizing: border-box;
}
.img {
  width: 250px;
  height: 220px;
  background-color: rgb(177, 100, 55);
  overflow: hidden;
  border-radius: 6px;
  box-sizing: border-box;
}
.txt {
  width: 319px;
  height: 49px;
}
.txt h1 {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>