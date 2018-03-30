<template>
  <div>
    <banner-header></banner-header>
    <div class="tip">
      <p class="desc">
        <img src="../assets/laba.png"> 专享优惠：新用户首单9.9元体验疏通排毒套餐！
      </p>
    </div>
    <div class="container">
      <span class="line"></span>
      <span class="txt">套餐选择</span>
      <span class="line"></span>
    </div>

    <!-- 套餐选择 -->
    <!-- 活动套餐 -->
    <!-- <ul class="selective-type">
      <li class="pic" v-show="isFirst">
        <img src="../assets/aa.png" alt="">
      </li>
      <li class="set-meal" v-for="item in home.projects" @click="choosePay(item)">
        <!-- <router-link v-show="flag" class="chaining" to=""> -->
    <!-- <router-link class="chaining" to="">
          <div class="single">
            <span class="unitPice">￥{{item.price}}</span>
            <span class="lengthTime" :time='0+item.time'>{{item.time}}分钟</span>
            <!-- <span>1</span> -->
    <!-- </div>
          <div class="functions">
            <span class="function">{{item.name}}</span>
          </div>
        </router-link> -->
    <!-- </li> -->
    <!-- </ul> -->

    <!-- 本地套餐 -->
    <ul class="selective-type">
      <li class="pic" v-show="isFirst">
        <img src="../assets/aa.png" alt="">
      </li>
      <li class="set-meal" v-for="item in home.projects" @click="choosePay(item)">
        <router-link class="chaining" to="">
          <div class="single">
            <span class="unitPice">￥{{item.price}}</span>
            <span class="lengthTime" :time='0+item.time'>{{item.time}}分钟</span>
          </div>
          <div class="functions">
            <span class="function">{{item.name}}</span>
          </div>
        </router-link>
      </li>
    </ul>

    <!-- 后台套餐 -->
    <!-- <ul class="selective-type">
      <li class="pic" v-show="isFirst">
        <img src="../assets/aa.png" alt="">
      </li>
      <li class="set-meal" v-for="(item,index) in home" @click="choosePay(item,index)">
        <router-link class="chaining" to="">
          <div class="single">
            <span class="unitPice">￥{{item.price}}</span>
            <span class="lengthTime" :time='0+item.time'>{{item.time}}分钟</span>
          </div>
          <div class="functions">
            <span class="function">{{item.tips}}</span>
          </div>
        </router-link>
      </li>
    </ul> -->

    <!-- <div class="container"> -->
    <!-- <div class="player">
        <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions" @play="onPlayerPlay($event)"
          @pause="onPlayerPause($event)">
        </video-player>
      </div> -->
    <!-- </div> -->
    <div class="playBtn">
      <button @click="play">点击查看使用教程</button>
    </div>

    <!-- 使用教程 -->
    <!-- <transition name="fade">
      <div class="videos" v-if="flag" @touchmove.prevent>
        <div class="test" @click="close"></div> -->
    <!-- <video controls autoplay>
          <source src="../../static/introduce.mp4" type="video/mp4">
        </video> -->
    <!-- <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions" @play="onPlayerPlay($event)"
          @pause="onPlayerPause($event)">
        </video-player>
      </div>
    </transition> -->

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
      <label class="agreement" for="agreement">
        <input class="agreement" type="checkbox" :value="val" id="agreement" :checked="checked" @click="isCheck">
        <router-link to="/detail" class="agreementSure">同意用户协议</router-link>
      </label>
    </div>
  </div>

</template>

<script>
import bannerHeader from "./header";
// import member from "./member";
// import "video.js/dist/video-js.css";
// import { videoPlayer } from "vue-video-player";

