import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/LoginUser.vue')
    },
    {
        path: '/CreateUser',
        name: 'CreateUser',
        component: () =>
            import ('../views/CreateUser.vue')
    },
    {
        path: '/Messages',
        name: 'Messages',
        component: () =>
            import ('../views/Messages.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import ('../views/About.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router