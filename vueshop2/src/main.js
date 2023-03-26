import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import elementui from 'element-plus'

import store from '@/store/index'

import axios from '@/axios/index'


import 'element-plus/dist/index.css'
import '@/assets/css/reset.css'


const app = createApp(App)
app.provide('$axios', axios)
app.use(store).use(router).use(elementui).mount('#app')