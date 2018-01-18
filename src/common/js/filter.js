import Vue from "vue";
import moment from "moment";
Vue.filter("creatAt", function(creatTime) {
  return moment(creatTime).format("YYYY-MM-DD HH:mm:ss");
});
Vue.filter("move", function(move) {
  if (!move) {
    return "未启动";
  } else {
    return "已启动";
  }
});
Vue.filter("statu", function(statu) {
  if (statu == 0) {
    return "未付款";
  } else if (statu == 1) {
    return "已付款";
  } else if (statu == 2) {
    return "申请退款中";
  } else if (statu == 3) {
    return "已退款";
  }
});
Vue.filter("money", function(money) {
  let price = Number(money) / 100;
  return price;
});
