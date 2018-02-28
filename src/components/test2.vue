<template>
  <scroller ref="myscroller" :on-refresh="refresh" :on-infinite="infinite">
    <div class="content">
      <ul>
        <li v-for="item in list" class="dec" @click="toMove(item)">
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

export default {
  data() {
    return {
      bgCol: "#383838",
      list: [
        {
          payid: "HZ1515815930930",
          price: "6",
          description: "天河店J67508设备",
          status: "未启动",
          move: false,
          pay: "支付成功",
          creatTime: "2018-01-13T03:58:51.000Z",
          time: "6"
        },
        {
          payid: "HZ1515815930888",
          price: "15",
          description: "天河店J67508设备",
          status: "已启动",
          move: true,
          pay: "支付成功",
          creatTime: "2018-01-13T03:58:51.000Z",
          time: "10"
        }
      ]
    };
  },
  methods: {
    // 上拉刷新
    refresh() {
      console.log("刷新");
      setTimeout(() => {
        this.$refs.myscroller.resize();
      }, 1000);
    },
    //下拉加载更多
    infinite(done) {
      if (this.noData) {
        setTimeout(() => {
          this.$refs.myscroller.finishInfinite(2);
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
@import '../common/stylus/mixins.styl';

.content {
  padding: 0 px2rem(20px);
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
</style>


