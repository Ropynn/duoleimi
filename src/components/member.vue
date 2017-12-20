/* 套餐组件 */
<template>
  <div>
    <banner-header></banner-header>
    <!-- <app-shadow v-if="isShow" :change='change' :isShow='isShow'></app-shadow> -->
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
    <div class="makeSure" v-show="isShow">
      <div class="box">
        <div class="alert">
          系统提示
        </div>
        <div class="message">
          使用前请同意用户协议!
        </div>
        <div class="btn" @click="show">
          确定
        </div>
      </div>
    </div>
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
        this.flag = false;
        this.flc = true;
      } else {
        this.checked = "checked";
        this.val = "1";
        this.flag = true;
        this.flc = false;
      }
    },
    loading() {
      this.isShow = true;
    },

    show() {
      this.isShow = false;
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

<style lang="stylus" rel="stylesheet/stylus">
.member {
  margin-top: -50px;
  background-color: #ddd;
  position: relative;
  z-index: 10;

  .title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    color: #E2C99F;
    background-color: #FFFFFF;
  }

  .line {
    border: 2px solid #E0BC74;
  }

  /* 可用余额及其按钮 */
  .balance {
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #D7D7D7;
    background-color: #fff;

    .mint-cell-wrapper {
      line-height: 50px;
    }

    .mint-switch-input:checked + .mint-switch-core {
      border-color: #E0BC74;
      background-color: #E0BC74;
    }

    .mint-switch-core {
      display: inline-block;
      position: relative;
      width: 44px;
      height: 24px;
      border: 1px solid #d9d9d9;
      border-radius: 16px;
      box-sizing: border-box;
      background: #d9d9d9;
    }

    .mint-switch-core::after {
      width: 22px;
      height: 22px;
      background-color: #fff;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    }
  }

  /* 充值返送 */
  .activity {
    width: 100%;
    overflow: hidden;
    background-color: #fff;
    margin-bottom: 10px;

    .re-charge {
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 18px;
      padding-left: 30px;
      box-sizing: border-box;

      .recharge {
        color: #938D8D;
      }
    }

    .preference {
      padding: 10px 36px;
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
        width: 125px;
        line-height: 39px;
        text-align: center;
        margin: 10px 10px;
        border: 2px solid #554c4d;
        border-radius: 5px;

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
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 16px;
      position: relative;

      a {
        color: #E0BC74;
      }
    }
  }

  /* 遮罩层 */
  .makeSure {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vh;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 30;

    .box {
      position: absolute;
      top: 50%;
      right: 50%;
      margin-top: -100px;
      margin-left: -75px;
      width: 300px;
      height: 150px;
      background-color: #fff;
      color: red;
      text-align: center;

      .alert {
        height: 50px;
        line-height: 50px;
        color: #000;
        font-weight: bold;
      }

      .message {
        height: 50px;
        // line-height: 50px;
        color: #666;
      }

      .btn {
        height: 50px;
        line-height: 50px;
        color: #26a2ff;
        border-top: 1px solid #666;
      }
    }
  }

  /* 优惠券 */
  .coupon {
    background-color: #fff;

    .mint-cell-allow-right::after {
      border: solid 2px #E0BC74;
      border-bottom-width: 0;
      border-left-width: 0;
      content: ' ';
      top: 50%;
      right: 20px;
      position: absolute;
      width: 10px;
      height: 10px;
      -webkit-transform: translateY(-50%) rotate(45deg);
      transform: translateY(-50%) rotate(45deg);
    }

    .mint-cell {
      border-bottom: 2px solid #D7D7D7;
    }

    h4 {
      text-align: center;
      font-size: 20px;
      height: 50px;
      line-height: 50px;
    }

    .btn {
      padding: 0 20px;
    }

    button {
      text-align: center;
      width: 100%;
      height: 45px;
      background-color: #E0BC74;
      color: #fff;
    }
  }
}
</style>
