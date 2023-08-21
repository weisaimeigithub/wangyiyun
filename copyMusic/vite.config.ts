// import { firleURLToPath,URL} from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import  Components  from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver }  from 'unplugin-vue-components/resolvers'
import { fileURLToPath } from 'url'

export default defineConfig({
    base:'/',
    server:{
        host:'0.0.0.0',
        port:8787,
        open:true
    },

    plugins:[
        vue(),
        vueJsx(),
        AutoImport({
            resolvers:[
                ElementPlusResolver(),
                //自动导入图标组件
                IconResolver({
                    prefix:"Icon"
                })
            ]
        }),

        Components({
            resolvers:[
                 ElementPlusResolver(),
                 //自动导入图标组件
                 IconResolver({
                    prefix:'Icon'
                 })
            ]
        }),

        Components({
            resolvers:[
                ElementPlusResolver(),
                //自动注册图标组件
                IconResolver({
                    enabledCollections:['ep']
                })
            ]
        }),

        Icons({
            autoInstall:true
        })
    ],

    resolve:{
        alias:{
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})