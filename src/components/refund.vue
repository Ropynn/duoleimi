<template>
  <div class="refund">
    <div class="noMore" v-if="refund.length == 0">列表无数据</div>
    <div class="business" v-for="item in refund">
      <div class="lis">
        <span class="dec">商家名称</span>
        <span class="name">{{item.description}}</span>
      </div>
      <div class="lis">
        <span class="dec">订单号码</span>
        <span class="orderNum">{{item.orderId}}</span>
      </div>
      <div class="lis">
        <span class="dec">退款金额</span>
        <span class="refundMoney">￥{{item.price}}</span>
      </div>
      <div class="lis">
        <span class="dec">退款状态</span>
        <span class="status">{{item.statu | rStatu}}</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      refund: [],
      isShow: true
    };
  },
  created() {
    this.axios.get("/api/refund").then(res => {
      // console.log(res);
      this.refund = res.data.refund;
    });
  }
};
</script>

<style lang="stylus" scoped>
@import '../common/stylus/mixins.styl';

.refund {
  font-size: 14px;
  background-color: #f4f4f4;
  padding: px2rem(30px);

  .noMore {
    text-align: center;
  }

  .business {
    background-color: #fff;
    margin-bottom: px2rem(20px);
    padding: px2rem(30px);
    border: 1px solid #ddd;
    border-radius: px2rem(20px);

    .lis {
      height: px2rem(60px);
    }

    .dec {
      color: #c1c1c1;
      padding-right: px2rem(40px);
    }

    .refundMoney {
      color: #d50000;
    }
  }
}
</style>
