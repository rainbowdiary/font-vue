import AxiosInstance from "./interceptors";
import interfaceObj from "./interface";
import utilFn from "../utils";
export default utilFn(AxiosInstance, interfaceObj)


/*
调用utilFn
· (axiosInstance, interfaceObj)=>{}
返回值（暴露）：
  api对象={
  getSeller: (data)=>{},
  getGoods: (data)=>{},
  getRatings: (data)=>{},
  }
} */