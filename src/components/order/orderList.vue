<template>
  <div class="listBox">
    <banner-header></banner-header>
    <ul class="dec" v-for="item in orderList">
      <li>订单编号：{{item.payid}}</li>
      <li>订单总额：{{item.money/100}}元</li>
      <li>机器运作状态：{{item.move | move}}</li>
      <li>订单状态：{{item.statu | statu}}</li>
      <li>创建时间：{{item.createdAt | creatAt2}}</li>
      <li v-if="(!item.move && item.statu == 1)">
        <span class="line"></span>
        <div class="btn">
          <x-button action-type='button' @click.native="move(item)" mini>立即启动</x-button>
          <x-button action-type='button' @click.native="refund(item)" mini>申请退款</x-button>
        </div>
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
            确认退款?
          </div>
          <div class="btns">
            <div class="sureBtn" @click="ensure">确定</div>
            <div class="cancelBtn" @click="cancel">取消</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import bannerHeader from "../header.vue";
import { XButton } from "vux";
export default {
  data() {
    return {
      orderList: [],
      isShow: false
    };
  },
  created() {
    this.axios.get(this.api+"/wx/getUser").then(res => {
      if (res.data.statu == 1) {
        // console.log("获取成功");
        this.user = res.data.user;
      } else {
        window.location = this.api+"/wx/login?goback=order";
        // console.log("已登录");
      }
    }),
      this.axios.get(this.api+"/wx/getMyOrder").then(res => {
        // console.log(res);
        if (res.data.statu) {
          this.orderList = res.data.list;
        } else {
          console.log("获取失败");
        }
      });
  },
  methods: {
    move(item) {
      // console.log(item.statu);
      if (!item.move && item.statu == 1) {
        sessionStorage.setItem("_CODE_", item.deviceId);
        // console.log('aaaa');
        this.$router.push({
          path: "/mcMove/" + item.price + "/" + item.time + "/" + item.payid
        });
      } else {
        return;
      }
    },
    refund(item) {
      if (!item.move && item.statu == 1) {
        this.order = item;
        console.log("跳转退款页面");
        this.isShow = !this.isShow;
      }
    },
    ensure() {
      console.log(this.order);
      this.isShow = !this.isShow;
      console.log("确认退款");
    },
    cancel() {
      this.isShow = !this.isShow;
      console.log("取消退款");
    }
  },
  components: { bannerHeader, XButton }
};
</script>


<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl';

.listBox {
  background-color: #ddd;
  height: 100%;

  .banner {
    padding: px2rem(40px) px2rem(40px) 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .dec {
    font-size: 14px;
    margin: px2rem(20px);
    padding: px2rem(40px) px2rem(40px) px2rem(20px);
    // border-bottom: 1px solid #000;
    background-color: #fff;
    border-radius: 10px;

    li {
      line-height: 1.5;
    }

    .line {
      display: inline-block;
      width: 100%;
      border-top: 1px solid black;
      /* margin-bottom 13px */
    }
  }

  .btn {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;

    button {
      background-color: #ddd;
    }
  }

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
    font-size: 14px;

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
        color: #666;
      }

      .btns {
        display: flex;
        height: px2rem(100px);
        line-height: px2rem(100px);
        color: #26a2ff;
        border-top: 1px solid #ccc;
      }

      .sureBtn, .cancelBtn {
        flex: 1;
      }

      .cancelBtn {
        color: red;
        // border-left 1px solid #ccc
      }
    }
  }
}
</style>
