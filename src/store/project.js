import { getProject } from "@/api/project";

export default{
    namespaced:true,
    state:{
        loading:false,
        data:[]
    },
    mutations:{
        setLoading(state,payload){
            state.loading=payload;
        },
        setData(state,payload){
            state.data=payload;
        }
    },
    actions:{
        async fetchProject(ctx){
            ctx.commit("setLoading",true);
            const res= await getProject();
            ctx.commit("setData",res);
            ctx.commit("setLoading",false);
        }
    }
}