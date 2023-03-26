<template>
  <div class="footer">
    <div class="center">
      <div class="txt">
        <p class="contain">公司：江西小善大爱</p>
        <p class="contain">电话：19179987388</p>
        <p class="contain">全国加盟热线：400-0799-883</p>
        <p class="contain">总部地址：江西省萍乡市安源区朝阳中路小善大爱文化大院</p>
      </div>
      <div class="pic">
        <div class="contain" @click="goditu"></div>
      </div>
    </div>
    <p class="contain">微心愿商城&copy;版权所有</p>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
function join() {
  router.push("/join");
}
function goditu(){
  window.open('https://map.baidu.com/search/%E5%B0%8F%E5%96%84%E5%A4%A7%E7%88%B1%E6%96%87%E5%8C%96%E5%A4%A7%E9%99%A2/@12674399.815,3185730.47,19z?querytype=s&da_src=shareurl&wd=%E5%B0%8F%E5%96%84%E5%A4%A7%E7%88%B1%E6%96%87%E5%8C%96%E5%A4%A7%E9%99%A2&c=350&src=0&wd2=%E8%90%8D%E4%B9%A1%E5%B8%82%E5%AE%89%E6%BA%90%E5%8C%BA&pn=0&sug=1&l=13&b=(12646704,3173240;12708144,3204248)&from=webmap&biz_forward=%7B%22scaler%22:1,%22styles%22:%22pl%22%7D&sug_forward=751864e0882a2d1681a12edf&device_ratio=1')
}
</script>

<style scoped>
.footer {
  margin-top: 10px;
  width: 100%;
  height: 270px;
  background: linear-gradient(45deg,#fef4f7,skyblue);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 10px;
}
.footer .center {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.footer .center .txt {
  flex: 1;
  padding-left: 65px;
  padding-top: 100px;
}
.footer .center .txt .contain,
.footer .contain {
  font-size: 20px;
}
.footer .center .pic{
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 47px;
  margin-bottom: -10px;

}
.footer .center .pic .contain{
  width: 400px;
  height: 220px;
  background-image: url('@/static/ditu-1.png');
  background-size: 100% 100%;
  border-radius: 6px;
  cursor: pointer;

}
</style>