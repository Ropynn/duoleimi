/* 支付组件 */
<template>
  <div class="payment-time">
    <div class="time">
      <span class="residue" v-show="isShow" >剩余时间</span>
      <count-down :endTime="endTime" :callback="callback" :endText="endText" class="countTime"></count-down>
    </div>
    <div class="paid">
      <div class="particulars">
        <div class="logol">
          <img class="logo" src="../assets/logo.png" alt="">
        </div>
        <p class="subsection">订单号：
          <span class="particulars">{{payment.ordernumber}}</span>
        </p>
        <p class="subsection">订单状态：
          <span class="particulars" v-show="isShow">{{payment.pay}}</span>
          <span class="particulars" v-show="isShowc">{{payment.completed}}</span>
        </p>
        <p class="subsection">套餐：
          <span class="particulars">{{price}}元 / {{minutes}}分钟</span>
        </p>
        <p class="subsection">启动时间：
          <span class="particulars" @change="openingTime">{{startTime}}</span>
        </p>
      </div>
    </div>
    <div class="footer">
      若需帮忙请拨打按摩椅上的客服电话，谢谢惠顾
    </div>
    <transition name="fade">
      <advertising class="detail" v-show="isAdvertising" >
      </advertising>
    </transition>
  </div>
</template>

<script>
import countDown from "./countDown.vue";   //引入倒计时组件
import advertising from "./advertising";  //引入广告层组件
export default {
  components:{
    countDown,
    advertising
  },
  data() {
    return {
      price: this.$route.params.price, //获取传递过来的价钱
      minutes: this.$route.params.minutes, //获取传递过来的按摩时间
      currentTime: Number(this.$route.params.currentTime), //获取按摩开始的时间
      payment: {},
      endTime: "", //按摩结束的时间
      startTime:"", //客户开始的时间
      isShow:true,
      isShowc:false,
      isAdvertising:false,
      content: ""
    };
  },
  props: {
    hided:"",
    endText: {
      type: String,
      default: "按摩完成，欢迎继续使用"
    },
  },
  created() {
    this.axios.get("/api/payment").then(res => {
      this.payment = res.data.data;
    });
    this.endTime = (this.currentTime + this.minutes * 1000 * 60) / 1000;
  },
  mounted(){
    //按摩开始时间
    this.openingTime()
  },
  methods: {
    //todo 服务开始时间
     openingTime:function () {
      let time=this.currentTime;
      let newtime=time*1000;
      function gettime(t){
        let _time=new Date(t);
        let   year=_time.getFullYear();//2017
        let   month=_time.getMonth()+1;//12
        let   date=_time.getDate();//20
        let   hour=_time.getHours();//10
        let   minute=_time.getMinutes();//56
        let   second=_time.getSeconds();//15
        minute = minute < 10 ? "0" + minute : minute;
        second = second < 10 ? "0" + second : second;
        return   year+"年"+month+"月"+date+"日   "+hour+":"+minute+":"+second;//这里自己按自己需要的格式拼接
      };
      this.startTime=gettime(newtime/1000)
    },
     callback(){
      // todo 完成后动态改变计时器、订单状态等
      this.isShow=!this.isShow
      this.isShowc=!this.isShowc
      // todo 弹层广告出来
      this.isAdvertising=!this.isAdvertising
      console.log("nimeimei")
       //todo 5s后广告层自动消失
      setTimeout(()=>{
         this.isAdvertising=false
         // console.log(this.isAdvertising)
       },7000)
    },
  }
};
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
@import "../common/stylus/mixins.styl"
.time
  width 100%
  height  px2rem(200px)
  z-index 10
  position absolute
  top 0
  box-sizing border-box
  display flex
  flex-direction column
  align-content center
  justify-content center
  border-bottom  px2rem(10px) solid #E0BC74
  .countTime
    height  px2rem(160px)
    font-size  px2rem(52px)
    color #E90000
    line-height  px2rem(160px)
    text-align center
  .residue
    height  px2rem(100px)
    color #E90000
    font-size 18px
    line-height px2rem(100px)
    display flex
    justify-content center
.paid
  width 100%
  z-index 10
  position absolute
  top  px2rem(200px)
  bottom  px2rem(180px)
  .particulars
    width 100%
    .logol
      width 100%
      height  px2rem(180px)
      line-height  px2rem(180px)
      text-align center
      .logo
        width  px2rem(100px)
        height  px2rem(100px)
        vertical-align middle
    .subsection
      color #C2C2C2
      padding  px2rem(50px)
      font-size 16px
      .particulars
        color: #181818
.footer
  width 100%
  height  px2rem(180px)
  z-index 10
  line-height  px2rem(180px)
  text-align center
  box-sizing border-box
  font-size: 14px;
  border-top  px2rem(10px) solid #E0BC74
  position absolute
  bottom 0
.detail
  position: fixed
  left: 0
  top: 0
  z-index: 100
  width: 100%
  height: 100%
  background: rgba(7, 17, 27, 0.8)
  overflow: auto
  backdrop-filter: blur( px2rem(20px))
  &.fade-enter-active, &.fade-leave-active
    transition: opacity .5s ease 1.5s
  &.fade-enter, &.fade-leave-active
    opacity: 0

</style>
