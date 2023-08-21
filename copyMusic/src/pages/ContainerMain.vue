<template>
    <div class="container-main">
        <ContainMainLeft />
        <div class="container-mainRight">
            <router-view></router-view>
        </div>
    </div>
</template>
<script setup lang="ts">
import ContainMainLeft from '../pages/ContainerMainLeft.vue'
</script>
<style>
</style>