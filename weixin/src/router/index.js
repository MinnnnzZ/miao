import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import ChatView from '../views/ChatView.vue'
import ContactsView from '../views/ContactsView.vue'
import DiscoverView from '../views/DiscoverView.vue'
import MeView from '../views/MeView.vue'
import FriendCircleView from '../views/FriendCircleView.vue'
import MainView from '../views/MainView.vue'
import ChatDetailView from '../views/ChatDetailView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView,
      children: [{
        path: '',
        component: ChatView,
      }, {
        path: '/contacts',
        component: ContactsView,
      }, {
        path: '/discover',
        component: DiscoverView,
      }, {
        path: '/me',
        component: MeView,
      }]
    },
    {
      path: '/chat/:id',
      name: 'chat-detail',
      component: ChatDetailView,
      props: true, // 请把路径的params({id:xx})做为组件的props传给它
    },
    {
      path: '/friend-circle',
      component: () => import('../views/FriendCircleView.vue'),
      meta: {
        a: 1, b: 2
      }
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
