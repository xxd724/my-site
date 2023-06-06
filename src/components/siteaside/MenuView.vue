<template>
  <div>
    <nav class="menu-container">
        <router-link 
        v-for="(n,i) in items" :key="i"
        :to="{name:n.name}" 
        :exact="n.exact"  
        active-class="selected"
        exact-active-class=""
        >
            <div class="icon">
                <Icon :type="n.icon"/>
            </div>
            <span>{{ n.title }}</span>
        </router-link>
    </nav>
  </div>
</template>

<script>
import Icon from '@/components/IconView.vue'
export default {
    data(){
        return{
            items:[
                {
                    name:"HomeView",
                    title:"首页",
                    icon:"home",
                    exact:true
                },
                {
                    name:"BlogView",
                    title:"文章",
                    icon:"blog",
                    // startsWith:true //当前选中以link模糊匹配
                    exact:false
                },
                {
                    name:"AboutView",
                    title:"关于我",
                    icon:"about",
                    exact:true
                },
                {
                    name:"ProjectView",
                    title:"项目&效果",
                    icon:"code",
                    exact:true
                },
                {
                    name:"MessageView",
                    title:"留言",
                    icon:"chat",
                    exact:true
                }
            ],

        }
    },
    methods:{
        // isSelected(item){
        //     //字符串中的字母被转换为小写字母。
        //     let link=item.link.toLowerCase(); //菜单的链接地址
        //     let currentPathname= location.pathname.toLowerCase(); //浏览器访问的地址
        //     if(item.startsWith){
        //         return currentPathname.startsWith(link);
        //     }else{
        //         return currentPathname === link;
        //     } 
        // }
    },
    components:{
        Icon
    }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variable.scss';
.menu-container{
    color: $gray;
    margin: 24px 0;
    a{
        display: block;
        padding: 0 50px;
        display: flex;
        align-items: center;
        height: 45px;
        .icon{
            width: 24px;
        }
        &:hover{
            color: #fff;
        }
        &.selected{
        background:darken($words, 3%); //darken() 使颜色加深
    }
    }
    
}
</style>