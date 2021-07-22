import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Adduser from '../views/AddUser.vue'

const routes = [{
    path: '/',
    name: 'Login',
    component: Login
},
{
    path: '/home/:ecran/:data/',
    name: 'Home',
    component: Home,
    props:true
},
{
    path: '/addUser',
    name: 'AddUser',
    component: Adduser
}
/*
,
{
    path: '/messages',
    name: 'Messages',
    component: () =>
        import('../components/ListeMessages.vue')
},
{
    path: '/message',
    name: 'Message',
    props:true,
    component: () =>
        import('../components/Message.vue')
        
}
*/
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router