<template>
  <div>
    <router-view :code="code"></router-view>
  </div>
</template>

<script>
export default {
  created(){

  },
  data() {
    return {
      user: {},
      code: this.$route.query.code,
    };
  },
  created() {
    // this.axios.get("http://tsa.yzidea.com/wx/getUser").then(res => {
    //   console.log("------------------------------------");
    //   console.log(JSON.stringify(res));

    //   console.log(res.data.statu);
    //   console.log(typeof res.data.statu);

    //   if (res.data.statu == 1) {
    //     console.log("获取成功");
    //     this.user = res.data.user;
    //     this.$router.push("home");
    //   } else {
    //     window.location = "http://tsa.yzidea.com/wx/login?goback=home";
    //     console.log("获取失败");
    //   }
    // });
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './common/stylus/mixins.styl';
</style>
