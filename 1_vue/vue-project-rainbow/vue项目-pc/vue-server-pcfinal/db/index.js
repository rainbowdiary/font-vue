const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/vueBackendPc', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("数据库已连接~~")
});