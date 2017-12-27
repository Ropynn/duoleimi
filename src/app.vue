<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {}
    };
  },
  created() {
    this.axios.get("http://tsa.yzidea.com/wx/getUser").then(res => {
      // console.log(res);
      res.data = this.user;
      if (res.data.statu) {
        console.log("成功");
        window.location = "http://tsa.yzidea.com/wx/login?goback=home";
      } else {
        window.location = "http://tsa.yzidea.com/wx/login?goback=home";
        console.log("失败");
      }
    });
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './common/stylus/mixins.styl';
</style>
