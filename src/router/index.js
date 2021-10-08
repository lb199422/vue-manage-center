import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import('@/components/Login.vue')
const Home = () => import('@/components/Home.vue')
const Welcome = () => import('@/components/Welcome.vue')
const Users = () => import('@/components/user/Users.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    redirect: '/welcome',
    component: Home,
    children: [
      {
        path: '/welcome',
        name: Welcome,
        component: Welcome
      },
      {
        path: '/users',
        name: Users,
        component: Users
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if(to.path === '/login') {
    next()
    return  // 避免无限循环
  }
  const token = window.sessionStorage.getItem('token')
  if(!token){
    next('/login')
    return
  }else{
    next()
  }
})

export default router
