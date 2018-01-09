<template>
  <div>
    <banner-header></banner-header>
    <div>
      <p class="title">哆蕾咪微spa</p>
      <div class="line"></div>
    </div>

    <div class="btn">
      <button @click="mcMove">立即启动</button>
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
  </div>
</template>

<script>
import bannerHeader from "./header";
export default {
  props: {
    code: String
  },
  data() {
    return {
      time: "", //按摩时长
      price: "", //按摩价格
      currentTime: "", //当前时间
      orderId: "", //订单编号
      isShow: false
    };
  },
  methods: {
    mcMove() {
      this.price = this.$route.params.price;
      this.time = this.$route.params.minutes;
      this.orderId = this.$route.params.orderId;

      const equipmentCode = this.code;
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
              path:
                "/payment/" +
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
    }
  },
  components: {
    bannerHeader
  }
};
</script>

<style lang="stylus" scoped>
@import '../common/stylus/mixins.styl';

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

.btn {
  padding: 0 px2rem(100px);
}

// 立即支付按钮.
button {
  position: absolute;
  text-align: center;
  width: 50%;
  height: px2rem(90px);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: px2rem(4px) solid #E0BC74;
  border-radius: px2rem(20px);
  background-color: #E0BC74;
  font-size: 20px;
  color: #fff;
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
</style>
