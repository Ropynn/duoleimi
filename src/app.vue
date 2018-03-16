<template>
  <div>
    <router-view :code="code" @saveData="getData" :obj = 'obj' ></router-view>
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
      obj: {}
    };

  },
  created() {

    // console.log(this.code)

    // console.log(this.$route.query);
    // console.log(this.code);
    // this.axios.get("http://shop.doremes.com/wx/getUser").then(res => {
    //   console.log("------------------------------------");
    //   console.log(JSON.stringify(res));

    //   console.log(res.data.statu);
    //   console.log(typeof res.data.statu);

    //   if (res.data.statu == 1) {
    //     console.log("获取成功");
    //     this.user = res.data.user;
    //     this.$router.push("home");
    //   } else {
    //     window.location = "http://shop.doremes.com/wx/login?goback=home";
    //     console.log("获取失败");
    //   }
    // });
  },
  methods: {
    getData(obj){
        console.log('obj', obj);
        this.obj = obj;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './common/stylus/mixins.styl';
</style>
<style lang="less">
@import '~vux/src/styles/reset.less';
</style>
