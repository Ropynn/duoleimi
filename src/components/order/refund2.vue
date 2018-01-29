<template>
  <div class="refund page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
    <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore" :bottomPullText="bottomPullText" :autoFill="autoFill">
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
    </mt-loadmore>
  </div>
</template>

<script>
export default {
  data() {
    return {
      refund: [],
      isShow: true,
      allLoaded: false,
      bottomStatus: "",
      wrapperHeight: 0,
      topStatus: "",
      translate: 0,
      moveTranslate: 0,
      bottomPullText: "上拉加载更多",
      autoFill: false
    };
  },
  created() {
    this.axios.get("/api/refund").then(res => {
      // console.log(res);
      this.refund = res.data.refund;
    });
  },
  methods: {
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    loadBottom() {
      setTimeout(() => {
        this.axios.get("/api/refund").then(res => {
          this.refund.push(...res.data.refund);
        });
        this.$refs.loadmore.onBottomLoaded();
      }, 1500);
    },
    handleTopChange(status) {
      this.moveTranslate = 1;
      this.topStatus = status;
    },
    loadTop() {
      setTimeout(() => {
        this.$router.replace("/refund2");
        this.$refs.loadmore.onTopLoaded();
      }, 1500);
    }
  },
  mounted() {
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top;
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl';

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

.page-loadmore .mint-spinner {
  display: inline-block;
  vertical-align: middle;
}

.page-loadmore-desc {
  text-align: center;
  color: #666;
  padding-bottom: 5px;
}

::-webkit-scrollbar-track-piece {
  background-color: transparent !important;
}

.page-loadmore-desc:last-of-type, .page-loadmore-listitem {
  border-bottom: 1px solid #eee;
}

.page-loadmore-listitem:first-child {
  border-top: 1px solid #eee;
}

.page-loadmore-wrapper {
  overflow: scroll;
}

.mint-loadmore-bottom span {
  display: inline-block;
  -webkit-transition: 0.2s linear;
  transition: 0.2s linear;
  vertical-align: middle;
}
</style>
