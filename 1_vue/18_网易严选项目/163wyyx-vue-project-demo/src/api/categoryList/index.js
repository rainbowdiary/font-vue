import axiosInstance from "./interceptors";
import interfaceObj from "./interface";
import utilFn from "../utils";
export default utilFn(axiosInstance, interfaceObj)


/*
调用utilFn
· (axiosInstance, interfaceObj)=>{}
返回值（暴露）：
  api对象={
  getContactList: (data)=>{},
  addContactByForm: (data)=>{},
  addContactByJson: (data)=>{},
  updateContact: (data)=>{},
  delContact: (data)=>{},
  }
} */