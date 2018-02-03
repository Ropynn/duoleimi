<template>
  <div class="listBox page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
    <div class="noMore" v-if="orderList.length == 0">列表无数据</div>
    <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore" :bottomPullText="bottomPullText" :autoFill="autoFill">
      <ul class="dec" v-for="item in orderList">
        <li>订单编号：{{item.payid}}</li>
        <li>订单总额：{{item.money/100}}元</li>
        <li>机器运作状态：{{item.move | move}}</li>
        <li>订单状态：{{item.statu | statu}}</li>
        <li>创建时间：{{item.createdAt | creatAt}}</li>
        <li v-if="(!item.move && item.statu == 1)">
          <span class="line"></span>
          <div class="btn">
            <x-button action-type='button' @click.native="move(item)" mini>立即启动</x-button>
            <x-button action-type='button' @click.native="refund(item)" mini>申请退款</x-button>
          </div>
        </li>
      </ul>
    </mt-loadmore>
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
import { XButton } from "vux";
export default {
  data() {
    return {
      orderList: [],
      isShow: false,
      isHas: false,
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
    this.axios.get("http://tsa.yzidea.com/wx/getUser").then(res => {
      if (res.data.statu == 1) {
        // console.log("获取成功");
        this.user = res.data.user;
      } else {
        window.location = "http://tsa.yzidea.com/wx/login?goback=order";
        console.log("已登录");
      }
    });
    this.axios.get("http://tsa.yzidea.com/wx/getMyOrder").then(res => {
      // console.log(res);
      if (res.data.statu) {
        this.orderList = res.data.list;
      } else {
        console.log("获取失败");
      }
    });
  },
  methods: {
    //立即启动
    move(item) {
      // console.log(item.statu);
      if (!item.move && item.statu == 1) {
        localStorage.setItem("_CODE_", item.deviceId);
        // console.log('aaaa');
        this.$router.push({
          path: "/mcMove/" + item.price + "/" + item.time + "/" + item.payid
        });
      } else {
        return;
      }
    },
    //申请退款
    refund(item) {
      if (!item.move && item.statu == 1) {
        this.order = item;
        console.log("跳转退款页面");
        this.isShow = !this.isShow;
      }
    },
    //确认退款
    ensure() {
      this.isShow = !this.isShow;
      console.log("确认退款");
      this.$router.push({
        path: "/refund"
      });
    },
    //取消退款
    cancel() {
      this.isShow = !this.isShow;
      console.log("取消退款");
    },
    //上拉加载,下拉刷新
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    loadBottom() {
      setTimeout(() => {
        // this.axios.get("http://tsa.yzidea.com/wx/getMyOrder").then(res => {
        //   this.orderList.push(...res.data.list);
        // });
        this.$refs.loadmore.onBottomLoaded();
      }, 1500);
    },
    handleTopChange(status) {
      this.moveTranslate = 1;
      this.topStatus = status;
    },
    loadTop() {
      setTimeout(() => {
        this.$router.replace("/unfinishedOrder");
        this.$refs.loadmore.onTopLoaded();
      }, 1500);
    }
  },
  components: {XButton }
};
</script>


<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl';

.listBox {
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
      background-color: #F86184;
      color: #fff;
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
}
</style>
