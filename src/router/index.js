import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress' //引入进度条组件
import store from "./../store/index";
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

/**
 *@parma {String} name 文件夹名称
 *@parma {String} component 视图组件名称
 */
const getComponent = (name,component) => () => import(`@/views/${name}/${component}.vue`);


const routes = [
  {
    path: '/',
    redirect: '/home',
    component: getComponent('login','index')
  },
  {
    path: '/login',
    name: 'login',
    component: getComponent('login','index')
  },
  {
    path: '/',
    component: getComponent('layout', 'Layout'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: getComponent('home', 'index'),
        meta: {title: '首页'}
      },
      {
        path: '/test1',
        name: '测试页1',
        component: getComponent('test', 'test1'),
        meta: {title: '测试页1'}
      },
      {
        path: '/test2',
        name: '测试页2',
        component: getComponent('test', 'test2'),
        meta: {title: '测试页2'}
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//判断是否存在token
router.beforeEach((to,from,next)=>{
  NProgress.start()
  if (to.path !== '/login' && store.state.token) {
    next('/login')     //跳转登录
    NProgress.done()   // 结束Progress
  }
  next()
})


router.afterEach(() => {
  NProgress.done() // 结束Progress
})


export default router
