//个人写的事件总线
// const listeners={};
// //事件总线
// export default{
//     //监听事件
//     $on(eventName,handler){
//         if(!listeners[eventName]){
//             listeners[eventName]=new Set();
//         }
//         listeners[eventName].add(handler);
//     },
//     //取消监听事件
//     $off(eventName,handler){
//         if(!listeners[eventName]){
//             return;
//         }
//         listeners[eventName].delete(handler);
//     },
//     //触发事件
//     $emit(eventName,...args){
//         if(!listeners[eventName]){
//             return;
//         }
//         for(const handler of listeners[eventName]){
//             handler(...args);
//         }
//     }
// }
import Vue from 'vue';
// export default new Vue({});
// Vue.prototype.$bus=new Vue({});
const bus=new Vue({});
Vue.prototype.$bus=bus;
export default bus;