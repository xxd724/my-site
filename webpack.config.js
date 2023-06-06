if(process.env.NODE_ENV === 'production'){
    module.exports={
        externals:{
            vue:"Vue",
            vuex:"Vuex",
            "vue-router": "VueRouter",
            axios:"axios"
        }
    }
}else{
    module.exports={}
}