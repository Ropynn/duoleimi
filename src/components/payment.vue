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
          <span class="particulars" v-show="isShowp">{{payment.pay}}</span>
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
  </div>
</template>

<script>
import countDown from "./countDown.vue";   //引入倒计时组件

export default {
  components:{
    countDown
  },
  data() {
    return {
      price: this.$route.params.price, //获取传递过来的价钱
      minutes: this.$route.params.minutes, //获取传递过来的按摩时间
      currentTime: Number(this.$route.params.currentTime), //获取按摩开始的时间
      endTime: "", //按摩结束的时间
      payment: {},
      startTime:"", //客户开始的时间
      isShow:true,
      isShowp:true,
      isShowc:false,
      content: ""
    };
  },
  props: {
    hided:"",
    endText: {
      type: String,
      default: "按摩完成，欢迎继续使用"
    },
    // callback: {
    //   type: Function,
    //   default: ""
    // }
  },
  created() {
    this.axios.get("/api/payment").then(res => {
      this.payment = res.data.data;
    });

    //计算结束时间
    this.endTime = (this.currentTime + this.minutes * 1000 * 60) / 1000;
  },
  mounted(){
    //按摩开始时间
    this.openingTime()
    // this.countdowm(this.endTime);

  },
  methods: {
    //todo 服务开始时间
     openingTime:function () {
      let time=this.currentTime;
      let newtime=time*1000;
      function gettime(t){
        let _time=new Date(t);
        let   year=_time.getFullYear();         //获取年份
        let   month=_time.getMonth()+1;         //获取月份
        let   date=_time.getDate();             //获取日期
        let   hour=_time.getHours();            //获取小时
        let   minute=_time.getMinutes();        //获取分钟
        let   second=_time.getSeconds();        //获取秒钟
        minute = minute < 10 ? "0" + minute : minute;
        second = second < 10 ? "0" + second : second;
        return   year+"-"+month+"-"+date+"-"+"  "+hour+":"+minute+":"+second; //这里自己按自己需要的格式拼接
      };
      this.startTime=gettime(newtime/1000)
    },

    //倒计时完成后的回调函数
     callback(){
      // todo 完成后动态改变计时器、订单状态等
      this.isShow=!this.isShow
      this.isShowp=!this.isShowp
      this.isShowc=!this.isShowc
      console.log("nimeimei")
      //  this.$router.push({path:'/advertising'})
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.time
  width 100%
  height 118px
  z-index 10
  position absolute
  top 0
  box-sizing border-box
  display flex
  flex-direction column
  align-content center
  justify-content center
  border 2px solid #E0BC74
  border-radius 15px
  .countTime
    height 80px
    font-size 26px
    color #E90000
    line-height 80px
    text-align center
  .residue
    height 50px
    color #E90000
    display block
    font-size 20px
    line-height 50px
    text-align center
.paid
  width 100%
  z-index 10
  position absolute
  top 118px
  bottom 100px
  box-sizing border-box
  border 2px solid #E0BC74
  border-radius 15px
  .particulars
    width 100%
    .logol
      width 100%
      height 90px
      line-height 90px
      text-align center
      .logo
        width 50px
        height 50px
        vertical-align middle

    .subsection
      color #C2C2C2
      padding 26px
      font-size 18px
      .particulars
        color: #181818



.footer
  width 100%
  height 100px
  z-index 10
  line-height 100px
  text-align center
  box-sizing border-box
  font-size: 14px;
  border 2px solid #E0BC74
  border-radius 15px
  position absolute
  bottom 0


</style>
