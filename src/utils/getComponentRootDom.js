import Vue from 'vue'
/**
 * 
 * @param {*} comp //组件
 * @param {*} props //属性
 */
export default function (comp, props) {
    let vm = new Vue({
        render: (h) => h(comp, { props })
    });
    vm.$mount();
    return vm.$el;
}