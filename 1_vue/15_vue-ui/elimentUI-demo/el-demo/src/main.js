import Vue from 'vue'
import App from './App.vue';
import 'element-ui/lib/theme-chalk/index.css';

import {
  Form, FormItem, Input,
  Select,
  Option,
  Button
} from "element-ui";

Vue.config.productionTip = false
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
new Vue({
  render: h => h(App),
}).$mount('#app')
