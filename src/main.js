// 1.1 导入第三方包
import Vue from "vue";
import app from "./app";
import router from "./router";
import "./common/stylus/mixins.styl";
import "./mock/mockServer";
import "./common/stylus/mixins.styl";

import { Cell } from "mint-ui";
import { Switch } from "mint-ui";
import { Button } from "mint-ui";
import "mint-ui/lib/style.css";

import axios from "axios";

//启用插件
Vue.component(Cell.name, Cell);
Vue.component(Switch.name, Switch);
Vue.component(Button.name, Button);

// 2.2 扩展实例成员
Vue.prototype.axios = axios; // 把axios库放置到原型, 将来其他组件直接可以拿到axios对象

new Vue({
  el: "#app",
  router,
  render: h => h(app)
});
