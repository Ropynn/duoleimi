<template>
  <div class="wallet">
    <header>
      <div class="balance">
        <div>账户余额（元）</div>
        <div class="allMoney">{{money | fmoney}}</div>
      </div>
    </header>
    <div class="withdraw">
      <group>
        <!-- <cell title="充值" is-link>
          <i class="iconfont icon-tixian"></i>
        </cell> -->
        <!-- <cell title="提现" is-link :link="walletDraw"> -->
        <cell title="提现" is-link @click.native="show">
          <i class="iconfont icon-zaixianchongzhi"></i>
        </cell>
        <!-- <cell title="提现明细" is-link link="/walletDetail"> -->
        <cell title="提现明细" is-link @click.native="show">
          <i class="iconfont icon-icon_gongzimingxi"></i>
        </cell>
      </group>
    </div>

    <!-- 确认层 -->
    <transition name="fade">
      <div class="makeSure" v-show="isShow" @touchmove.prevent>
        <div class="box">
          <!-- <div class="alert">
            系统提示
          </div> -->
          <div class="message">
            此功能暂未开放！
          </div>
          <div class="btn" @click="show">
            确定
          </div>
        </div>
      </div>
    </transition>
    <!-- 无权限 -->
    <transition name="fade">
      <div class="makeSure can" v-show="isCan" @touchmove.prevent>
        <div class="box">
          <div class="message">
            无权限
          </div>
        </div>
      </div>
    </transition>
  </div>

</template>

<script>
import { Cell, Group, CellBox } from "vux";

export default {
  data() {
    return {
      isShow: false,
      isCan: false,
      money: "",
      user: {},
      walletDraw: ""
    };
  },
  created() {
    this.axios.get(this.api + "/wx/getUser").then(res => {
      if (res.data.statu == 1) {
        this.user = res.data.user;
      } else {
        window.location = this.api + "/wx/login?goback=wallet";
      }
    });

    //判断用户是否是商家
    this.axios.get(this.api + "/wx/getAllMoney").then(res => {
      console.log(res);
      // alert(res.data.statu)
      console.log(res.data.statu);
      //不是商家弹出无权限遮罩层
      if (res.data.statu == 0) {
        this.money = res.data.money / 100;
        this.isCan = true;
        // console.log("000");
        // this.$router.push({
        //   path: "/jurisdiction"
        // });
      } else if (res.data.statu) {
        //是商家,没有遮罩层

        this.money = res.data.money / 100;
      }
      this.walletDraw = "/walletDraw" + "/" + this.money;
    });
    this.axios.get("/api/withdrawList").then(res => {
      // console.log(res);
      this.withdrawList = res.data.withdrawList;
    });
  },
  methods: {
    show() {
      this.isShow = !this.isShow;
    }
  },
  components: {
    Group,
    Cell,
    CellBox
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl';

.wallet {
  background-color: #f6f5fa;

  header {
    background-color: #fe4871;
    padding: px2rem(30px) px2rem(30px);
    position: relative;
  }

  .balance {
    display: inline-block;
    // padding-left: px2rem(20px);
    font-size: 12px;
    vertical-align: middle;
    color: #ccc;

    .allMoney {
      font-size: 40px;
      height: px2rem(180px);
      line-height: px2rem(180px);
      color: #fff;
    }
  }

  .withdraw {
    font-size: 16px;
  }

  .weui-cell {
    position: relative;
    padding-left: px2rem(100px);

    i {
      font-size: 28px;
      position: absolute;
      top: px2rem(-40px);
      left: px2rem(-670px);
    }

    .icon-tixian {
      color: #1296db;
    }

    .icon-zaixianchongzhi {
      color: #eeb174;
    }

    .icon-icon_gongzimingxi {
      color: #1afa29;
    }
  }

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
    font-family: 'Arial, Helvetica, sans-serif';

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

      // .alert {
      // height: px2rem(100px);
      // line-height: px2rem(100px);
      // color: #000;
      // font-weight: bold;
      // }
      .message {
        font-size: 16px;
        line-height: px2rem(200px);
        height: px2rem(200px); // line-height: 50px;
        color: #000;
      }

      .btn {
        height: px2rem(100px);
        line-height: px2rem(100px);
        color: #26a2ff;
        border-top: 1px solid #666;
      }
    }
  }

  .can {
    .box {
      width: px2rem(500px);
      height: px2rem(300px);

      .message {
        position: absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        font-size: 18px;
        color: red;
      }
    }
  }
}
</style>


