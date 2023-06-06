import Vue from 'vue'
// import Vuex from 'vuex'
import {Store,install} from 'vuex'
import banner from "./banner";
import setting from './setting';
import about from './about'
import project from './project';

// Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//   },
//   getters: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//     banner,
//     setting,
//     about,
//     project
//   },
//   // strict: process.env.NODE_ENV !== 'production'
//   strict:true
// })
if(!window.Vuex){
  install(Vue);
}
export default new Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    banner,
    setting,
    about,
    project
  },
  // strict: process.env.NODE_ENV !== 'production'
  strict:true
})
