"use strict";(self["webpackChunkvueshop2"]=self["webpackChunkvueshop2"]||[]).push([[249],{4249:function(e,s,a){a.r(s),a.d(s,{default:function(){return c}});var o=a(3396),u=a(7178),t=a(4870);const n={class:"input"},l=(0,o.Uk)("确定");var r={__name:"changeP",setup(e){const s=(0,t.iH)(""),a=(0,o.f3)("$axios"),r=async()=>{console.log(s.value);const{data:e}=await a.post("/changeP",{input:s.value});if("error"!=e.code)return(0,u.z8)({showClose:!0,message:"修改成功!",type:"success"});(0,u.z8)({showClose:!0,message:"修改失败!",type:"error"})};return(e,a)=>{const u=(0,o.up)("el-input"),t=(0,o.up)("el-button");return(0,o.wg)(),(0,o.iD)("div",n,[(0,o.Wm)(u,{modelValue:s.value,"onUpdate:modelValue":a[0]||(a[0]=e=>s.value=e),type:"password",placeholder:"Please input password","show-password":""},null,8,["modelValue"]),(0,o.Wm)(t,{type:"primary",onClick:r},{default:(0,o.w5)((()=>[l])),_:1})])}}};const p=r;var c=p}}]);