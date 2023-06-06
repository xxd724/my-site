import { showMessage } from "@/utils";
import axios from "axios";
const ins=axios.create(); //创建一个axios实例
ins.interceptors.response.use(function(res){
    if(res.data.code !== 0){
        showMessage({
            content:res.data.msg,
            type:"error",
            duration:1500
        })
        return null;
    }
    return res.data.data;
});
export default ins;