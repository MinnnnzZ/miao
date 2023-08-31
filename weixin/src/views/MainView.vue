<template>
  <div class="w-48 h-96 flex flex-col">
    <div class="grow ">
      <!-- <RouterView /> -->

      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component class="absolute " :is="Component" />
        </transition>
      </router-view>

    </div>
    <div class="flex border-t divide-x">
      <router-link class="text-center grow" to="/">聊天</router-link>
      <router-link class="text-center grow" to="/contacts">通信录</router-link>
      <router-link class="text-center grow" to="/discover">发现</router-link>
      <router-link class="text-center grow" to="/me">我</router-link>
    </div>
  </div>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
