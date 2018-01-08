/* 协议详情组件 */
<template>
  <div class="agreement">
    <!-- 引入mint-ui的header -->
    <header class="mint-header">
      <div class="mint-header-button is-left">
        <!-- <router-link to="/home/" class="router-link-active">
          <button class="mint-button mint-button--default mint-button--normal">
            <span class="mint-button-icon">
              <i class="mintui mintui-back"></i>
            </span>
            <label class="mint-button-text"></label>
          </button>
        </router-link> -->
      </div>
      <h1 class="mint-header-title">用户协议</h1>
      <div class="mint-header-button is-right">
        <button class="mint-button mint-button--default mint-button--normal">
          <label class="mint-button-text"></label>
        </button>
      </div>
    </header>

    <article>
        <!-- 协议详情 -->
    </article>

  </div>
  </div>

</template>

<script>
export default {};
</script>


<style lang="stylus" scoped>
@import "../common/stylus/mixins.styl"

.agreement {
  position: relative;
  z-index: 100;
  height: 100vh;
  background-color: #2f7bc7;

  .mint-header {
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background-color: #f7f7f7;
    box-sizing: border-box;
    color: #000;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 18px;
    height: px2rem(80px);
    line-height: 1;
    padding: 0 px2rem(20px);
    position: relative;
    text-align: center;
    white-space: nowrap;
  }

  .router-link-active {
    width: px2rem(100px);
    height: 100%;
    display: inline-block;
  }

  article {

  }
}
</style>