export default {
  props: {
    code: String
  },
  data() {
    return {
      home: [],
      checked: "checked",
      val: "1",
      flag: false,
      flc: false,
      isShow: false,
      user: {},
      appId: "",
      timestamp: "",
      nonceStr: "",
      signature: "",
      currentTime: "",
      orderId: " ",
      jsApiList: [],
      isFirst: true,
      investor: false
      // playerOptions: {
      //   //        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
      //   autoplay: false, //如果true,浏览器准备好时开始回放。
      //   muted: false, // 默认情况下将会消除任何音频。
      //   loop: false, // 导致视频一结束就重新开始。
      //   preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
      //   language: "zh-CN",
      //   aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
      //   fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
      //   sources: [
      //     {
      //       type: "video/mp4",
      //       src: "../../static/introduce.mp4" //你的m3u8地址（必填）
      //     }
      //   ],
      //   // poster: "poster.jpg", //你的封面地址
      //   width: document.documentElement.clientWidth,
      //   notSupportedMessage: "此视频暂无法播放，请稍后再试" //允许覆盖Video.js无法播放媒体源时显示的默认信息。
      //   //        controlBar: {
      //   //          timeDivider: true,
      //   //          durationDisplay: true,
      //   //          remainingTimeDisplay: false,
      //   //          fullscreenToggle: true  //全屏按钮
      //   //        }
      // }
    };
  },

  created() {
    // const equipmentCode = this.code;
    // alert(equipmentCode);
    // console.log(this.$route.query.code);

    //判断是否授权登录
    this.axios.get(this.api + "/wx/getUser?code=" + this.code).then(res => {
      console.log(res);
      if (res.data.statu == 1) {
        this.investor = res.data.investor;
        this.user = res.data.user;
        this.isFirst = res.data.user.firstpay;
      } else {
        window.location = this.api + "/wx/login?goback=home?code=" + this.code;
      }
    });

    //后台获取套餐
    // this.axios
    //   .get(this.api + "/wx/getMoneyPackage?code=" + this.code)
    //   .then(res => {
    //     console.log("-------------------");
    //     console.log(res);
    //     console.log("-------------------");
    //     this.home = res.data.data;

    //     //如果没有列表,首单图片隐藏
    //     // if (this.home.length < 2) {
    //     //   this.isFirst = false;
    //     // }
    //   });

    //本地套餐
    this.axios.get("/api/home").then(res => {
      this.home = res.data.data;
    });

    this.axios
      .post(this.api + "/wx/getConf", {
        path: this.api + "/#" + this.$route.path
      })
      .then(res => {
        // console.log("------------------");
        // console.log(res);
        // console.log("------------------");
        this.appId = res.data.conf.appId;
        this.timestamp = res.data.conf.timestamp;
        this.nonceStr = res.data.conf.nonceStr;
        this.signature = res.data.conf.signature;
        this.jsApiList = res.data.conf.jsApiList;
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: this.appId, // 必填，公众号的唯一标识
          timestamp: this.timestamp, // 必填，生成签名的时间戳
          nonceStr: this.nonceStr, // 必填，生成签名的随机串
          signature: this.signature, // 必填，签名，见附录1
          jsApiList: this.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
      });
  },

  // computed: {
  //   player() {
  //     return this.$refs.videoPlayer.player;
  //   }
  // },

  mounted() {},

  methods: {
    // onPlayerPlay(player) {
    //   console.log("play");
    // },
    // onPlayerPause(player) {
    //   console.log("pause");
    // },

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
    close() {
      this.flag = !this.flag;
    },
    play() {
      this.$router.push({
        path: "/video"
      });
      // this.flag = !this.flag;
    },
    loading() {
      this.isShow = true;
    },

    show() {
      this.isShow = false;
    },

    //点击调用微信支付的方法
    choosePay(item) {
      const equipmentCode = this.code;
      if (this.val != "1") {
        this.loading();
        return;
      }

      this.axios
        .post(this.api + "/wx/getPay", {
          time: item.time,
          money: item.price,
          code: equipmentCode
        })
        .then(res => {
          console.log(res);
          //如果是设备方
          if (res.data.statu == 2) {
            this.$router.push({
              path:
                "/mcMove/" + item.price + "/" + item.time + "/" + this.orderId
            });
          } else if (res.data.statu == 1) {
            //如果不是设备方
            if (res.data.statu == 1) {
              this.orderId = res.data.order_id;
              wx.chooseWXPay({
                timestamp: res.data.conf.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: res.data.conf.nonceStr, // 支付签名随机串，不长于 32 位
                package: res.data.conf.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                signType: res.data.conf.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: res.data.conf.paySign, // 支付签名

                // 支付成功后的回调函数
                success: res => {
                  this.$router.push({
                    path:
                      "/mcMove/" +
                      item.price +
                      "/" +
                      item.time +
                      "/" +
                      this.orderId
                  });
                }
              });
            }
          } else {
            console.log("请求失败");
            return;
            console.log(res);
          }
        });

      // if (this.investor == true) {
      //   this.$router.push({
      //     path: "/mcMove/" + item.price + "/" + item.time + "/" + this.orderId
      //   });
      // } else {
      //   this.axios
      //     .post(this.api + "/wx/getPay", {
      //       time: item.time,
      //       money: item.price,
      //       code: equipmentCode
      //     })
      //     .then(res => {
      //       if (res.data.statu == 1) {
      //         this.orderId = res.data.order_id;
      //         wx.chooseWXPay({
      //           timestamp: res.data.conf.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      //           nonceStr: res.data.conf.nonceStr, // 支付签名随机串，不长于 32 位
      //           package: res.data.conf.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
      //           signType: res.data.conf.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      //           paySign: res.data.conf.paySign, // 支付签名

      //           // 支付成功后的回调函数
      //           success: res => {
      //             this.$router.push({
      //               path:
      //                 "/mcMove/" +
      //                 item.price +
      //                 "/" +
      //                 item.time +
      //                 "/" +
      //                 this.orderId
      //             });
      //           }
      //         });
      //       }
      //     });
      // }
    }
  },
  components: {
    // member,
    bannerHeader
    // videoPlayer
  }
};
</script>


