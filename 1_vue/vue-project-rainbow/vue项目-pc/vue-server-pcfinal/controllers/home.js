class Home {
    index(ctx){ctx.body="{{code: 200 ,  data: '后台系统访问成功~'}}"}
}

module.exports=new Home();