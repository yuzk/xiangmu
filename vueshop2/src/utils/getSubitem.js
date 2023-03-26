import { userStore } from "@/store/data";
import { inject } from "vue";

async function getData() {
    const store = userStore()
    const $axios = inject("$axios")
    let fitem = [];
    const { data } = await $axios.get("/getSubItem");
    // console.log(data);
    for (const iterator of data) {
      if (iterator.src == null) {
        if (iterator.child != null) {
          fitem.push(iterator);
        }
      }
    }
    for (const iterator of fitem) {
      if (iterator.child.indexOf != -1) {
        iterator.child = iterator.child.split(",");
      }
      for (let i = 0; i < iterator.child.length; i++) {
        const { data } = await $axios.post("/getSubItem", {
          id: iterator.child[i],
        });
  
        iterator.child[i] = data[0];
      }
    }
  
    store.setSubitem(fitem);
  }
  export {getData}