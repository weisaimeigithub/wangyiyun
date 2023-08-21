<template>
    <div class="seach_box">
        <div class="search_header">
            <h1 class="keyFont">{{searchData.keywords}}</h1>
            <span>{{total}} 结果</span>
        </div>
        <div class="search_main">
            <el-tabs  v-model="activeName"  class="demo-tabs"   @tab-click="handleClick">
               <el-tab-pane  label="热门歌曲"  :name="TABSTYE.HOTSONG">
                   <Table   :table-data="searchList"   :total="total"  @change-page="changepage"></Table>
               </el-tab-pane>
               <el-tab-pane  label="歌单"  :name="TABSTYE.SONGLIST">
                    <div class="mv_list">
                         <div class="recommend-music"  v-for="item in songListData?.playlists"   :key="item.id"  @click="goSongListDetail(item)">
                               <img :src="item.coverImgUrl" alt="">
                               <div>{{item.name}}</div>
                         </div>
                    </div>
               </el-tab-pane>
               <el-tab-pane  label="MV"  :name="TABSTYE.MV">
                    <div class="mv_list">
                        <div class="recommend-music"   v-for="item in MVLIST?.mvs"  :key="item.id"  @click="goMV(item)">
                            <img :src="item.cover" alt="" />
                            <div>{{item.name}}</div>
                        </div>
                    </div>
               </el-tab-pane>
               <el-tab-pane  label="专辑">
                    <div class="mv_list">
                        <div class="recommend-music"  v-for="item in albumList?.albums"  :key="item.id"  @click="goAlbum(item)">
                             <img :src="item.blurPicUrl" alt="">
                             <div>{{ item.name }}</div>
                        </div>
                    </div>
               </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted,ref,onUpdated } from "vue"
import { TabsPaneContext, uploadDraggerProps  } from "element-plus"
import Table  from "@/components/Table.vue"
import { useRoute,useRouter } from "vue-router"
import { SearchDataType } from "@/type"
import { searchApi } from '@/api/search'
import dayjs from 'dayjs'

type TABSTYPE = {
    HOTSONG:number
    SONGLIST:number
    MV:number
    ALBUM:number
}

const router = useRouter()
const activeName = ref<number>(1)
const TABSTYE = ref<TABSTYPE>({
    HOTSONG:1,
    SONGLIST:1000,
    MV:1004,
    ALBUM:10
})

const route = useRoute()
const searchData = ref<SearchDataType>({
     keywords:'',
     offset:1,
     type:1
})

const songListData = ref<any>()
const MVlist = ref<any>()
const albumList = ref<any>()
const searchList = ref<Array<any>>()
const total = ref<number>()
onMounted(()=>{
    console.log(route.params)
    Object.assign(searchData.value,route.params)
    getSearchList()
})

onUpdated(() => {
    Object.assign(searchData.value,route.params)
    getSearchList()
})

const getSearchList = async () => {
    const res = (await searchApi(searchData.value)) as any
    if(searchData.value.type === TABSTYE.value.HOTSONG){
        searchList.value = res.result.songs.map(item => {
            return {
                id:item.id,
                name:item.name,
                al:item.al,
                ar:item.ar,
                publishTime:dayjs(item.dt).format('mm:ss')
            }
        })
        total.value=res.result.songCount
    }else if(searchData.value.type === TABSTYE.value.SONGLIST){
        songListData.value = res.result 
    }else if(searchData.value.type === TABSTYE.value.MV){
        MVlist.value = res.result
    }else if(searchData.value.type === TABSTYE.value.ALBUM){
        albumList.value = res.result
    }
}

const changepage = (size) => {
     searchData.value.offset = size
     getSearchList()
}

const handleClick = (tab:TabsPaneContext,event:Event) => {
    searchData.value.type = tab.paneName
}

const goMV = (row) => {
    router.push(`/ContainerMainVideo/mv/${row.name}/${row.id}`)
}

const goSongListDetail = (row) => {
    router.push(`/SearchList/AlbumList/${row.id}`)
}

const goAlbum = (row) => {
    router.push(`/SearchList/AlbumList/${row.id}`)
}
</script>
<style scoped lang="less">
.search_box {
  height: 100%;
  .search_header {
    height: 10%;
    // background-color: aqua;
    margin: 10px 10px 10px 0;
    .keyFont {
      font-size: 30px;
    }
    span {
      color: #525b72;
      font-size: 14px;
    }
  }
  .search_main {
    height: 85%;
    margin-right: 10px;
  }
}
:deep(.el-tabs__nav-wrap::after) {
  background-color: transparent;
}
.mv_list {
  width: 100%;
  // max-height: 450px;
  display: flex;
  flex-wrap: wrap;
  // overflow-x: auto;
}
.mv_list::-webkit-scrollbar {
  display: none;
}
:deep(.el-tabs) {
  height: 95% !important;
  overflow-x: auto !important;
}

:deep(.el-tabs)::-webkit-scrollbar {
  display: none;
}
</style>
