import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import './registerServiceWorker'
import axios from 'axios'
import Plugin from 'v-fit-columns';
import 'element-plus/theme-chalk/el-message.css';

const app = createApp(App)
app.use(Plugin).use(ElementPlus)
app.config.globalProperties.$axios = axios

app.mount('#app')
