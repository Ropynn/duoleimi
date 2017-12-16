<template>
  <div>
    <div class="container">
      <span class="line"></span>
      <span class="txt">{{home.setMeal}}</span>
      <span class="line"></span>
    </div>
    <ul class="selective-type">
      <li class="set-meal" v-for="item in home.projects">
        <router-link class="chaining" :to="'/member/'+ item.price">
          <div class="single">
            <span class="unitPice">￥{{item.price}}</span>
            <span class="lengthTime">6分钟</span>
          </div>
          <div class="functions">
            <span class="function">{{item.name}}</span>
          </div>
        </router-link>
      </li>
      <!--<li class="set-meal">-->
      <!--<router-link class="chaining" to="/member">-->
      <!--<div class="single">-->
      <!--<span class="unitPice">￥10</span>-->
      <!--<span class="lengthTime">12分钟</span>-->
      <!--</div>-->
      <!--<div class="functions">-->
      <!--<span class="function">通行气血</span>-->
      <!--</div>-->
      <!--</router-link>-->
      <!--</li>-->
      <!--<li class="set-meal">-->
      <!--<router-link class="chaining" to="member">-->
      <!--<div class="single">-->
      <!--<span class="unitPice">￥15</span>-->
      <!--<span class="lengthTime">20分钟</span>-->
      <!--</div>-->
      <!--<div class="functions">-->
      <!--<span class="function">舒张筋骨</span>-->
      <!--</div>-->
      <!--</router-link>-->
      <!--</li>-->
    </ul>
    <div class="service">
      <span class="attention">！</span>
      <span class="protocol">摩摩哒服务协议</span>
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
  methods() {},
  components: {
    member
  }
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

.service {
  width: 100%;
  height: 80px;
  /* background-color deeppink */
  line-height: 80px;
  text-align: center;
  position: absolute;
  button: 0;
  left: 0;

  .attention {
    width: 16px;
    height: 16px;
    display: inline-block;
    line-height: 16px;
    border: 1px solid #737373;
    border-radius: 50%;
    color: #737373;
    font-size: 16px;
  }

  .protocol {
    font-size: 18px;
    color: #737373;
  }
}
</style>
