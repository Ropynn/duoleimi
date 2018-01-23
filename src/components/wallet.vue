<template>
  <div class="wallet">
    <header>
      <div class="balance">
        <div>账户余额（元）</div>
        <div class="allMoney">{{money | fmoney}}</div>
      </div>
      <!-- <div class="headimg">
        <img :src="user.headimgurl">
      </div> -->
    </header>
    <div class="withdraw">
      <group>
        <cell title="充值" is-link></cell>
        <cell title="提现" is-link></cell>
        <cell title="提现明细" is-link></cell>
      </group>
    </div>
  </div>

</template>

<script>
import { Cell, Group, CellBox } from "vux";

export default {
  data() {
    return {
      money: "",
      user: {}
    };
  },
  created() {
    this.axios.get("http://tsa.yzidea.com/wx/getUser").then(res => {
      if (res.data.statu == 1) {
        this.user = res.data.user;
      } else {
        window.location = "http://tsa.yzidea.com/wx/login?goback=wallet";
      }
    });
    this.axios.get("http://tsa.yzidea.com/wx/getAllMoney").then(res => {
      console.log(res);
      this.money =
        (res.data.investor / 1 +
          res.data.owner / 1 +
          res.data.partner / 1 +
          res.data.platform / 1) /
        100;
      // console.log(this.money);
    });
    this.axios.get("/api/withdrawList").then(res => {
      console.log(res);
      this.withdrawList = res.data.withdrawList;
    });
  },
  components: {
    Group,
    Cell,
    CellBox
  }
};
</script>

<style lang="stylus" scoped>
@import '../common/stylus/mixins.styl';

.wallet {
  background-color: #f6f5fa;

  header {
    background-color: #fe4871;
    padding: px2rem(30px) px2rem(20px);
    position: relative;
  }

  .headimg {
    display: inline-block;

    img {
      height: px2rem(100px);
      vertical-align: middle;
    }
  }

  .balance {
    display: inline-block;
    // padding-left: px2rem(20px);
    font-size: 12px;
    vertical-align: middle;
    color: #ccc;

    .allMoney {
      font-size: 40px;
      height: px2rem(150px);
      color: #fff;
    }
  }

  .withdraw {
    font-size: 16px;
    // position: absolute;
    // top: 50%;
    // right: px2rem(50px);
    // transform: translate(0%, -50%);
  }
}
</style>


