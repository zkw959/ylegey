import { createApp } from 'vue'
import { Button } from "ant-design-vue";
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory} from 'vue-router'
import routes from './router/index'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// import "ant-design-vue/dist/antd.css";

// 创建路由
const router = createRouter({
    history: createWebHistory(),
    routes
})

// pinia状态管理
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App).use(Button).use(router).use(pinia).mount('#app')
