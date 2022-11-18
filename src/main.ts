import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory} from 'vue-router'
import routes from './router/index'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// import "ant-design-vue/dist/antd.css";

// 创建路由
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// pinia状态管理
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App).use(router).use(pinia).mount('#app')
