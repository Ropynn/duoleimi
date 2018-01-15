<template>
  <div class="listBox">
    <banner-header></banner-header>
    <ul class="dec" v-for="item in orderList.data" @click="move(item)">
      <li>订单编号：{{item.payid}}</li>
      <li>订单总额：{{item.price}}元</li>
      <li>设备描述：{{item.description}}</li>
      <li>机器运作状态：{{item.status}}</li>
      <li>支付状态：{{item.pay}}</li>
      <li>创建时间：{{item.creatTime | creatAt}}</li>
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
        console.log("获取成功");
        this.user = res.data.user;
      } else {
        window.location = "http://tsa.yzidea.com/wx/login?goback=order";
        console.log("获取失败");
      }
    }),
      this.axios.get("/api/orderList").then(res => {
        console.log(res);
        this.orderList = res.data;
      });
  },
  methods: {
    move(item) {
      // console.log(item.statu);
      if (!item.move) {
        // console.log('aaaa');
        this.$router.push({
          path: "/mcMove/" + item.price + "/" + item.time + "/" + item.payid
        });
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
    border-radius 10px

    li {
      line-height: 1.5;
    }
  }
}
</style>

