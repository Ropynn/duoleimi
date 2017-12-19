  <!-- 确认层 -->
<template>
  <div class="makeSure" v-if="isShow">
    <div class="box">
      <div class="alert">
        系统提示
      </div>
      <div class="message">
        使用前请同意用户协议!
      </div>
      <div class="btn" @click="show">
        确定
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['isShow'],
  data() {
    return {
      isShow: true
    };
  },
  mounted () {
    console.log(this.isShow);
  },
  methods: {
    show:function() {
      this.$emit("change","aaa");
      this.isShow = false;
    }
  }
};
</script>

<style lang="stylus" scoped>
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
      // line-height: 50px;
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
</style>


