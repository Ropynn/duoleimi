/* 支付组件 */
<template>
  <div class="payment-time">
    <div class="time">
      <span class="residue" v-show="isShow">剩余时间</span>
      <count-down :endTime="endTime" :callback="callback" :endText="endText" class="countTime"></count-down>
    </div>
    <div class="paid">
      <div class="container">
        <span class="line"></span>
        <span class="txt">详细信息</span>
        <span class="line"></span>
      </div>

      <div class="particulars">
        <!-- <div class="logol">
          <img class="logo" src="../assets/logo.png" alt="">
        </div> -->
        <p class="subsection">订单号：
          <span class="particulars">{{payment.payid}}</span>
        </p>
        <p class="subsection">机器状态：
          <span class="particulars" v-show="isShow">正在运行</span>
          <span class="particulars" v-show="isShowc">已结束</span>
        </p>
        <p class="subsection">套餐：
          <span class="particulars">{{payment.money/100}}元 / {{payment.time}}分钟</span>
        </p>
        <p class="subsection">启动时间：
          <span class="particulars">{{payment.updatedAt | updatedAt}}</span>
        </p>
      </div>
    </div>
    <div class="pic">
      <img src="../assets/logo3.jpg" alt="">
    </div>

    <!-- <div class="footer">
      <div class="tip">
        小贴士
      </div>
      <p>不同的手机和操作系统对倒计时存在一些误差值，请以实际按摩时间为准</p>
    </div> -->
    <!-- <transition name="fade">
      <advertising class="detail" v-show="isAdvertising" >
      </advertising>
    </transition> -->
  </div>
</template>

<script>
import countDown from "./countDown.vue"; //引入倒计时组件
// import advertising from "./advertising";  //引入广告层组件
export default {
  components: {
    countDown
    // advertising
  },
  data() {
    return {
      price: this.$route.params.price, //获取传递过来的价钱
      minutes: this.$route.params.minutes, //获取传递过来的按摩时间
      // currentTime: Number(this.$route.params.currentTime), //获取按摩开始的时间
      // currentTime: "", //获取按摩开始的时间
      payment: {},
      endTime: "", //按摩结束的时间
      startTime: "", //客户开始的时间
      isShow: true,
      isShowc: false,
      isAdvertising: false,
      content: ""
    };
  },
  props: {
    hided: "",
    endText: {
      type: String,
      default: "按摩完成，欢迎继续使用"
    },
    obj: Object
  },
  created() {
    // const obj = JSON.parse(sessionStorage.getItem("_ORDER_"));

    // alert(JSON.stringify(this.obj))

    this.payment = this.obj;
    this.endTime = new Date(this.obj.overTime).getTime();
    // console.log("endTime-----"+this.endTime);

    // this.endTime = new Date(this.payment.updatedAt).getTime();
    // console.log(this.endTime);
  },
  mounted() {
    // const obj = JSON.parse(sessionStorage.getItem("_ORDER_"));
    // this.payment = obj;
    // this.endTime = new Date(obj.overTime).getTime();
    // console.log(this.endTime);
    //按摩开始时间
    // this.openingTime();
  },
  methods: {
    //todo 服务开始时间
    // openingTime: function() {
    //   let time = this.currentTime;
    //   let newtime = time * 1000;
    //   function gettime(t) {
    //     let _time = new Date(t);
    //     let year = _time.getFullYear();
    //     let month = _time.getMonth() + 1;
    //     let date = _time.getDate();
    //     let hour = _time.getHours();
    //     let minute = _time.getMinutes();
    //     let second = _time.getSeconds();
    //     minute = minute < 10 ? "0" + minute : minute;
    //     second = second < 10 ? "0" + second : second;
    //     return (
    //       year + "年" + month +  "月" + date + "日 " + hour + ":" + minute + ":" + second
    //     ); //这里自己按自己需要的格式拼接
    //   }
    //   this.startTime = gettime(newtime / 1000);
    // },
    callback() {
      // todo 完成后动态改变计时器、订单状态等
      this.isShow = !this.isShow;
      this.isShowc = !this.isShowc;
      // todo 弹层广告出来
      this.isAdvertising = !this.isAdvertising;
      //todo 5s后广告层自动消失
      setTimeout(() => {
        this.isAdvertising = false;
        // console.log(this.isAdvertising)
      }, 7000);
    }
  }
};
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import '../common/stylus/mixins.styl';

.container {
  width: 100%;
  // padding-top px2rem(50px)
  height: px2rem(120px);
  line-height: px2rem(120px);
  text-align: center;

  .line {
    display: inline-block;
    width: px2rem(260px);
    border-top: 1px solid black;
    /* margin-bottom 13px */
  }

  .txt {
    color: #8B8785;
    font-size: 18px;
    vertical-align: middle;
    text-align: center;
  }
}

.time {
  width: 100%;
  height: px2rem(200px);
  z-index: 10;
  position: absolute;
  top: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;

  .countTime {
    // padding-top: px2rem(60px);
    height: px2rem(160px);
    font-size: px2rem(52px);
    color: #f80034;
    line-height: px2rem(160px);
    display: flex;
    justify-content: center;
  }

  .residue {
    // margin: px2rem(40px) 0;
    // height: px2rem(100px);
    color: #f80034;
    font-size: 18px;
    line-height: px2rem(100px);
    display: flex;
    justify-content: center;
  }
}

.paid {
  width: 100%;
  z-index: 10;
  position: absolute;
  top: px2rem(200px);
  bottom: px2rem(180px);

  .particulars {
    padding-top: px2rem(50px);
    width: 100%;

    .logol {
      width: 100%;
      height: px2rem(180px);
      line-height: px2rem(180px);
      text-align: center;

      .logo {
        width: px2rem(100px);
        height: px2rem(100px);
        vertical-align: middle;
      }
    }

    .subsection {
      color: #ccc;
      padding: px2rem(20px) px2rem(90px);
      font-size: 16px;

      .particulars {
        color: #181818;
      }
    }
  }
}

.footer {
  width: 100%;
  height: px2rem(300px);
  z-index: 10;
  color: #777;
  text-align: center;
  box-sizing: border-box;
  font-size: 14px;
  border-top: 1px solid #ccc;
  position: absolute;
  bottom: 0;

  .tip {
    font-size: 16px;
    line-height: px2rem(100px);
  }

  p {
    padding: 0 px2rem(80px);
  }
}

.detail {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: rgba(7, 17, 27, 0.8);
  overflow: auto;
  backdrop-filter: blur(px2rem(20px));

  &.fade-enter-active, &.fade-leave-active {
    transition: opacity 0.5s ease 1.5s;
  }

  &.fade-enter, &.fade-leave-active {
    opacity: 0;
  }
}

.pic {
  position: absolute;
  bottom: 0;
  right: 0;

  img {
    width: 100%;
    height: px2rem(340px);
    vertical-align: middle;
  }
}
</style>
