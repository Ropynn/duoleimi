/* 套餐组件 */
<template>
  <div>
    <banner-header></banner-header>
    <!-- <app-shadow v-show="isShow" :change='change'></app-shadow> -->
    <div class="member">
      <p class="title">{{member.headings}}</p>
      <div class="line"></div>

      <div class="balance">
        <!-- 引入mint-ui的switch -->
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <!---->
            <span class="mint-cell-text">可用余额：0.00</span>
            <!---->
          </div>
          <div class="mint-cell-value">
            <label class="mint-switch"><input type="checkbox" class="mint-switch-input">
              <span class="mint-switch-core"></span>
              <div class="mint-switch-label"></div>
            </label>
          </div>
          <!---->
        </div>

      </div>

      <!-- 活动 充值返现-->
      <div class="activity">
        <div class="re-charge">
          <span class="recharge">充值返送</span>
        </div>
        <ul class="preference">
          <li class="particulars" v-for="item in member.recharges">
            <router-link to="/" v-show="flag">充 {{item.charge}} 送{{item.send}} </router-link>
            <router-link to="" v-show="flc" @click.native='loading'>充 {{item.charge}} 送{{item.send}} </router-link>
          </li>
        </ul>

        <div class="service">
          <label class="agreementm" for="agreement">
            <input class="agreement" type="checkbox" :value="val" id="agreement" :checked="checked" @click='isCheck'> 我已阅读并同意
            <router-link to="">《摩摩哒充返协议》</router-link>
          </label>
        </div>
      </div>

      <!-- 优惠券 -->
      <div class="coupon">
        <!-- 引入mint-ui的cell -->
        <router-link class="mint-cell" to="">
          <span class="mint-cell-mask"></span>
          <div class="mint-cell-left"></div>
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <span class="mint-cell-text">优惠券</span>
            </div>
            <div class="mint-cell-value is-link">
              <span>未使用&nbsp;&nbsp;</span>
            </div>
            <i class="mint-cell-allow-right"></i>
          </div>
          <div class="mint-cell-right"></div>
        </router-link>
        <h4>本次支付：{{this.$route.params.price}}.00</h4>
        <div class="btn">
          <button @click="getCurrentTime">
            <!-- <router-link :to="'/payment/'+this.price+'/'+this.minutes+'/'+this.nowTime">立即启动</router-link> -->
            立即启动
            <!-- <router-link :to="'/payment/'+this.price+'/'+this.minutes">立即启动</router-link> -->
          </button>
        </div>

      </div>
    </div>

    <!-- 确认层 -->
    <transition name="fade">
      <div class="makeSure" v-show="isShow" @touchmove.prevent>
        <div class="box">
          <div class="alert">
            系统提示
          </div>
          <div class="message">
            使用前请同意协议!
          </div>
          <div class="btn" @click="show">
            确定
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
// import Bus from "../common/js/bus.js";
import bannerHeader from "./header"; //引入头部组件
// import appShadow from "./common/shadow.vue"; //引入遮罩层

