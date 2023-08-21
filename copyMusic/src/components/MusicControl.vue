<template>
    <div class="music-control">
        <div class="music-text">
            <div class="music-logo">
                <!-- 生产模式这样引入 -->
                <img :src="musicDetail?.al?.picUrl ? musicDetail?.al?.picUrl : musicImg" alt="">
            </div>
            <div class="music-name">
                <p  style="font-size:18px">
                   {{musicDetail?.name?musicDetail?.name:'Hello Word'}}
                </p>
                <p  style="font-size:14px;" color="rgb(57,144,157)">
                    {{musicDetail?.ar?.[0]?.name?musicDetail?.ar?.[0]?.name:'computer'}}
                </p>
            </div>
        </div>
        <aplayer  @music-detail="getDetail"></aplayer>
        <div class="icon_box">
            <el-icon  @click="playList"><Operation /></el-icon>
        </div>
    </div>
</template>
<script  setup   lang="ts">
import {  onMounted,ref,watch}  from 'vue'
import aplayer from '../components/Audio.vue'
import { musicStore } from '@/stores/music';
//生产模式这样引入
import musicImg from '@/assets/images/OpticalDisk.png'
import { some } from 'lodash';

const props = defineProps({
    boxRef:{
        type:Object,
        default:()=>null
    }
})

const emits = defineEmits(['musicArr'])
const store = musicStore()
const musicDetail = ref()
const historyList = ref<Array<any>>([])

onMounted(() => {
    historyList.value = store.$state.musicDetailArr
    emits('musicArr',historyList.value)
})

//监听store
watch(store,(newValue,oldValue) => {
    musicDetail.value = newValue.$state?.musicDetailArr?.[0]
    historyList.value = newValue.$state?.musicDetailArr
    emits('musicArr',historyList.value)  //watch 还有emits
})

//defineExpose
// 子组件暴露自己的属性    
//父组件获取属性
const playList = () => {
    props.boxRef.openDrawer()  //看一下这块为什么这样用
}

//接收audio传递过来的信息
const getDetail = (row) => {
    musicDetail.value = row
}
</script>
<style lang="scss" scoped>
:deep(.el-icon) {
  width: 50px !important;
  height: 50px !important;
  font-size: 24px !important;
}
.icon_box {
  width: 100%;
  cursor: pointer;
}
</style>