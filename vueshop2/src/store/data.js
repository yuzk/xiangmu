import { defineStore } from "pinia";

export const userStore = defineStore({
    id: 'user',
    state: () => {
        return {
            returnUrl:'',
            couponAmount:'',
            userCity:'',
            UserOrder:[],
            coupon:[],
            useCoupon:'',
            useCouponMoney:0,
            dataa:[],
            carouselI:[],
            subitem:[],
            loginData:[],
            userGood:[],
            categoryGoods: [],
            hotGoods: [],
            goods: [],
            carData: [],
            outTradeNo:'',
            ww:''
        }
    },
    actions: {
        // //登录跳转地址
        // setReturnUrl(data){
        //     this.returnUrl = data
        // },
        //优惠券金额
        setCouponAmount(data){
            this.couponAmount = data
        },
        //地址选择区域
        setUserCity(data){
            this.userCity = data
        },
        //设置支付网址
        setWw(data){
            this.ww = data
        },
        //个人订单
        setUserOrder(data){
            this.UserOrder = data
        },
        //使用的优惠券（设计一张）
        setUseCoupon(data){
            this.useCoupon = data
        },
        //使用优惠券的金额
        setUseCouponMoney(data){
            this.useCouponMoney = data
        },

        //优惠券信息
        setCoupon(data){
            this.coupon = data
        },
        //所有订单
        setDataa(data){
            this.dataa = data
        },

        //订单号
        setoutTradeNo(data){
            this.outTradeNo = data
        },

        //轮播图图片
        setCarouselI(data){
            this.carouselI = data
        },
        //subitem信息
        setSubitem(data){
            this.subitem=data
        },
        //登录信息
        setLoginData(data){
            this.loginData = data
        },
        //当前商品信息
        setUserGood(data){
            this.userGood =data
        },
        //设置类别商品
        setCategoryGoods(data) {
            this.categoryGoods = data
        },
        //热门商品（6个）
        setHotGoods(data) {
            this.hotGoods = data
        },
        //全部商品
        setGoods(data) {
            this.goods = data
        },
        //设置购物车数据
        setCarData(data) {
            this.carData = data
        },
        //登出
        loginOut() {
            // this.returnUrl = ''
            this.couponAmount = ''
            this.useCouponMoney = 0
            this.userCity = ''
            this.ww = ''
            this.UserOrder = []
            this.useCoupon=''
            this.coupon = []
            this.dataa = []
            this.carouselI = []
            // this.subitem = []
            this.loginData = []
            this.userGood=[],
            this.categoryGoods,
            this.hotGoods= [],
            this.goods= [],
            this.carData= []
            this.outTradeNo = ''
            sessionStorage.clear()
            localStorage.clear()
        }
    },
    getters: {
        //计算总金额(前端展示，点击购买按钮后，向后端发起相应请求，参数为数量和每个商品单价，后端再次计算总价并生成订单。)
        totalM(state) {
            const m = Math.pow(10,10)
            let total = 0
            for (let index = 0; index < state.carData.length; index++) {
                total += state.carData[index].num * state.carData[index].price
            }
            const useCoupon = state.useCouponMoney
            return (total*m - useCoupon*m)/m
        },
        finallyAdress(state){
            // console.log(state.userCity+state.loginData.dress,'    fd');
            return state.userCity + state.loginData.dress
        }
    },
    persist: {
                storage: sessionStorage,
                paths:['carouselI','subitem','loginData','userGood','categoryGoods','hotGoods','goods','carData','outTradeNo']
            }
        
    
})