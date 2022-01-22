import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element.js'
import {storeKey} from "@/symbols";

const app = createApp(App)
installElementPlus(app)
app.use(store, storeKey).use(router).mount('#app')