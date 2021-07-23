import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Adduser from '../views/AddUser.vue'

const routes = [{
    path: '/',
    name: 'Login',
    component: Login
},
{
    path: '/listeMessages',
    name: 'ListeMessages',
    component: () =>
        import('../views/ListeMessages.vue')
},
{
    path: '/message',
    name: 'Message',
    component: () =>
        import('../views/Message.vue')

},
{
    path: '/addUser',
    name: 'AddUser',
    component: Adduser
}
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router