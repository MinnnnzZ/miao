<template>
  <div class="flex flex-col w-48">
    <h1 class="flex justify-center border-b">
      <span>微信</span>
    </h1>
    <ul class="divide-y grow overflow-auto">
      <li v-for="x of 5" :key="x">
        <router-link :to="'/chat/' + x" class="flex gap-1 ">
          <img class="w-10 h-10 m-1 " :src="'https://dummyimage.com/64x64/' + x + 'd' + x" alt="">
          <div class="flex flex-col justify-center">
            <span class="">
              张{{ x }}
            </span>
            <span class="text-xs text-gray-500">
              在吗？
            </span>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
