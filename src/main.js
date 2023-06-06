import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/global.scss'
import '@/mock'
import './eventBus'
import showMessage from '@/utils/showMessage'
store.dispatch("setting/fetchSetting");

Vue.prototype.$showMessage =showMessage;
//全局注册指令
import vLoading from '@/directive/loading';
import vLazy from '@/directive/lazy';
Vue.directive("loading",vLoading);
Vue.directive("lazy",vLazy);


// Vue.config.productionTip = false;
 
//测试一下纯DOM操作
//使用css module
// import style from '@/styles/test.module.scss';
// let div=document.createElement("div");
// div.className=style.test;
// div.innerText="daofosadjfijdofjas";
// document.body.appendChild(div);

//得到组件生成的根DOM
// import Icon from '@/components/IconView';
// function getComponentRootDom(comp,props){
//   let vm=new Vue({
//     render:(h)=>h(comp,{props})
//   });
//   vm.$mount();
//   return vm.$el;
// }
// let dom=getComponentRootDom(Icon,{type:"home"});
// console.log(dom);
//打印得到下面的结果
/* <div data-v-5f00d024>
  <i data-v-5f00d024 class="iconfont icon-container iconzhuye"></i>
</div> */

//向实例注入成员
// Vue.prototype.$sayHello=function(){
//   console.log("dsdsd");
// }



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
