import eventBus from '@/eventBus';
import { debounce } from '@/utils';
import defaultGif from '@/assets/default.gif';

//拿到所有未加载的图片
let imgs=[];

eventBus.$on("mainScroll",debounce(handlescroll,50));
function handlescroll(){
    setImages();
}
// 希望，调用该函数，就可以设置那些合适的图片
function setImages(){
    for(const img of imgs){
        setImage(img);
    }
}

function setImage(img){  
    //开始使用默认图片
    img.dom.src=defaultGif;
    // 处理图片
    // 该图片是否在视口范围内
    const clientHeight=document.documentElement.clientHeight; //获取视口的高度
    const rect=img.dom.getBoundingClientRect();//获取元素位置
    const height=rect.height || 150;
    if(rect.top >= -height && rect.top <= clientHeight){
        // const tempImg =new Image();
        // tempImg.onload=function(){
        //    //当真实图片加载完成之后
        //     img.dom.src=img.src;
        // }
        // tempImg.src=img.src;
        img.dom.src=img.src;
        imgs=imgs.filter((i)=>i !== img);
    }
}
export default{
    inserted(el,binding){
        //被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)
        const img={
            dom:el,
            src:binding.value
        };
        imgs.push(img);
        setImage(img);
    },
    unbind(el){
        imgs=imgs.filter((img)=>img.dom !== el);
    }
}