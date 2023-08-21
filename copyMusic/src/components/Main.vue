<template>
   <div class="container">
      <div class="main">
         <div class="header">
            <div class="header-left">
               <img src="" alt="" />
            </div>
            <div class="header-right">
               <div class="indicator_box">
                  <label class="indicator_box_label"  @click="router.back()"></label>
                  <label @click="router.forward()">
                    <el-icon><ArrowRightBold></ArrowRightBold></el-icon>
                  </label>
               </div>
               <div class="search"  @keyup.enter="search">
                  <el-input  v-model="searchObj.keywords"  placeholder="搜索歌曲，艺术家等...." clearable>
                      <label  @click="search">
                           <el-icon  color="#ffff"  style="vertical-align: middle;">
                               <Search />
                           </el-icon>
                     </label>
                  </el-input>
               </div>
            </div>
         </div>
         <ContainerMain />
         <Drawer  ref="DrawerRef"  :history-list="historyMusicList"/>
         <MusicControl :box-ref="DrawerRef"   @music-arr="getHistoryMusicList"  />
      </div>
   </div>
</template>
<script  setup lang="ts">
import {  ref,provide } from 'vue'
import { useRouter } from 'vue-router';
import ContainerMain from '../pages/ContainerMain.vue'
import MusicControl  from './MusicControl.vue';
import { SearchDataType } from "@/type";
import Drawer from "@/components/Drawer.vue";
import { ArrowRightBold } from '@element-plus/icons'; //element里有很多icon
import { deepEqual } from 'assert';
import { NONAME } from 'dns';
// 声明类型 写的过程中改变变量类型
let searchObj = ref<SearchDataType>({
   keywords:''
})
let historyMusicList = ref<Array<any>>([]) //声明数组
const DrawerRef = ref()

const router = useRouter()

//可以这样写组件
const search = () => {
   if(searchObj.value.keywords === '')  return
   router.push({
      path:`/SearchList/${searchObj.value.keywords}`
   })
}

const getHistoryMusicList = (list) => {
   //使用 new set进行数组去重防止重复添加歌曲
   historyMusicList.value = [...new Set(list)]
}

</script>
<style lang="less" scoped>
:deep(.el-input) {
  .el-input__wrapper {
    background-color: transparent !important;
    box-shadow: none !important;
  }
  width: 85%;
  height: 80%;
  margin: 5px 10px;
  outline: none;
}
</style>