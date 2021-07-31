import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue3-cookies'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEdit, faTrash)

createApp(App)
.use(router)
.use(VueCookies)
.component("font-awesome-icon", FontAwesomeIcon)
.mount('#app')

