<template>
  <el-row>
    <el-form  inline label-width="50px">
      <el-form-item label="省份:" prop="province">
        <el-select
          v-model="provinceValue"
          placeholder="请选择"
          @change="selectProvince"
          style="width: 120px"
          size="small"
        >
          <el-option
            v-for="(item, index) of provincearr"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市:" prop="city">
        <el-select
          v-model="cityValue"
          placeholder="请选择"
          @change="selectcity"
          style="width: 120px"
          size="small"
        >
          <el-option
            v-for="(item, index) of cityarr"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地区:" prop="country">
        <el-select
          v-model="RegionValue"
          placeholder="请选择"
          @change="selectCountry"
          style="width: 120px"
          size="small"
        >
          <el-option
            v-for="(item, index) of regionarr"
            :key="index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-row>
</template>
<script>
import { province } from "@/utils/map";
import { userStore } from "@/store/data";
const store = userStore();

export default {
  created() {
    this.provincearr = province;
  },
  data() {
    return {
      province: [],
      cityarr: [],
      regionarr: [],
      provinceValue: "",
      cityValue: "",
      RegionValue: "",
      selectData:{
        province:'',
        city:'',
        region:''
      }
    };
  },
  mounted() {},
  methods: {
    selectProvince(id) {
      this.cityarr = [];
      this.regionarr = [];
      this.cityValue = "";
      this.RegionValue = "";
      for (let item of this.provincearr) {
        if (id == item.id) {
          this.cityarr = item.children;
          this.selectData.province = item.name
        }
      }
    },
    selectcity(id) {
      this.regionarr = [];
      this.RegionValue = "";
      for (let item of this.cityarr) {
        if (id == item.id) {
          this.regionarr = item.children;
          this.selectData.city = item.name
        }
      }
    },
    selectCountry(id) {
    //   this.RegionValue = "";
      for (let item of this.regionarr) {
        if (id == item.id) {
          // console.log(item.name, "-所选区域");
          this.selectData.region = item.name
          store.setUserCity(this.selectData.province+'-'+this.selectData.city+'-'+this.selectData.region);
        }
      }
    },
  },
};
</script>

