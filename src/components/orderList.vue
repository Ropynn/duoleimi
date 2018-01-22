<template>
  <div class="listBox">
    <banner-header></banner-header>
    <ul class="dec" v-for="item in orderList" @click="move(item)">
      <li>订单编号：{{item.payid}}</li>
      <li>订单总额：{{item.money/100}}元</li>
      <li>机器运作状态：{{item.move | move}}</li>
      <li>订单状态：{{item.statu | statu}}</li>
      <li>创建时间：{{item.createdAt | creatAt}}</li>
      <li>
        <span class="line"></span>
        <button>立即启动</button>
        <button>申请退款</button>
      </li>

    </ul>

  </div>
</template>

<script>
import bannerHeader from "./header.vue";
export default {
  data() {
    return {
      orderList: []
    };
  },
  created() {
    this.axios.get("http://tsa.yzidea.com/wx/getUser").then(res => {
      if (res.data.statu == 1) {
        // console.log("获取成功");
        this.user = res.data.user;
      } else {
        window.location = "http://tsa.yzidea.com/wx/login?goback=order";
        console.log("获取失败");
      }
    }),
      this.axios.get("http://tsa.yzidea.com/wx/getMyOrder").then(res => {
        console.log(res);
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
    }
  },
  components: {
    bannerHeader
  }
};
</script>


<style lang="stylus" scoped>
@import '../common/stylus/mixins.styl';

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
    padding: px2rem(40px);
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
}
</style>
