// import home from '@/views/home/HomeView';
// import about from '@/views/AboutView';
// import project from '@/views/ProjectView';
// import message from '@/views/MessageView';
// import blog from '@/views/blog/BlogView';
// import detail from '@/views/blog/DetailView';
import NotFound from '@/views/NotFoundView';
import { start,configure,done } from 'nprogress'; //虚假进度条
import "nprogress/nprogress.css";

configure({
    trickleSpeed:15, //进度条前进速度
    showSpinner:false //隐藏Spinner

})
function delay(duration){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve()
        },duration)
    })
}
function getPageComponent(pageCompResolver){
    return async ()=>{
        start();
        if(process.env.NODE_ENV === 'development'){
            await delay(2000);
        }
        const comp = await pageCompResolver();
        done();
        return comp;
    }
}
export default [
    {
        name:"HomeView",
        path:"/",
        component:getPageComponent(()=>
            import(/* webpackChunkName: "home" */ "@/views/home/HomeView")
        ),
        meta:{
            title:"首页"
        }
    },
    {
        name:"AboutView",
        path:"/about",
        component:getPageComponent(()=>
            import(/* webpackChunkName: "about" */ "@/views/AboutView")
        ),
        meta:{
            title:"关于我"
        }
    },
    {
        name:"ProjectView",
        path:"/project",
        component:getPageComponent(()=>
            import(/* webpackChunkName: "project" */ "@/views/ProjectView")
        ),
        meta:{
            title:"项目&效果"
        }
    },
    {
        name:"MessageView",
        path:"/message",
        component:getPageComponent(()=>
            import(/* webpackChunkName: "message" */ "@/views/MessageView")
        ),
        meta:{
            title:"留言板"
        }
    },
    {
        name:"BlogView",
        path:"/article",
        component:getPageComponent(()=>
            import(/* webpackChunkName: "blog" */ "@/views/blog/BlogView")
        ),
        meta:{
            title:"文章"
        }
    },
    {
        name:"CategoryBlogView",
        path:"/article/cate/:categoryId",
        component:getPageComponent(()=>
            import(/* webpackChunkName: "home" */ "@/views/home/HomeView")
        ),
        meta:{
            title:"文章"
        }
    },
    {
        name:"DetailView",
        path:"/article/:id",
        component:getPageComponent(()=>
            import(/* webpackChunkName: "detail" */ "@/views/blog/DetailView")
        ),
        meta:{
            title:"文章详情"
        }
    },
    {
        name:"NotFoundView",
        path:"*",
        component:NotFound
    }
]
// export default [
//     {
//         name:"HomeView",
//         path:"/",
//         component:home,
//         meta:{
//             title:"首页"
//         }
//     },
//     {
//         name:"AboutView",
//         path:"/about",
//         component:about,
//         meta:{
//             title:"关于我"
//         }
//     },
//     {
//         name:"ProjectView",
//         path:"/project",
//         component:project,
//         meta:{
//             title:"项目&效果"
//         }
//     },
//     {
//         name:"MessageView",
//         path:"/message",
//         component:message,
//         meta:{
//             title:"留言板"
//         }
//     },
//     {
//         name:"BlogView",
//         path:"/article",
//         component:blog,
//         meta:{
//             title:"文章"
//         }
//     },
//     {
//         name:"CategoryBlogView",
//         path:"/article/cate/:categoryId",
//         component:blog,
//         meta:{
//             title:"文章"
//         }
//     },
//     {
//         name:"DetailView",
//         path:"/article/:id",
//         component:detail,
//         meta:{
//             title:"文章详情"
//         }
//     }
// ]