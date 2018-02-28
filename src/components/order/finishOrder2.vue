<template>
  <scroller ref="myscroller" :on-refresh="refresh" :on-infinite="infinite" class="listBox">
    <div class="content">
      <ul>
        <li v-for="item in finishOrderList" class="dec" @click="toMove(item)">
          <div>订单编号：{{item.payid}}</div>
          <div>订单总额：{{item.money/100}}元</div>
          <div>机器运作状态：{{item.move | move}}</div>
          <div>订单状态：{{item.statu | statu}}</div>
          <div>创建时间：{{item.createdAt | creatAt}}</div>
        </li>
      </ul>
    </div>
  </scroller>
</template>

<script>
import { InfiniteScroll } from "mint-ui";
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
import async from "async";
export default {
  data() {
    return {
      orderList: [],
      finishOrderList: [],
      unfinishedOrderList: []
    };
  },
  created() {
    this.axios.get("http://shop.doremes.com/wx/getUser").then(res => {
      if (res.data.statu == 1) {
        this.user = res.data.user;
      } else {
        window.location = "http://shop.doremes.com/wx/login?goback=order";
      }
    }),
      this.axios.get("http://shop.doremes.com/wx/getMyOrder").then(res => {
        // console.log(res);
        if (res.data.statu) {
          this.orderList = res.data.list;

          async.forEachOf(
            this.orderList,
            (value, key, callback) => {
              const overT = new Date(value.overTime).getTime();
              const nowT = new Date().getTime();
              if (value.move) {
                this.finishOrderList.push(value);
              } else {
                this.unfinishedOrderList.push(value);
              }
              callback();
            },
            err => {
              // console.log(err);
              return;
            }
          );
        } else {
          console.log("获取失败");
        }
      });
  },
  methods: {
    // 上拉刷新
    refresh() {
      console.log("刷新");
      setTimeout(() => {
        this.$refs.myscroller.finishPullToRefresh();
        // Indicator.open();
      }, 1000);
    },
    //下拉加载更多
    infinite(done) {
      if (this.noData) {
        setTimeout(() => {
          this.$refs.myscroller.finishInfinite(1);
          this.$refs.myscroller.resize();
        });
        return;
      }
      let self = this;
      setTimeout(() => {
        // if (this.pageNo >= this.pages) {
        //   self.noData = "没有更多数据";
        // } else {
        //   this.loadTaskList();
        // }
        self.noData = "没有更多数据";
        self.$refs.myscroller.resize();
        self.$refs.myscroller.finishInfinite(true);
        done();
      }, 300);
    },
    loadTaskList() {
      // this.pageNo = this.pageNo + 1;
      // Indicator.open();
      // this.axios
      //   .post(
      //     `${this.api.loadTaskList}?taskType=0&pageNo=${this.pageNo}&pageSize=${
      //       this.pageSiz
      //     }`
      //   )
      //   .then(res => {
      //     Indicator.close();
      //     if ((res.data.code = 200)) {
      //       this.list = this.list.concat(res.data.data.result.records);
      //     }
      //   });
    },
    init() {
      // this.pageNo = 1;
      // this.list = [];
      // this.noData = "";
      // this.axios
      //   .post(
      //     `${this.api.loadTaskList}?taskType=0&pageNo=${this.pageNo}&pageSize=${
      //       this.pageSiz
      //     }`
      //   )
      //   .then(res => {
      //     console.log(res);
      //     if (res.data.code == 200) {
      //       this.list = this.list.concat(res.data.data.result.records);
      //       this.pages = res.data.data.result.pages;
      //     }
      //   });
    }
  }
};
</script>


<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl';
@import '../../common/stylus/scroll.css';

[v-cloak] {
  display: none;
}

.listBox {
  .content {
    background-color: #ddd;
    padding: px2rem(20px) px2rem(20px);
    margin-top: px2rem(88px);
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
}
</style>
