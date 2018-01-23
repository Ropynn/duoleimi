import Vue from "vue";
// import moment from "moment";
const format = require('date-fns/format');
// import { numberComma, numberPad, numberRandom } from "vux";
Vue.filter("creatAt", function (creatTime) {
  // return moment(creatTime).format("YYYY-MM-DD HH:mm:ss");
  return format(creatTime, "YYYY-MM-DD HH:mm:ss");
});
Vue.filter("move", function (move) {
  if (!move) {
    return "未启动";
  } else {
    return "已启动";
  }
});
Vue.filter("statu", function (statu) {
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
// Vue.filter("fMoney", function (fMoney) {
//   return numberComma(fMoney);
// });
Vue.filter("fmoney", function (num) {
  let sign,cents;
  num = num.toString().replace(/\$|\,/g, '');
  if (isNaN(num))
    num = "0";
  sign = (num == (num = Math.abs(num)));
  num = Math.floor(num * 100 + 0.50000000001);
  cents = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10)
    cents = "0" + cents;
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
    num = num.substring(0, num.length - (4 * i + 3)) + ',' +
      num.substring(num.length - (4 * i + 3));
  return (((sign) ? '' : '-') + num + '.' + cents);
});
