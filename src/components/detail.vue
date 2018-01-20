/* 协议详情组件 */
<template>
  <div class="agreement">
    <!-- 引入mint-ui的header -->
    <header class="title">
      <p>用户服务声明</p>
    </header>

    <article class="desc">
      <!-- <h1>用户服务声明</h1> -->
      <p>为了避免发生意外，使用前请仔细阅读本“用户服务声明”，并正确使用</p>
      <p class="red">一、本仪器功能为保健保养，不能取代任何治疗</p>
      <p>二、有（乳房）疾病或有疑似（乳房）疾病者，请您先到医院做检查，并听从医生指示</p>
      <p>三、不适合使用本产品的人士：</p>
      <p>1、已知为乳癌患者或患有恶性肿瘤者、急性疾病、重大疾病、心脏病、严重高血压等患者</p>
      <p>2、外科手术或侵入性美容手术（使用奥美定、矽胶、硅胶等假体填充物）</p>
      <p>3、使用心脏起搏器等埋入体内的医用电子仪器者</p>
      <p>4、正在接受医生治疗者，特别是身体感到异常者</p>
      <p>6、孕妇或正处于经期者</p>
      <p>5、骨质疏松、颈椎骨折患者</p>
      <p>6、糖尿病伤口不易修复者</p>
      <p>7、严重贫血者（使用可能会有头晕之反应）</p>
      <p>8、皮肤有创伤的或皮肤溃烂、感染性发炎皮肤、蜂窝性组织炎等皮肤病患者</p>
      <p>9、体温38℃以上的（发热期）的人士</p>
      <p>10、癫痫患者和术后不到一年的患者</p>
      <p>四、使用事项</p>
      <p>1、使用前后，请多补充水分</p>
      <p>2、使用过程中若感到身体不适，请立即告知并停止使用</p>
      <p>3、力度太强或时间太长，会产生出痧现象。堵塞严重者呈深红、紫黑色，甚至出水泡。约1-2周后，痧自然被身体吸收，皮肤会逐渐恢复正常的色泽</p>
      <p>4、使用后，排出的汗水、毒素等，易导致皮肤搔痒，请及时用水清洗或擦拭干净</p>
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
    height: px2rem(60px);
    background-color: #ddd;
    text-align: center;
    line-height: px2rem(60px);
    font-size: 18px;
  }

  .desc {
    padding: px2rem(20px) px2rem(40px) 0 px2rem(40px);

    h1 {
      text-align: center;
      font-size: 16px;
    }

    .red {
      color: red;
    }

    p {
      text-indent: 2em;
      font-size: 14px;
      line-height: 1.5em;
    }
  }
}
</style>

