<template>
  <div class="advertising" v-show="isShow">
    <div class="detail-wrapper">
      <div class="detail-main"></div>
    </div>
    <div class="detail-close" @click="conceal">x</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      advertising: {},
      isShow: true
    };
  },
  methods: {
    conceal() {
      this.isShow = false;
      // console.log(this.isShow + "确定");
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">

.detail-wrapper {
  width: 100%;
  min-height: 100%;

  /* background-color black */
  .detail-main {
    /* margin-top 64px */
    padding-bottom: 64px;
  }
}

.detail-close {
  margin-top: -100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  color: #FFF;
  font-size: 32px;
}
</style>
