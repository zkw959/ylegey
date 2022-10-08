import { RouteRecordRaw } from "vue-router";


export default [
    {
        path:'/',
        component:() => import('@/pages/indexPage.vue')
    },
    {
        path:'/game',
        component:() => import('@/pages/gamePage.vue')
    },
    {
        path:'/custom',
        component:() => import('@/pages/customPage.vue')
    }
] as RouteRecordRaw[];