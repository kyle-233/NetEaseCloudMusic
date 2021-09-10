import Vue from 'vue'
import VueRouter from 'vue-router'


import Home from '../views/Home.vue'
import Found from '../views/found/Found.vue'
import MyMusic from '../views/mymusic/MyMusic.vue'
import Recommend from '../views/recommend/Recommend.vue'
import TopList from '../views/toplist/TopList.vue'
import Friends from '../views/friends/Friends.vue'
import Song from '../views/song/Song.vue'

Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/',
//     redirect: '/home',
//   },
//   {
//     path: '/home',
//     name: 'Home',
//     redirect: "/home/found",
//     component: Home,
//     children: [
//       {
//         path: '/home/found',
//         name: 'Found',
//         redirect: "/home/found/recommend",
//         component: Found,
//         children: [
//           {
//             path: "/home/found/recommend",
//             component: Recommend,
//           },
//           {
//             path: "/home/found/toplist",
//             component: TopList,
//           }
//         ]
//       },
//       {
//         path: '/home/mymusic',
//         name: 'MyMusic',
//         component: MyMusic
//       }
//     ]
//   },

// ]

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    redirect: "/home",
    component: Home,
    children: [
      {
        path: '/',
        name: 'Found',
        redirect: "/home",
        component: Found,
        children: [
          {
            path: "/",
            component: Recommend,
          },
          {
            path: "/home/toplist",
            component: TopList,
          },
          {
            path: "/home/artist",
            component: () => import('@/views/artists/Artists.vue'),
          },
          {
            path: "/home/artist/:id",
            component: () => import('@/views/artists/Info.vue'),
            children: [
              {
                path: '/',
                component: () => import('@/views/artists/Isong.vue'),
              }, {
                path: 'album',
                component: () => import('@/views/artists/album.vue'),
              }, {
                path: 'mv',
                component: () => import('@/views/artists/mv.vue'),
              }, {
                path: 'desc',
                component: () => import('@/views/artists/desc.vue'),
              }
            ],
          },
        ]
      },
      {
        path: '/home/mymusic',
        name: 'MyMusic',
        component: MyMusic
      },
      {
        path: '/home/friends',
        name: 'Friends',
        component: Friends,
      },
      {
        path: '/home/song/:id',
        name: 'Song',
        component: Song,
      },

    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
