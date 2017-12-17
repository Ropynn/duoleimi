<template>
  <div>
    <div class="container">
      <span class="line"></span>
      <span class="txt">{{home.setMeal}}</span>
      <span class="line"></span>
    </div>
    <!-- 套餐选择 -->
    <ul class="selective-type">
      <li class="set-meal" v-for="item in home.projects">
        <router-link v-if="flag" class="chaining" :to="'/member/'+item.price">
          <div class="single">
            <span class="unitPice">￥{{item.price}}</span>
            <span class="lengthTime">{{item.time}}分钟</span>
          </div>
          <div class="functions">
            <span class="function">{{item.name}}</span>
          </div>
        </router-link>
        <!-- 如果没选中，路由跳转的地址就为home -->
        <router-link v-if="flc" class="chaining" :to="'/home/'" @click.native='loading'>
          <div class="single">
            <span class="unitPice">￥{{item.price}}</span>
            <span class="lengthTime">{{item.time}}分钟</span>
          </div>
          <div class="functions">
            <span class="function">{{item.name}}</span>
          </div>
        </router-link>
      </li>
    </ul>

    <!-- 确认层 -->
    <div class="makeSure" v-if="isShow">
      <div class="box">
        <div class="alert">
          提示
        </div>
        <div class="message">
          请点击同意!
        </div>
        <div class="btn" @click="show">
          确定
        </div>
      </div>
    </div>

    <!-- 协议 -->
    <div class="service">
      <label class="agreementm" for="agreement">
        <input class="agreement" type="checkbox" :value="val" id="agreement" :checked="checked" @click="isCheck">
        <router-link to="/detail" class="agreementSure">同意用户协议</router-link>
      </label>
    </div>
  </div>

</template>

<script>
import member from "./member";
export default {
  props: {
    home: {
      type: Object
    }
  },

  data() {
    return {
      checked: "checked",
      val: "1",
      flag: true,
      flc: false,
      isShow: false
    };
  },

  methods: {
    //点击是否同意协议
    isCheck() {
      if (this.checked == "checked") {
        this.checked = "";
        this.val = "0";
        this.flag = false;
        this.flc = true;
      } else {
        this.checked = "checked";
        this.val = "1";
        this.flag = true;
        this.flc = false;
      }
    },

    loading() {
      this.isShow = true;
    },

    show() {
      this.isShow = false;
    }
  },
  components: { member }
};
</script>


<style lang="stylus" rel="stylesheet/stylus">
.container {
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;

  .line {
    display: inline-block;
    width: 130px;
    border-top: 1px solid black;
    /* margin-bottom 13px */
  }

  .txt {
    color: #8B8785;
    font-size: 20px;
    vertical-align: middle;
    text-align: center;
  }
}

.selective-type {
  width: 100%;
  padding: 0px 60px;
  box-sizing: border-box;

  .set-meal {
    width: 200px;
    height: 60px;
    /* line-height 60px */
    margin: 30px auto;
    border: 2px solid #DEB882;
    border-radius: 10px;

    .chaining {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: center;

      .single {
        width: 100px;
        height: 60px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        border-right: 2px dashed #DFCB86;

        .unitPice {
          width: 100px;
          height: 30px;
          display: block;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 22px;
          font-weight: border;
          color: #E2B963;
        }

        .lengthTime {
          width: 100px;
          height: 30px;
          display: block;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          color: #E2B963;
        }
      }

      .functions {
        width: 100px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;

        .function {
          width: 100px;
          height: 60px;
          display: block;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 20px;
          color: #74716D;
        }
      }
    }
  }
}

// 遮罩层
.makeSure {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vh;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 30;

  .box {
    position: absolute;
    top: 50%;
    right: 50%;
    margin-top: -100px;
    margin-left: -75px;
    width: 300px;
    height: 150px;
    background-color: #fff;
    color: red;
    text-align: center;

    .alert {
      height: 50px;
      line-height: 50px;
      color: #000;
      font-weight: bold;
    }

    .message {
      height: 50px;
      line-height: 50px;
      color: #666;
    }

    .btn {
      height: 50px;
      line-height: 50px;
      color: #26a2ff;
      border-top: 1px solid #666;
    }
  }
}

.service {
  width: 100%;
  height: 80px;
  /* background-color deeppink */
  line-height: 80px;
  text-align: center;
  position: absolute;
  button: 0;
  left: 0;

  label {
    height: 100%;
  }

  .agreementSure {
    color: blue;
    color: #ccc;
  }
}
</style>
