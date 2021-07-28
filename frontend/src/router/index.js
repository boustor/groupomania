import { createRouter, createWebHistory } from 'vue-router'
//import Login from '../views/Login.vue'
//import Adduser from '../views/AddUser.vue'

const routes = [{
    path: '/',
    name: 'Login',
    component: () =>
    import('../views/Login.vue')
},
{
    path: '/listeMessages',
    name: 'ListeMessages',
    component: () =>
        import('../views/ListeMessages.vue')
},
{
    path: '/message/:id',
    name: 'Message',
    component: () =>
        import('../views/Message.vue'),
    props:true

},
{
    path: '/addUser',
    name: 'AddUser',
    component: () =>
    import('../views/AddUser.vue')
},
{
    path: '/utilisateurs',
    name: 'Utilisateurs',
    component: () =>
    import('../views/Utilisateurs.vue')
}
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router