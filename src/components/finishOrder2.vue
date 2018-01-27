<template>
  <!-- <div class="listBox">
    <div class="noMore" v-if="orderList.length == 0" v-cloak>列表无数据</div>
    <ul class="dec" v-for="item in orderList">
      <li>订单编号：{{item.payid}}</li>
      <li>订单总额：{{item.money/100}}元</li>
      <li>机器运作状态：{{item.move | move}}</li>
      <li>订单状态：{{item.statu | statu}}</li>
      <li>创建时间：{{item.createdAt | creatAt}}</li>
    </ul>
  </div> -->
  <div class="page-loadmore-wrapper listBox" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
    <div class="noMore" v-if="orderList.length == 0" v-cloak>列表无数据</div>
    <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore" :bottomPullText="bottomPullText">

      <ul class="page-loadmore-list">
        <li v-for="item in orderList" class="page-loadmore-listitem dec">
          <div>订单编号：{{item.payid}}</div>
          <div>订单总额：{{item.money/100}}元</div>
          <div>机器运作状态：{{item.move | move}}</div>
          <div>订单状态：{{item.statu | statu}}</div>
          <div>创建时间：{{item.createdAt | creatAt}}</div>
        </li>
      </ul>

    </mt-loadmore>
  </div>
</template>

<script>
import bannerHeader from "./header.vue";
export default {
  data() {
    return {
      orderList: [],
      allLoaded: false,
      bottomStatus: "",
      wrapperHeight: 0,
      topStatus: "",
      translate: 0,
      moveTranslate: 0,
      bottomPullText:"上拉加载更多"
    };
  },
  methods: {
    handleBottomChange(status) {
      this.bottomStatus = status;
    },

    loadBottom() {
      setTimeout(() => {
        if (this.orderList.length < 2) {
            this.axios.get("http://tsa.yzidea.com/wx/getMyOrder").then(res => {
          this.orderList.push(...res.data.list);
        });
        }else{
          console.log('222');
        }

        this.$refs.loadmore.onBottomLoaded();
      }, 1500);
    },
    handleTopChange(status) {
      this.moveTranslate = 1;
      this.topStatus = status;
    },
    loadTop() {
      setTimeout(() => {
        this.$router.replace("/finishOrder2");
        this.$refs.loadmore.onTopLoaded();
      }, 1500);
    }
  },
  created() {
    this.axios.get("http://tsa.yzidea.com/wx/getUser").then(res => {
      if (res.data.statu == 1) {
        this.user = res.data.user;
      } else {
        window.location = "http://tsa.yzidea.com/wx/login?goback=order";
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
  mounted() {
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top;
  },
  components: { bannerHeader }
};
</script>


<style lang="stylus" scoped>
@import '../common/stylus/mixins.styl';

[v-cloak] {
  display: none;
}

.noMore {
  text-align: center;
  padding: px2rem(100px);
}

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
