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
          <span class="particulars">{{payment.packageType}}</span>
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
import countDown from "./countDown.vue";
export default {
  components: {
    countDown
  },
  data() {
    return {
      payment: {},
      minutes: this.$route.params.minutes,
      seconds: 0,
      nowTime: Number(this.$route.params.nowTime),
      eTime: "",
      endTime: "",
      callback: {}
    };
  },

  created() {
    this.axios.get("/api/payment").then(res => {
      this.payment = res.data.data;
    });
    // this.nowTime = new Date().getTime();
    // console.log("当前时间:" + this.nowTime);
    this.eTime = (this.nowTime + this.minutes * 1000 * 60) / 1000;
    // console.log("结束时间" + this.eTime);
    this.endTime = this.eTime;
  },

  mounted() {},
  methods: {
    callback() {
      alert('完成')
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.time {
  width: 100%;
  height: 118px;
  background-color: #eaead1;
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
  background-color: #d0d9ff;

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
  background-color: beige;
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
