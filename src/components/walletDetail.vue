<template>
  <div>
    <!-- <div class="history">
      历史记录
    </div> -->
    <ul class="withdrawList">
      <!-- <scroller :on-refresh="refresh" &&:on-infinite="infinite" || ref="domName"> -->
      <li v-for="item in withdrawList">
        <div class="left">
          <div class="title">{{item.statu |status}}</div>
          <div class="time">{{item.time | creatAt}}</div>
        </div>
        <div class="amount">-{{item.amount/100 | fmoney}}</div>
      </li>
      <!-- <li class="more">{{loadMore}}</li> -->
      <!-- </scroller> -->
    </ul>

  </div>
</template>

<script>

export default {
  data() {
    return {
      withdrawList: [],
      list: [{}]
    };
  },
  created() {
    this.axios.get("http://tsa.yzidea.com/wx/getUser").then(res => {
      if (res.data.statu == 1) {
        this.user = res.data.user;
      } else {
        window.location = "http://tsa.yzidea.com/wx/login?goback=walletDetail";
      }
    });
    this.axios.get("/api/withdrawList").then(res => {
      // console.log(res);
      this.withdrawList = res.data.withdrawList;
    });
  }
};
</script>

<style lang="stylus" scoped>
@import '../common/stylus/mixins.styl';

.history {
  font-size: 14px;
  height: px2rem(80px);
  background-color: #ddd;
  line-height: px2rem(80px);
  padding: 0 px2rem(30px);
}

.withdrawList {
  background-color: #fff;
  position: relative;

  li {
    position: relative;
    // display: flex;
    // flex-direction: row;
    // justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding: px2rem(30px);
  }

  .time {
    padding-top: px2rem(10px);
    color: #bbb;
  }

  .amount {
    position: absolute;
    top: 50%;
    right: px2rem(20px);
    transform: translate(0%, -50%);
    color: red;
    font-size: 20px;
  }

  .more {
    text-align: center;
  }
}
</style>


