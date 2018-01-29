<template>
  <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
    <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="autoFill">

      <ul class="page-loadmore-list">
        <li v-for="item in list" class="page-loadmore-listitem lis">
          <div class="box">
            <div class="left">
              <div class="title">{{item.statu |status}}</div>
              <div class="time">{{item.time | creatAt}}</div>
            </div>
            <div class="amount">-{{item.amount/100 | fmoney}}</div>
          </div>
        </li>
      </ul>

    </mt-loadmore>
  </div>
</template>

<script type="text/babel">
export default {
  data() {
    return {
      list: [],
      allLoaded: false,
      autoFill:false,
      bottomStatus: "",
      wrapperHeight: 0,
      topStatus: "",
      translate: 0,
      moveTranslate: 0
    };
  },

  methods: {
    handleBottomChange(status) {
      this.bottomStatus = status;
    },

    loadBottom() {
      setTimeout(() => {
        this.axios.get("/api/withdrawList").then(res => {
          this.list.push(...res.data.withdrawList);
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
        this.axios.get("/api/withdrawList").then(res => {
          this.list = res.data.withdrawList;
        });
      }, 1500);
    }
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
      this.list = res.data.withdrawList;
    });
  },

  mounted() {
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top;
  }
};
</script>
<style lang="stylus" scoped>
@import '../common/stylus/mixins.styl';

.box {
  background-color: #fff;
  position: relative;
  position: relative;
  border-bottom: 1px solid #ddd;
  padding: px2rem(30px);

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

.page-loadmore-listitem {
  // height: 50px;
  // line-height: 50px;
  // text-align: center;
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

