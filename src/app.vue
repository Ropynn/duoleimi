<template>
  <div>
    <div class="header">
      <img src="" alt="">
    </div>
    <router-view :home="home"></router-view>
  </div>
</template>

<script>
  import axios from "axios"
  const ok=0
  export default {
  data() {
    return {
      home: {}
    }
  },
  created () {
    axios.get('/api/home').then((response=>{
      const result=response.data
      // console.log(result)
      if(result.code===ok){
        this.home=result.data
      }
    }))
  },
  components: {
    // 'ele-header': shouye,
    // member
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixins.styl"
  .header
    width: 100%
    height: 200px
    background-color:#C43D39
</style>
