import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import {titleController} from '@/utils'
// Vue.use(VueRouter)

if (!window.VueRouter) {
  Vue.use(VueRouter); // 使用一个vue插件
}
const router = new VueRouter({
  routes, //路由匹配规则
  // mode:"history",
  mode:"hash"
})
router.afterEach((to)=>{
  if(to.meta.title){
    titleController.setRouteTitle(to.meta.title);
  }
})
export default router
