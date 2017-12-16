<template>
  <div>
    <banner-header :home="home"></banner-header>
    <router-view :home="home"></router-view>
  </div>
</template>

<script>
  import bannerHeader from "./components/header"
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
    bannerHeader
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixins.styl"

</style>
