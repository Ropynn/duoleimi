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

    <transition name="fade">
      <div class="videos" v-if="flag">
        <div class="test" @click="close"></div>
        <video controls autoplay>
          <source src="../../static/q.mp4" type="video/mp4">
        </video>
      </div>
    </transition>
  </div>
</template>

<script>
  import bannerHeader from "./header";
  import {
    XButton
  } from "vux";

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
        flag: true
      };
    },
    methods: {
      mcMove() {
        this.price = this.$route.params.price;
        this.time = this.$route.params.minutes;
        this.orderId = this.$route.params.orderId;

        const equipmentCode = this.code || sessionStorage.getItem("_CODE_");
        // console.log(equipmentCode);

        this.axios
          .post("http://tsa.yzidea.com/wx/mcMove", {
            time: this.time,
            code: equipmentCode,
            dis: 1111,
            order_id: this.orderId
          })
          .then(res => {
            if (res.data.statu == 1) {
              this.currentTime = new Date().getTime() + 2000;
              this.$router.push({
                path: "/payment/" +
                this.price +
                "/" +
                this.time +
                "/" +
                this.currentTime
              });
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
        this.flag = !this.flag;
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
    display flex;
    justify-content center;
    margin-top px2rem(50px);
    padding px2rem(50px);
    .box {
      width px2rem(500px);
    }
    img {
      width 100%;
    }
  }

  .moveBtn {
    padding-top: px2rem(80px);
    display flex;
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
    padding-top px2rem(50px);
    display flex;
    p {
      flex 1;
      text-align center
    }
  }

  .playBtn {
    margin-top px2rem(150px);
    display flex;
    width 100%;
    justify-content: center;
    button {
      text-align: center;
      width px2rem(410px);
      height px2rem(110px);
      border: px2rem(4px) solid #FF003E;
      border-radius: px2rem(10px);
      background-color: #fff;
      font-size: 16px;
      color: #FF003E;
    }
  }

  /* 遮罩层 */

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
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
      position absolute;
      top 0;
      left 0;
      width 100%;
      height 100%
    }
    video {
      position absolute;
      width 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

</style>

