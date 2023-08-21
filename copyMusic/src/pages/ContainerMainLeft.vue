<template>
    <div class="container-mainLeft">
        <ul>
            <h3>浏览</h3>
            <li  @click="goFindMusic">
               <a href="javascript:;">发现音乐</a>
            </li>
            <li  @click="goVideo">
                <a href="javascript:;">视频</a>
            </li>
            <li  @click="goPlayed"><a href="javascript:;">最近播放</a></li>
        </ul>
    </div>
</template>
<script  setup  lang="ts">
 import { useRouter }  from 'vue-router'

 const router = useRouter()
 const goFindMusic = () => {
     router.push('/ContainerMainFind')
 }

 const goVideo = () => {
    router.push('/ContainerMainVideo')
 }

 const goSongList = () => {
    router.push('/SongList')
 }

 const goPlayed = () => {
    router.push('/ContainerMainRecently')
 }

</script>
