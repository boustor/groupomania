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
    path: '/addUser',
    name: 'AddUser',
    component: () =>
        import('../views/AddUser.vue')
},
{
    path: '/listeMessages',
    name: 'ListeMessages',
    component: () =>
        import('../views/ListeMessages.vue'),
    meta: { requireAuth: true }
},
{
    path: '/message/:id',
    name: 'Message',
    component: () =>
        import('../views/Message.vue'),
    props: true,
    meta: { requireAuth: true }

},
{
    path: '/utilisateurs',
    name: 'Utilisateurs',
    component: () =>
        import('../views/Utilisateurs.vue'),
    meta: { requireAuth: true }
}
]



const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        const token = localStorage.getItem('userToken');
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        };
        fetch("http://localhost:3000/api/auth/ctrlToken", requestOptions)
            .then((control) => control.json())
            .then((control) => {
                if (control.messErr == "Etoken") {
                    next({ name: 'Login' });
                } else {
                    next();
                }
                
            });
    } else {
        next();
    }
});

export default router