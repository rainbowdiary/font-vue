export default (axiosInstance, interfaceObj) => {
  const api = {};
  for (name in interfaceObj) {
    const { url, method, isForm } = interfaceObj[name]
    //给api添加键值对，键：请求名称 值：函数 
    api[name] = async (data, config = {}) => {
      // data，config为用户传入的第一个和第二个配置对象，axios允许传入， 并会合并两个配置对象
      let transformData = null;
      // 如果接口需要传入FormData数据
      if (data && isForm) {
        transformData = new FormData();
        // 将data中每一项都进行FormData数据转换
        for (let key in data) {
          transformData.append(key, data[key])
        }
      } else {
        // 如果没有要求，默认json格式传输，直接返回
        transformData = data;
      }

      //  发送请求
      let res = "";
      switch (method) {
        case "get":
        case "delete":
          res = await axiosInstance({
            url,
            method,
            params: transformData
          })
          break;
        case "post":
        case "put":
          //  configData请求方法接受的第二个配置参数，也需要数据转换为formData
          let configData = (config && typeof config.data === "object" ? config.data : {})
          let endData;
          if (isForm) {
            for (let key in configData) {
              transformData.append(key, configData[key])
            }
            endData = transformData
          } else { //如果不是formData格式，直接合并两个对象
            endData = Object.assign(transformData, configData)
          }
          res = await axiosInstance({
            url,
            method,
            data: endData
          })
          break;
      }
      return res;
    }
  }
  return api;
}

/*
暴露：
· (axiosInstance, interfaceObj)=>{}
返回值：
  api={
  getContactList: ()=>{},
  addContactByForm: ()=>{},
  addContactByJson: ()=>{},
  updateContact: ()=>{},
  delContact: ()=>{},
  }
} */