/* 协议详情组件 */
<template>
  <div class="agreement">
    <!-- 引入mint-ui的header -->
    <header class="title">
      <p>用户协议</p>
    </header>

    <article class="desc">
      <h1>哆蕾咪自助按摩椅服务协议</h1>
      <p>为了避免发生意外，使用前请仔细阅读本“用户服务声明”，并正确使用
      <br> 一、不适合使用本产品的人士
      <br>&nbsp;&nbsp;&nbsp;1.&nbsp;使用心脏起搏器等埋入体内的医用电子仪器者
      <br>&nbsp;&nbsp;&nbsp;2.&nbsp;正在接受医生治疗者，特别是身体感到异常者
      <br>&nbsp;&nbsp;&nbsp;3.&nbsp;患有恶性肿瘤者、急性疾病、心脏病、严重高血压等患者
      <br>&nbsp;&nbsp;&nbsp;4.&nbsp;孕妇或正处于经期者
      <br>&nbsp;&nbsp;&nbsp;5.&nbsp;骨质疏松、颈椎骨折患者
      <br>&nbsp;&nbsp;&nbsp;6.&nbsp;皮肤有创伤的
      <br>&nbsp;&nbsp;&nbsp;7.&nbsp;体温38℃以上的（发热期）的人士
      <br>&nbsp;&nbsp;&nbsp;8.&nbsp;智障人士或未成年人使用时必须有正常人监护下使用
      <br>二、禁止事项
      <br>&nbsp;&nbsp;&nbsp;1.&nbsp;如果发现按摩椅损坏、破裂、漏电以及相关部件暴露出来时禁止使用
      <br>&nbsp;&nbsp;&nbsp;2.&nbsp;禁止站立、倒立于按摩椅上或者将其他重物放置、挤压在按摩椅上
      <br>&nbsp;&nbsp;&nbsp;3.&nbsp;请勿让儿童使用或者在按摩椅上玩耍，请勿让不满12周岁的儿童使用按摩椅
      <br>&nbsp;&nbsp;&nbsp;4.&nbsp;请勿在按摩椅工作时，在按摩椅上入睡
      <br>&nbsp;&nbsp;&nbsp;5.&nbsp;请勿在醉酒或身体有其他不适合时，使用按摩椅
      <br>&nbsp;&nbsp;&nbsp;6.&nbsp;请勿将手指或者其他东西插入按摩椅缝隙中，以免受伤或发生故障
      </p>
    </article>

  </div>
  </div>

</template>

<script>
export default {};
</script>


<style lang="stylus" scoped>
@import '../common/stylus/mixins.styl';

.agreement {
  position: relative;
  z-index: 100;
  height: 100vh;
  background-color: #fff;

  .title {
    height: px2rem(80px);
    background-color: #ddd;
    text-align: center;
    line-height: px2rem(80px);
    font-size: 18px;
  }

  .desc {
    padding: px2rem(40px) px2rem(40px) 0 px2rem(50px);

    h1 {
      text-align: center;
      font-size: 18px;
      margin-bottom: px2rem(40px);
    }

    p {
      text-indent: 2em;
      font-size: 14px;
      line-height: 1.5em;
    }
  }
}
</style>

