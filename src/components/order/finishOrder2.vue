<template>
  <div class="listBox">
    <div class="noMore" v-if="orderList.length == 0" v-cloak>列表无数据</div>
    <ul class="dec" v-for="item in orderList">
      <li>订单编号：{{item.payid}}</li>
      <li>订单总额：{{item.money/100}}元</li>
      <li>机器运作状态：{{item.move | move}}</li>
      <li>订单状态：{{item.statu | statu}}</li>
      <li>创建时间：{{item.createdAt | creatAt}}</li>
    </ul>
  </div>
</template>

<script>

import { XButton } from "vux";
export default {
  data() {
    return {
      orderList: [],
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
  components: { XButton }
};
</script>


<style lang="stylus" scoped>
@import '../../common/stylus/mixins.styl';

[v-cloak] {
  display: none;
}

.listBox {

  .noMore {
    text-align: center;
    padding px2rem(100px)
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
