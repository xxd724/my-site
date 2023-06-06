//网站标题控制

let routeTitle='',
    siteTitle='';
function setTtitle(){
    if(!routeTitle && !siteTitle){
        document.title='loading...';
    }else if(routeTitle && !siteTitle){
        document.title=routeTitle;
    }else if(!routeTitle && siteTitle){
        document.title=siteTitle;
    }else{
        document.title=routeTitle + '-' + siteTitle;
    }
}
//设置路由标题
function setRouteTitle(title){
    routeTitle=title;
    setTtitle();
}
//设置网站标题
function setSiteTitle(title) { 
    siteTitle=title;
    setTtitle();
 }
export default{
    setRouteTitle,
    setSiteTitle
}
