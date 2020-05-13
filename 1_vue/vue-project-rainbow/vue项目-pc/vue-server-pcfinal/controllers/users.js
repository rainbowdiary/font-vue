const usersModel = require("../models/users");
const jsonwebtoken = require("jsonwebtoken");
class Users {
  async getAll(ctx) {
    ctx.body = await usersModel.find()
  };
  async addUser(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: true },
      password: { type: "string", required: true },
    });
    let name = ctx.request.body.name;
    let data = await usersModel.findOne({ name });
    if (data) { ctx.throw(409, "用户名已注册") }
    let password = ctx.request.body.password;
    let user = await usersModel.create({ name, password })

    let newUser = await usersModel.findById(user._id);
    ctx.body = newUser;
  };
  async getUserById(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true }
    });
    let id = ctx.params.id;
    let user = await usersModel.findById(id);
    if (!user) ctx.throw(404, "当前用户不存在")
    ctx.body = user;
  };
  async updateUserById(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true }
    });
    let update = {};
    let id = ctx.params.id;
    let name = ctx.request.body.name;
    let password = ctx.request.body.password;
    name ? update.name = name : "";
    password ? update.password = password : "";
    let user = await usersModel.findByIdAndUpdate(id, update)
    if (!user) ctx.throw(404, "当前用户不存在");
    let updatedUser = await usersModel.findById(id);
    ctx.body = updatedUser;
  };
  async delUserById(ctx) {
    let id = ctx.params.id;
    let user = await usersModel.findByIdAndRemove(id);
    if (!user) ctx.throw(404, "当前用户不存在")
    ctx.status = 204;
  };
  async login(ctx) {
    ctx.verifyParams({
      name: { type: "string", required: true },
      password: { type: "string", required: true }
    });
    let name = ctx.request.body.name;
    let password = ctx.request.body.password;
    let user = { name, password }
    // console.log("之前:", user);

    user = await usersModel.findOne({ name, password });
    // console.log("之后:", user);

    if (!user) {
      ctx.body = {
        code: 1, message: "用户名或密码错误"
      }
      return
    };
    const token = jsonwebtoken.sign({ name: user.name, id: user._id }, "damu", { expiresIn: "7d" });
    ctx.body = {
      "code": 0,
      "flag": true,
      "message": '登录成功~',
      "data": { token }
    }
  }
  async upload(ctx) {
    const file = ctx.request.files.file;
    const name = file.path.split("\\").pop();
    ctx.body = {
      path: `http://127.0.0.1:3000/img/${name}`
    }
  }
}

module.exports = new Users();