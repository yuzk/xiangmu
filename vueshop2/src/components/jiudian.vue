<template>

    <div class="contain">
      <div class="item" v-for="item in data" :key="item">
        <video :src="item.src" controls="true" loop></video>
        <p style="font-size: 26px; color: red">{{ item.txt }}</p>
      </div>
    </div>

</template>

<script setup>
const data = [
  {
    src: require("@/static/2-mp4.mp4"),
    txt: `7月10日,萍乡小善大爱文化大院好人消费帮扶厨房正式营业,众多爱心单位、爱心人士等纷纷起来开展消费帮扶,上演一场帮扶助力乡村振兴的感人一幕`,
  },
  {
    src: require("@/static/1-mp4.mp4"),
    txt: `7月10日,萍乡小善大爱文化大院好人消费帮扶厨房正式营业,众多爱心单位、爱心人士等纷纷起来开展消费帮扶,上演一场帮扶助力乡村振兴的感人一幕`,
  },
];
</script>

<style scoped>

.contain {
   margin-top: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.contain .item {
  width: 1336px;
}
.contain .item video {
  width: 100%;
  height: 100%;
}
</style>