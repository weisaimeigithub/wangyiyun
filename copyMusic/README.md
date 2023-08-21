1.pinia-plugin-persist  ---state 持久化数据
2.mport.meta.env.BASE_URL 和 tsconfig.json中 "types": ["vite/client"],还有env.d.ts中的//<reference types="vite/client" />有关
3.@vue/runtime-core 是干嘛的

删除
重试
复制
@vue/runtime-core 是 Vue.js 的核心运行时库，它提供了构建 Vue 应用程序所需的核心功能。该库是 Vue 3 的一部分，与 Vue 2 的 runtime 版本有很大的不同。

@vue/runtime-core 提供了虚拟 DOM 的创建、渲染和更新功能，以及与 Vue 组件交互的能力。它包含了 Vue 的响应系统、编译器、渲染器、生命周期管理器等核心功能。

使用 @vue/runtime-core，你可以创建 Vue 组件并将其渲染到 DOM 中。它还提供了一套 API，使你可以动态地更新组件的状态和属性，并响应用户的操作。

除了核心功能外，@vue/runtime-core 还包含了与平台相关的代码，例如处理 DOM 事件、异步更新、组件挂载和卸载等。

总而言之，@vue/runtime-core 是 Vue.js 的核心运行时库，提供了构建 Vue 应用程序所需的核心功能，并与平台相关的代码。通过使用它，你可以创建响应式的 Vue 组件，并将其渲染到目标平台上。

4.@vue/tsconfig 是一个Vue.js提供的特殊的tsconfig.json文件。它用于配置TypeScript编译器在处理Vue项目时的行为。

具体地说，@vue/tsconfig 主要用于配置TypeScript编译器的选项，以便正确地识别和处理Vue的特殊语法和功能，例如单文件组件（SFC）和Vue的模板语法。

在使用@vue/tsconfig 之前，你可能需要先安装 @vue/tsconfig包，可以通过运行以下命令安装：

```
npm install --save-dev @vue/tsconfig
```

安装完后，你可以在你的项目中添加一个名为tsconfig.json的文件，并将其基于@vue/tsconfig编写。这样，TypeScript编译器就能够正确地配置和处理你的Vue项目中的特殊语法和功能了。

总结起来，@vue/tsconfig 的作用是为TypeScript编译器提供Vue项目的特定配置，使其能够正确识别和处理Vue的特殊语法和功能。



跟着把大框搭建一下，重点语法研究一下，pinia使用方法研究一下 和vuex的区别，有什么好处 原理
框架之间重要联系，怎么拆分。   重要的css
elementui文档看一下
总结在readme中方便后期回访，加强学习效率，防止在学习  (把原代码分析一遍，把这些搞清楚，细节敲代码来不及了)

明天梳理（一个功能一个功能的看，怎么实现的，弄懂）
周六日看面试视频，然后  看leetcode还有  这些思维学起来，这边节奏快正常，家里那边节奏慢正常。这边适应了回家节奏应该很慢这样更好驾驭才对，而不是回家节奏不适应。
