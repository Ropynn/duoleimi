<template>
  <div>
    <banner-header></banner-header>
    <div class="container">
      <span class="line"></span>
      <span class="txt">{{home.setMeal}}</span>
      <span class="line"></span>
    </div>
    <!-- 套餐选择 -->
    <ul class="selective-type">
      <!-- 测试专用 -->
      <!-- <li class="set-meak">
        <router-link class="chaining" :to="'/member/'+5+'/'+0.1">
          <div class="single">
            <span class="unitPice">￥5</span>
            <span class="lengthTime" time='0+0.1'>5分钟</span>
          </div>
          <div class="functions">
            <span class="function">111</span>
          </div>
        </router-link> -->
      <!-- </li> -->

      <li class="set-meal" v-for="item in home.projects" @click="choosePay(item)">
        <router-link v-show="flag" class="chaining" to="" >
          <!-- <div v-show="flag" class="chaining" @click="choosePay"> -->
          <div class="single">
            <span class="unitPice">￥{{item.price}}</span>
            <span class="lengthTime" :time='0+item.time'>{{item.time}}分钟</span>
          </div>
          <div class="functions">
            <span class="function">{{item.name}}</span>
          </div>
          <!-- </div> -->
          </router-link>

          <!-- 如果没选中，路由跳转的地址就为home -->
          <router-link v-show="flc" class="chaining" :to="'/home'" @click.native='loading'>
            <div class="single">
              <span class="unitPice">￥{{item.price}}</span>
              <span class="lengthTime">{{item.time}}分钟</span>
            </div>
            <div class="functions">
              <span class="function">{{item.name}}</span>
            </div>
          </router-link>
      </li>

    </ul>

    <!-- 确认层 -->
    <transition name="fade">
      <div class="makeSure" v-show="isShow" @touchmove.prevent>
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
    </transition>

    <!-- 协议 -->
    <div class="service">
      <label class="agreementm" for="agreement">
        <input class="agreement" type="checkbox" :value="val" id="agreement" :checked="checked" @click="isCheck">
        <router-link to="/detail" class="agreementSure">同意用户协议</router-link>
      </label>
    </div>
  </div>

</template>

<script>
import bannerHeader from "./header";
import member from "./member";

// import wx from "weixin-js-sdk"; //引入微信接口

export default {
  data() {
    return {
      home: {},
      checked: "checked",
      val: "1",
      flag: true,
      flc: false,
      isShow: false,
      user: {},
      timestamp: "",
      nonceStr: "",
      signature: "",
      currentTime: ""
    };
  },

  methods: {
    //点击是否同意协议
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
    choosePay(item) {
      if (this.val != "1") {
        return;
      }
      this.axios
        .post("http://tsa.yzidea.com/wx/getPay", {
          time: item.time,
          money: item.price
        })
        .then(res => {
          console.log(res);

          if (res.data.statu == 1) {
            wx.chooseWXPay({
              timestamp: res.data.conf.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: res.data.conf.nonceStr, // 支付签名随机串，不长于 32 位
              package: res.data.conf.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
              signType: res.data.conf.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: res.data.conf.paySign, // 支付签名
  
              success: (res) => {
                // 支付成功后的回调函数
                this.currentTime = new Date().getTime();
                console.log("支付成功后的成功回调");
                this.$router.push({
                  path: "/payment/" + item.price + "/" + item.time +"/" + this.currentTime
                  // path: '/payment'
                });
              }
            });
          }
        });
    }
  },
  created() {
    //判断是否授权登录
    this.axios.get("http://tsa.yzidea.com/wx/getUser").then(res => {
      // console.log("------------------------------------");
      // console.log(JSON.stringify(res));
      // console.log(res.data.statu);
      // console.log(typeof res.data.statu);
      if (res.data.statu == 1) {
        console.log("获取成功");
        this.user = res.data.user;
        // this.$router.push("home");
      } else {
        window.location = "http://tsa.yzidea.com/wx/login?goback=home";
        console.log("获取失败");
      }
    });

    this.axios.get("/api/home").then(res => {
      // console.log(res);
      this.home = res.data.data;
    });

    this.axios
      .post("http://tsa.yzidea.com/wx/getConf", {
        path: window.location.href
      })
      .then(res => {
        console.log(res);
        // this.conf = res.data.conf;
        console.log("-------------------");
        this.timestamp = res.data.conf.timestamp;
        console.log(this.timestamp);
        this.nonceStr = res.data.conf.nonceStr;
        console.log(this.nonceStr);
        this.signature = res.data.conf.signature;
        console.log(this.signature);

        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: "wx56c21278b4ecee79", // 必填，公众号的唯一标识
          timestamp: this.timestamp, // 必填，生成签名的时间戳
          nonceStr: this.nonceStr, // 必填，生成签名的随机串
          signature: this.signature, // 必填，签名，见附录1
          jsApiList: ["chooseWXPay"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
      });
  },

  mounted() {},
  components: {
    member,
    bannerHeader
  }
};
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../common/stylus/mixins.styl';

.container {
  width: 100%;
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
    font-size: 20px;
    vertical-align: middle;
    text-align: center;
  }
}

.selective-type {
  width: 100%;
  padding: 0px px2rem(120px);
  box-sizing: border-box;

  .set-meal {
    width: px2rem(400px);
    height: px2rem(120px);
    /* line-height 60px */
    margin: px2rem(60px) auto;
    border: px2rem(4px) solid #DEB882;
    border-radius: px2rem(20px);

    .chaining {
      width: 100%;
      height: px2rem(120px);
      display: flex;
      justify-content: center;

      .single {
        width: px2rem(200px);
        height: px2rem(120px);
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        border-right: px2rem(4px) dashed #DFCB86;

        .unitPice {
          width: px2rem(200px);
          height: px2rem(60px);
          display: block;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 22px;
          font-weight: border;
          color: #E2B963;
        }

        .lengthTime {
          width: px2rem(200px);
          height: px2rem(60px);
          display: block;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          color: #E2B963;
        }
      }

      .functions {
        width: px2rem(200px);
        height: px2rem(120px);
        display: flex;
        align-items: center;
        justify-content: center;

        .function {
          width: px2rem(200px);
          height: px2rem(120px);
          display: block;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 20px;
          color: #74716D;
        }
      }
    }
  }
}

// 遮罩层
// 过渡效果
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to { /* .fade-leave-active in below version 2.1.8 */
  opacity: 0;
}

.makeSure {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 30;

  .box {
    position: absolute;
    width: px2rem(500px);
    height: px2rem(300px);
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

.service {
  width: 100%;
  height: px2rem(160px);
  /* background-color deeppink */
  line-height: px2rem(160px);
  text-align: center;
  position: absolute;
  button: 0;
  left: 0;

  label {
    height: 100%;
  }

  .agreementSure {
    // color: blue;
    color: #ccc;
  }
}
</style>
