// 1.1 导入第三方包
import Vue from "vue";
import app from "./app";
import router from "./router";
import "./common/stylus/mixins.styl";

//引入mock模拟后台数据
import "./mock/mockServer";

//引入微信js-sdk
import wx from "weixin-js-sdk";

//引入mint-ui的组件
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
