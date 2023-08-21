import { createApp }  from 'vue'
import * as ElementPlusIconsVue  from '@element-plus/icons-vue'
import store from '@/stores'
import router from './router'

import App from './App.vue'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
//多个element组件引入进来
for(const [key,component] of Object.entries(ElementPlusIconsVue)){
     //打印
     //console.log(ElementPlusIconsVue)
     app.component(key,component)
}

//console.log(import.meta.env)