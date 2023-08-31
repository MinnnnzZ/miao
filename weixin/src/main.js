import './assets/main.css'
import './style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

console.log(router)

const app = createApp(App)

app.use(router)

app.mount('#app')
