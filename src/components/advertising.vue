<template>
  <div class="advertising" v-show="isShow">
    <div class="detail-wrapper">
      <div class="detail-main">哆蕾咪</div>
    </div>
    <div class="detail-close" @click="conceal" >x</div>
  </div>
</template>

<script>
    export default {
      data(){
        return{
          advertising:{},
          isShow:true
        }
      },
      mounted(){

      },
      methods:{
        //TODO 点击隐藏广告层
        conceal:function () {
          this.isShow=!this.isShow
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/mixins.styl"
    .detail-wrapper
      width 100%
      min-height 100%
      .detail-main
        font-size 32px
        text-align center
        color #fff
        padding-bottom  px2rem(128px)
    .detail-close
      margin-top  px2rem(-200px)
      height  px2rem(200px)
      line-height  px2rem(200px)
      text-align center
      color #FFF
      font-size 32px
</style>
