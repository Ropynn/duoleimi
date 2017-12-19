/* 支付组件 */
<template>
  <div class="payment-time">
    <div class="time">
      <span class="residue">剩余时间</span>
      <count-down :endTime="endTime" :callback="callback" endText="已经结束了"></count-down>
    </div>
    <div class="paid">
      <div class="particulars">
        <div class="logol">
          <img class="logo" src="../assets/q.png" alt="">
        </div>
        <p class="subsection">订单号：
          <span class="particulars">{{payment.ordernumber}}</span>
        </p>
        <p class="subsection">订单状态：
          <span class="particulars">{{payment.pay}}</span>
        </p>
        <p class="subsection">套餐：
          <span class="particulars">{{price}}元 / {{minutes}}分钟</span>
        </p>
        <p class="subsection">启动时间：
          <span class="particulars">{{payment.date}}</span>
        </p>
      </div>
    </div>
    <div class="footer">
      <span class="assistance">若需帮忙请拨打按摩椅上的客服电话，谢谢惠顾</span>
    </div>
  </div>
</template>

<script>
// import Bus from "../common/js/bus.js";  //引入eventbus
import countDown from "./countDown.vue";   //引入倒计时组件

export default {
  components: {
    countDown
  },
  data() {
    return {
      price: this.$route.params.price, //获取传递过来的价钱
      minutes: this.$route.params.minutes, //获取传递过来的按摩时间
      currentTime: Number(this.$route.params.currentTime), //获取按摩开始的时间
      endTime: "", //按摩结束的时间
      payment: {}
    };
  },

  created() {
    this.axios.get("/api/payment").then(res => {
      this.payment = res.data.data;
    });

    //通过eventbus接收按摩开始的时间
    // Bus.$on("currentTime", currentTime => {
    //   this.currentTime = currentTime;
    //   // console.log(this.currentTime + 'a' );
    // });


    // console.log(this.currentTime);
    this.endTime = (this.currentTime + this.minutes * 1000 * 60) / 1000;
  },
  methods: {
    callback() {
      alert("完成");
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.time {
  width: 100%;
  height: 118px;
  background-color: #fff;
  z-index: 10;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  border-bottom: 2px dashed #E90000;

  .timepiece {
    height: 80px;
    font-size: 26px;
    color: #E90000;
    display: flex;
    align-content: center;
    justify-content: center;
  }

  .residue {
    height: 30px;
    color: #E90000;
    display: block;
    font-size: 20px;
    display: flex;
    align-content: center;
    justify-content: center;
  }
}

.paid {
  width: 100%;
  z-index: 10;
  position: absolute;
  top: 120px;
  bottom: 120px;
  background-color: #fff;

  .particulars {
    width: 100%;

    /* height 300px */
    .logol {
      width: 100%;
      height: 90px;
      line-height: 90px;
      text-align: center;

      .logo {
        width: 50px;
        height: 50px;
        vertical-align: middle;
      }
    }

    .subsection {
      color: #C2C2C2;
      padding: 20px;
      font-size: 18px;

      .particulars {
        color: #181818;
      }
    }
  }
}

.footer {
  width: 100%;
  height: 118px;
  z-index: 10;
  background-color: #fff;
  border-top: 2px dashed #E90000;
  position: absolute;
  bottom: 0;

  .assistance {
    display: inline-block;
    text-align: center;
    font-size: 12px;
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translateX(30%);
  }
}
</style>
