<template>
  <div>
    <h1 class="flex relative justify-center">
      <router-link class="absolute left-0" to="/discover">返回</router-link>
      <span>朋友圈</span>
    </h1>
    <div class="p-1 ">
      <div class="space-y-3">
        <div class="flex gap-1" v-for="n of 3" :key="n">
          <img class="w-10 h-10" src="https://dummyimage.com/64x64" alt="">
          <div class="grow">
            <h2 class="font-bold">明明</h2>
            <p>导弹 起飞！</p>
            <div class="flex flex-wrap gap-1">
              <img :key="n" v-for="n of 3" class="w-1/4 grow" src="https://dummyimage.com/64x64" alt="">
            </div>
            <span class="text-xs">2分钟前 <span class="text-blue-700">导弹基地</span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
export default {
  setup() {
    var route = useRoute()
    console.log(route)
  }
}
</script>