export default {
  data() {
    return {
      member: {},
      price: this.$route.params.price, //获取前一个页面传过来的价钱
      minutes: this.$route.params.minutes, //获取前一个页面传过来的时间
      currentTime: "", //当前时间,
      checked: "checked",
      isShow: false,
      val: "1",
      flag: true,
      flc: false
    };
  },
  created() {
    this.$route.params.price
    this.axios.get("/api/member").then(res => {
      this.member = res.data.data;
    });

    // console.log(this.time);
    // this.nowTime = new Date().getTime();
    // console.log(this.nowTime);
  },
  methods: {
    //点击获取按摩开始的时间
    getCurrentTime() {
      this.currentTime = new Date().getTime();
      // console.log(this.nowTime);

      this.$router.push({
        path:
          "/payment/" + this.price + "/" + this.minutes + "/" + this.currentTime
      });

      //通过eventBus传递按摩开始的时间
      // Bus.$emit("currentTime", this.currentTime);
    },

    //确认是否勾上协议
    isCheck() {
      if (this.checked == "checked") {
        this.checked = "";
        this.val = "0";
        this.flag = !this.flag;
        this.flc = !this.flc;
      } else {
        this.checked = "checked";
        this.val = "1";
        this.flag = !this.flag;
        this.flc = !this.flc;
      }
    },
    loading() {
      this.isShow = !this.isShow;
    },

    show() {
      this.isShow = !this.isShow;
    },

    change(data) {
      console.log(data);
      // isShow = false;
    }
  },

  //使用header公共组件
  components: {
    bannerHeader
    // ,appShadow
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../common/stylus/mixins.styl';

/* 遮罩层 */
.makeSure {
  position: fixed;
  bottom : 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 30;

  .box {
    width: px2rem(500px);
    height: px2rem(300px);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    color: red;
    text-align: center;

    .alert {
      height: px2rem(100px);
      line-height: px2rem(100px);
      color: #000;
      font-weight: bold;
    }

    .message {
      height: px2rem(100px);
      // line-height: 50px;
      color: #666;
    }

    .btn {
      height: px2rem(100px);
      line-height: px2rem(100px);
      color: #26a2ff;
      border-top: 1px solid #666;
    }
  }
}

// 过渡效果
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to { /* .fade-leave-active in below version 2.1.8 */
  opacity: 0;
}

.member {
  margin-top: px2rem(-100px);
  background-color: #ddd;
  position: relative;
  z-index: 10;

  .title {
    width: 100%;
    height: px2rem(100px);
    line-height: px2rem(100px);
    text-align: center;
    font-size: 18px;
    color: #E2C99F;
    background-color: #FFFFFF;
  }

  .line {
    border: px2rem(4px) solid #E0BC74;
  }

  /* 可用余额及其按钮 */
  .balance {
    width: 100%;
    height: px2rem(100px);
    line-height: px2rem(100px);
    border-bottom: 1px solid #D7D7D7;
    background-color: #fff;

    .mint-cell-wrapper {
      line-height: px2rem(100px);
    }

    .mint-switch-input:checked + .mint-switch-core {
      border-color: #E0BC74;
      background-color: #E0BC74;
    }

    .mint-switch-core {
      display: inline-block;
      position: relative;
      width: px2rem(88px);
      height: px2rem(48px);
      border: 1px solid #d9d9d9;
      border-radius: 16px;
      box-sizing: border-box;
      background: #d9d9d9;
    }

    .mint-switch-core::after {
      width: px2rem(44px);
      height: px2rem(44px);
      background-color: #fff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    }
  }

  /* 充值返送 */
  .activity {
    width: 100%;
    overflow: hidden;
    background-color: #fff;
    margin-bottom: px2rem(20px);

    .re-charge {
      width: 100%;
      height: px2rem(60px);
      line-height: px2rem(60px);
      font-size: 18px;
      padding-left: px2rem(60px);
      box-sizing: border-box;

      .recharge {
        color: #938D8D;
      }
    }

    .preference {
      padding: px2rem(20px) px2rem(72px);
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;

      &:after {
        content: '';
        clear: both;
        display: table;
      }

      li {
        float: left;
        width: px2rem(250px);
        line-height: px2rem(78px);
        text-align: center;
        margin: px2rem(20px) px2rem(20px);
        border: px2rem(4px) solid #554c4d;
        border-radius: px2rem(10px);

        a {
          display: block;
          font-size: 14px;
          color: #A19C99;
        }
      }
    }

    /* 协议 */
    .service {
      width: 100%;
      height: px2rem(80px);
      line-height: px2rem(80px);
      text-align: center;
      font-size: 16px;
      position: relative;

      a {
        color: #E0BC74;
      }
    }
  }

  /* 优惠券 */
  .coupon {
    background-color: #fff;
    margin-bottom: px2rem(40px);

    .mint-cell-allow-right::after {
      border: solid px2rem(4px) #E0BC74;
      border-bottom-width: 0;
      border-left-width: 0;
      content: ' ';
      top: 50%;
      right: px2rem(40px);
      position: absolute;
      width: px2rem(20px);
      height: px2rem(20px);
      -webkit-transform: translateY(-50%) rotate(45deg);
      transform: translateY(-50%) rotate(45deg);
    }

    .mint-cell {
      border-bottom: px2rem(4px) solid #D7D7D7;
    }

    h4 {
      text-align: center;
      font-size: 20px;
      height: px2rem(100px);
      line-height: px2rem(100px);
    }

    .btn {
      padding: 0 px2rem(40px);
    }

    // 立即支付按钮.

    button {
      text-align: center;
      width: 100%;
      height: px2rem(90px);
      border: px2rem(4px) solid #E0BC74;
      border-radius: px2rem(20px);
      background-color: #E0BC74;
      font-size: 20px;
      color: #fff;
    }
  }
}
</style>
