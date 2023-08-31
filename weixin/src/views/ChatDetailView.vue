<template>
  <div class="flex flex-col h-full" >
    <h1 class="flex justify-between border-b">
      <router-link to="/">返回</router-link>
      <span>张{{ $route.params.id }}</span>
      <span>···</span>
    </h1>
    <div class="grow bg-gray-200 p-1">
      <div v-for="(msg,idx) of messages" :key="idx" class="even:text-right bg-white p-1 rounded even:bg-green-500 even:text-white even:ml-auto w-fit">
        {{ msg.body.slice(0, 12) }}
      </div>
    </div>
    <div class="flex gap-1 items-center">
      <input class="grow p-1 rounded w-0 border border-green-500 outline-none focus:ring ring-green-300" type="text">
      <span class="cursor-pointer">😃</span>
      <button @click="$router.push('/')" class="shrink-0 p-1 bg-green-500 text-white rounded">发送</button>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, watch } from "vue";
import { useRoute } from 'vue-router'

export default defineComponent({
  props: ['id'],
  setup(props) {
    console.log(props) // 打开控制台查看
    var route = useRoute()
    console.log(route)
    var messages = ref([])
    onMounted(async () => {
      messages.value = (await fetch('https://jsonplaceholder.typicode.com/comments').then(it => it.json())).slice(0, 8)
    })
    // watch(() => route.params.id, async () => {
    watch(() => props.id, async () => {
      var start = Math.random() * 100 | 0
      messages.value = (await fetch('https://jsonplaceholder.typicode.com/comments').then(it => it.json())).slice(start, start + 8)
    })
    return {
      messages
    }
  }
})
</script>
