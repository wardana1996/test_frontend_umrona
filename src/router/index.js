import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'posts.index',
        component: () => import('@/Index.vue')
    },
    {
        path: '/create',
        name: 'posts.create',
        component: () => import('@/Create.vue')
    },
    {
        path: '/edit/:id',
        name: 'posts.edit',
        component: () => import('@/Edit.vue')
    },
    {
        path: '/detail/:id',
        name: 'posts.detail',
        component: () => import('@/Detail.vue')
    }
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes  
})

export default router