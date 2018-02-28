<template>
  <div>
    <banner-header></banner-header>
    <div class="pic">
      <div class="box">
        <img src="../assets/logo2.png" alt="">
      </div>
    </div>

    <div class="moveBtn">
      <x-button action-type='button' @click.native="mcMove" mini>立即启动</x-button>
      <!-- <button @click="mcMove">立即启动</button> -->

    </div>
    <div class="tip">
      <p>提示：准备工作结束，点击启动即可</p>
    </div>

    <div class="playBtn">
      <button @click="play">点击查看使用教程</button>
    </div>

    <transition name="fade">
      <div class="makeSure" v-show="isShow" @touchmove.prevent>
        <div class="box">
          <div class="alert">
            系统提示
          </div>
          <div class="message">
            系统繁忙，请稍后再尝试!
          </div>
          <div class="btn" @click="show">
            确定
          </div>
        </div>
      </div>
    </transition>

    <!-- <transition name="fade">
      <div class="videos" v-if="flag" @touchmove.prevent>
        <div class="test" @click="close"></div> -->
    <!-- <video controls autoplay>
          <source src="../../static/introduce.mp4" type="video/mp4">
        </video> -->
    <!-- <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions" @play="onPlayerPlay($event)"
          @pause="onPlayerPause($event)">
        </video-player> -->
    <!-- </div>
    </transition> -->
  </div>
</template>

<script>
// import "video.js/dist/video-js.css";
// import { videoPlayer } from "vue-video-player";
import bannerHeader from "./header";
import { XButton } from "vux";
import { lchown } from "fs";

export default {
  props: {
    code: String
  },
  data() {
    return {
      price: "", //按摩价格
      currentTime: "", //当前时间
      orderId: "", //订单编号
      isShow: false,
      flag: false,
      order: {}
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
  // computed: {
  //   player() {
  //     return this.$refs.videoPlayer.player;
  //   }
  // },
  created() {
    this.axios.get("http://shop.doremes.com/wx/getMyOrder").then(res=>{
      console.log(res);
    })
  },
  methods: {
    //  onPlayerPlay(player) {
    //   console.log("play");
    // },
    // onPlayerPause(player) {
    //   console.log("pause");
    // },
    mcMove() {
      this.price = this.$route.params.price;
      this.time = this.$route.params.minutes;
      this.orderId = this.$route.params.orderId;

      const equipmentCode = this.code || sessionStorage.getItem("_CODE_");
      // console.log(equipmentCode);
      this.axios
        .post("http://shop.doremes.com/wx/mcMove", {
          time: this.time,
          code: equipmentCode,
          dis: 1111,
          order_id: this.orderId
        })
        .then(res => {
          console.log(res);
          if (res.data.statu == 1) {
            const obj = {};
            obj.overTime = res.data.order.overTime;
            obj.updatedAt = res.data.order.updatedAt;
            obj.payid = res.data.order.payid;
            obj.money = res.data.order.money;
            obj.time = res.data.order.time;
            sessionStorage.setItem("_ORDER_", JSON.stringify(obj));
            this.$router.push({ path: "/payment" });
          } else if (res.data.statu == 0) {
            this.isShow = !this.isShow;
          } else {
            this.isShow = !this.isShow;
          }
        })
        .catch(err => {
          console.log(err);
          this.isShow = !this.isShow;
        });
    },
    show() {
      this.isShow = !this.isShow;
    },
    play() {
      this.$router.push({
        path: "/video"
      });
      // this.flag = !this.flag;
    },
    close() {
      this.flag = !this.flag;
    }
  },
  components: {
    bannerHeader,
    XButton
  }
};
</script>

<style lang="stylus" scoped>
@import '../common/stylus/mixins.styl';

.pic {
  display: flex;
  justify-content: center;
  margin-top: px2rem(36px);
  padding: px2rem(50px);

  .box {
    width: px2rem(500px);
  }

  img {
    width: 100%;
  }
}

.moveBtn {
  padding-top: px2rem(60px);
  display: flex;

  button {
    text-align: center;
    width: 50%;
    border: px2rem(4px) solid #FF003E;
    border-radius: px2rem(20px);
    background-color: #FF003E;
    font-size: 20px;
    color: #fff;
  }
}

.tip {
  padding-top: px2rem(40px);
  display: flex;

  p {
    flex: 1;
    text-align: center;
  }
}

.playBtn {
  margin-top: px2rem(100px);
  margin-bottom: px2rem(30px);
  display: flex;
  width: 100%;
  justify-content: center;

  button {
    text-align: center;
    width: px2rem(410px);
    height: px2rem(110px);
    border: px2rem(4px) solid #FF003E;
    border-radius: px2rem(10px);
    background-color: #fff;
    font-size: 16px;
    color: #FF003E;
  }
}

/* 遮罩层 */
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
</style>
