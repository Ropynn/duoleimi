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
        <cell title="充值" is-link>
          <i class="iconfont icon-tixian"></i>
        </cell>
        <cell title="提现" is-link :link="walletDraw">
          <i class="iconfont icon-zaixianchongzhi"></i>
        </cell>
        <cell title="提现明细" is-link link="/walletDetail">
          <i class="iconfont icon-icon_gongzimingxi"></i>
        </cell>
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
      user: {},
      walletDraw: ""
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
      this.walletDraw = "/walletDraw" + "/" + this.money;
    });
    this.axios.get("/api/withdrawList").then(res => {
      // console.log(res);
      this.withdrawList = res.data.withdrawList;
    });
  },
  methods: {},
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
}
</style>