<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../common/stylus/mixins.styl';

// @import "../common/stylus/button.css";
.tip {
  display: flex;
  justify-content: center;
  color: #FF003E;
  font-size: 12px;
  height: px2rem(60px);
  line-height: px2rem(60px);

  .desc {
    text-align: center;
    width: px2rem(700px);
    border: 1px solid #FF003E;
  }

  img {
    width: px2rem(50px);
    vertical-align: middle; // hei px2rem(20px)
  }
}

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
    font-size: 18px;
    vertical-align: middle;
    text-align: center;
  }
}

.selective-type {
  position: relative;
  width: 100%;
  padding: 0px px2rem(120px);
  box-sizing: border-box;

  .pic {
    position: absolute;
    top: 0;
    right: px2rem(170px);

    img {
      width: px2rem(80px);
    }
  }

  .set-meal {
    width: px2rem(400px);
    height: px2rem(120px);
    /* line-height 60px */
    margin: px2rem(40px) auto;
    border: px2rem(4px) solid #FF003E;
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
        border-right: px2rem(4px) dashed #FF003E;

        .unitPice {
          width: px2rem(200px);
          height: px2rem(60px);
          display: block;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 20px;
          font-weight: border;
          color: #FF003E;
        }

        .lengthTime {
          width: px2rem(200px);
          height: px2rem(60px);
          display: block;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 18px;
          color: #FF003E;
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
          font-size: 18px;
          color: #000;
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

.fade-enter, .fade-leave-to {
  /* .fade-leave-active in below version 2.1.8 */
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
      height: px2rem(100px); // line-height: 50px;
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

.playBtn {
  margin-top: px2rem(80px);
  display: flex;
  width: 100%;
  justify-content: center;

  button {
    text-align: center;
    width: px2rem(410px);
    height: px2rem(110px);
    border: px2rem(4px) solid #FF003E;
    border-radius: px2rem(10px);
    background-color: #FF003E;
    font-size: 16px;
    color: #fff;
  }
}

.videos {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 30;

  .test {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .video-player {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.service {
  width: 100%;
  height: px2rem(130px);
  /* background-color deeppink */
  line-height: px2rem(130px);
  text-align: center;
  position: absolute;
  button: 0;
  left: 0;

  label {
    height: 100%;
  }

  .agreementSure {
    color: #ccc;
  }
}
</style>
