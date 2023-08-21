<template>
  <div class="container">
    Changes with dark/light mode.
    <button @click="toggleDark()">
      Enable {{ isDark ? 'Light' : 'Dark' }} Mode
    </button>
  </div>
</template>

<script setup lang="ts">
// useDark()可以获取当前的主题模式是不是暗黑模式，返回的是布尔值，useToggle()类似于开关，能将useDark()取反，实现主题模式切换效果
import { useDark, useToggle } from '@vueuse/core'
import { onMounted } from 'vue'
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
<style scoped lang="less">
.dark .container {
  background: slategrey;
  color: white;
  border-color: black;
}

.dark button {
  background: lightgrey;
  color: black;
}

.dark body {
  background: darkgrey;
}
</style>
