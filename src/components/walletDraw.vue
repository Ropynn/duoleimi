<template>
  <div class="walletDraw">
    <div class="drawBox">
      <group>
        <p>提现金额</p>
        <x-input title="￥" placeholder-align="right" v-model="amount" type='number' @on-change="change"></x-input>
        <div class="money">
          <span class="num" v-show="isShow">可用余额&nbsp;{{money| fmoney}}元</span>
          <span class="num warn" v-show="!isShow">金额已超过可提现金额</span>
          <span @click="draw">全部提现</span>
        </div>
      </group>
    </div>
    <div class="btn">
      <x-button action-type="button" type="warn" :disabled="disabled" @click.native="submit">确认提现</x-button>
    </div>
  </div>
</template>

<script>
import { XInput, Group, XButton } from "vux";
export default {
  data() {
    return {
      money: this.$route.params.money,
      amount: "",
      disabled: true,
      isShow: true
    };
  },
  methods: {
    //全部提现
    draw() {
      this.amount = this.money;
    },
    //点击提交
    submit() {
      console.log("提交");
      /* -------------
        发送给后台的代码写在这里
      ----------- */
      this.money -= this.amount;
      this.amount = "";
      // this.$router.push({
      //   path:'/wallet'
      // })
    },
    //金额发生改变时
    change() {
      // console.log(this.amount);
      if (this.amount != "" && this.check(this.amount)) {
        this.disabled = false;
        if (Number(this.amount) > Number(this.money)) {
          this.isShow = false;
          this.disabled = true;
        } else {
          this.disabled = false;
          this.isShow = true;
        }
      } else if (Number(this.amount) > Number(this.money)) {
        this.isShow = false;
        this.disabled = true;
      } else {
        this.disabled = true;
      }
    },
    //检查输入金额的格式
    check(str) {
      var myreg = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
      if (!myreg.test(str)) {
        return false;
      } else {
        return true;
      }
    }
  },
  components: { XInput, XButton, Group }
};
</script>

<style lang="stylus" scoped>
@import '../common/stylus/mixins.styl';

.walletDraw {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-color: #f5f4f9;
  font-family: Arial, Helvetica, sans-serif;

  .drawBox {
    background-color: #fff;
    padding: 0 px2rem(30px);

    p {
      height: px2rem(100px);
      line-height: px2rem(100px);
    }
  }

  .money {
    height: px2rem(100px);
    line-height: px2rem(100px);
    display: flex;
    justify-content: space-between;

    .num {
      font-weight: bold;
      color: #bbb;
    }

    .warn {
      color: #FF003E;
    }

    span {
      color: #1296db;
      font-size: 16px;
      font-weight: bold;
    }
  }

  .btn {
    margin: px2rem(30px);
  }

  .vux-x-input {
    border-bottom: 1px solid #D9D9D9;
  }

  .weui-cell:before {
    border-top: 0;
  }
}
</style>

