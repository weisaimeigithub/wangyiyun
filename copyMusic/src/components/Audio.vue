<template>
    <div class="bg-blur">
        <div id="player">
            <audio  :src="musicUrl"   ref="playRef"  autoplay  @ended="musicOver"  @timeupdate="onTimeupdate"  @canplay="changeDuration"></audio>
            <!-- 控制模块 -->
            <div class="player-content2">
                <!-- 右侧歌曲操作模块 -->
                <div class="player-controls">
                    <!-- 上一首按钮 -->
                    <div class="btn  prev iconfont"  @click="outBtn">&#xe603;</div>
                    <!-- 暂停/播放 按钮 -->
                    <div  v-show="musicList?.length !==0"  class="btn play-pause  iconfont"  :class="isPlay? 'icon-24gf-playCircle' : 'icon-24gf-pauseCircle'"  @play="play"></div>
                    <div  v-show="musiclist?.length == 0"  class="btn play-pause iconfont"  :class="{ 'icon-24gf-playCircle':musicList?.length == 0}"  @click="play"></div>
                    <!-- 下一首按钮-->
                    <div class="btn  next iconfont"  @click="next">&#xe602;</div>
                </div>
                <div class="player-content1">
                    <div class="time">
                        <!-- 当前播放的时间 -->
                        <div class="current-time"></div>
                        <!-- 歌曲总时长 -->
                        <div class="total-time"></div>
                    </div>
                    <!-- 进度条 -->
                    <div class="slider_box">
                        <el-slider  v-model="playTime"  :show-tooltip="false"  size="small"  :max="sliderLength"  @change="changePlayTime" />
                             <div class="music_time">
                                <span>
                                    {{nowTime? nowTime : '00:00'}} / {{countTime ? countTime :'00:00'}}
                                </span>
                                <div class="icon_box">
                                    <div  @click="voiceButtonClick">
                                         <span  class="iconfont"  v-if="!voiceMute">&#xe6c0;</span>
                                         <span  class="iconfont"  v-else>&#xe6c0;</span>
                                    </div>
                                    <div class="voice_slider">
                                        <div class="slider_voice">
                                            <el-slider  v-model="voicePower"  :show-tooltip="false"  vertical  height="100px"  size="small"  :max="1"  :step="0.01"  #change="changeVoicePower"></el-slider>
                                        </div>
                                        <div>{{Math.floor(voicePower * 100)}}</div>
                                    </div>
                                </div>
                             </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script  setup  lang="ts">
import {  onBeforeUpdate,onMounted,ref,watch } from "vue"
import { musicStore } from "@/stores/music"
import { changeTime } from "@/utils/changeDay"
import { tr } from "element-plus/es/locale";

const emits = defineEmits(['musicDetail'])
const musicList = ref<Array<any>>([])
const musicDetailList = ref<Array<any>>([])
const musicUrl = ref<string>()
const store = musicStore()

let  isplay = ref<boolean>(true)
const playRef = ref<any>()
//现在的播放时间
const playTime = ref<number>(0.0)
//歌曲的时间长度
const playDuration = ref<number>(0.0)

//进度条长度
const sliderLength = ref<number>(100)

//总进度
const countTime = ref<number | string>()

//当前时间
const nowTime = ref<number | string>()

//是否静音
const voiceMute = ref<boolean>(false)

//音量大小
const voicePower = ref<number>(0)

//控制src
const musicCursor = ref<number>(0)

onMounted(() => {
    voicePower.value = playRef.value.volume
    //播放状态下，使播放进度自增1，以与audio内置的currentTime相匹配
    setInterval(updatePlayTimePerSecond,1000)
})

onBeforeUpdate(() => {
    if(musicList.value?.length === 0){
        playTime.value = 0.0
    }
    if(playRef.value?.paused === false ){
        isplay.value = false
    }else{
        isplay.value = true
    }
})

watch(store,(newValue,oldValue) => {
    musicList.value = [...new Set(newValue.$state.musicArrUrl)]
    musicDetailList.value = [...new Set(newValue.$state.musicDetailArr)]
    musicUrl.value = musicList.value?.[0]
    playTime.value = 0.0
    isplay.value = false
})

const play = async () => {
    isplay.value = !isplay.value
    if(isplay.value == false){
        await playRef.value.play()
    }else if(isplay.value == true){
        await playRef.value.pause()
    }
}

//播放完毕的回顾
const musicOver = () => {
    console.log('播放完毕了',musicCursor.value)
    playTime.value = 0.0
    nowTime.value = ''
    isplay.value = true
    playRef.value.play()
}

const changeNum = ref<number>(0)
const changeMusic = () => {}

//上一首
const outBtn = () => {
    if(musicList.value?.length >= 2){
        musicCursor.value--
        if(musicCursor.value < 0)  return (musicCursor.value = 0)
        playTime.value = 0.0
        musicUrl.value = musicList.value?.[musicCursor.value]
        //将歌曲信息发送给控制器父组件
        emits('musicDetail',musicDetailList.value[musicCursor.value])
    }
}

//下一首
 const next = () => {
    if(musicCursor.value !== musicList.value?.length -1 && musicList.value?.length > 1){
        musicCursor.value++
        playTime.value = 0.0
        musicUrl.value = musicList.value?.[musicCursor.value]
        //将歌曲信息发送给控制器父组件
        emits('musicDetail',musicDetailList.value[musicCursor.value])
    }
 }

 //时间改变时
 const onTimeupdate = () => {
    nowTime.value = changeTime(playRef.value?.currentTime)
 }

 //slider改变的回调函数
 const changePlayTime = (val:any) => {
    //把当前拖动的时间赋值给currentTIme
    playRef.value.currentTime = val
 }

 //audio 的pcanlay事件，当歌曲全部加载完毕才能获取总时间
 const changeDuration = () => {
    countTime.value = changeTime(playRef.value?.duration)
    if(playDuration.value !== playRef.value?.duration){
        //修改进度条的最大值
        sliderLength.value = playRef.value?.duration
    }
 }
 const updatePlayTimePerSecond = () => {
    
 }
</script>