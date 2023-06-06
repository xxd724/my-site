import { getComponentRootDom } from "@/utils";
import Icon from '@/components/IconView';
import styles from './showMessage.module.scss';
/**
 * 
 * @param {Strind} content //消息的内容
 * @param {String} type  //消息的类型 info error warn success
 * @param {Number} duration  //多久之后消失
 * @param {HTMLElement} container //容器，消息会显示在该容器正中间，如果不传，则显示在页面正中间
 */
export default function (options = {}) {
    const content = options.content || '';
    const type = options.type || 'info';
    const duration = options.duration || 2000;
    const container = options.container || document.body;
    const div = document.createElement('div'); //创建一个div
    const Icondom = getComponentRootDom(Icon, { type });//获取Icon的根Dom
    div.innerHTML = `<span class=${styles.icon}>${Icondom.outerHTML}</span><div>${content}</div>`;
    //设置样式
    // const typeClass=style[`message-${type}`]; //类型样式
    // div.className=`${style.message} ${typeClass}`;
    div.className = `${styles.message} ${styles["message-" + type]}`;
    //容器的position是否改动
    //getComputedStyle() 方法用于获取指定元素的 CSS 样式。 
    if (container != document.body && getComputedStyle(container).position === 'static') {
        container.style.position = "relative";
    }
    container.appendChild(div);
    //强行渲染
    div.clientHeight; //导致reflow
    //回归到正常位置
    div.style.opacity = 1;
    div.style.transform = `translate(-50%,-50%)`;
    //等一段时间消失
    setTimeout(() => {
        div.style.transform = `translate(-50%,-50%) translateY(-25px)`;
        div.style.opacity = 0;
        div.addEventListener("transitionend", function () {
            div.remove();
            options.callback && options.callback();
        }, { once: true });
    }, duration)
}