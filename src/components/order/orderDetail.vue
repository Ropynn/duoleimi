<template>
  <div class="orders">
    <!-- <banner-header></banner-header> -->
    <div class="tab">
      <tab :line-width=2 active-color='#0066CC' v-model="index">
        <tab-item class="vux-center vux-1px-r" @on-item-click='cut1'>已完成订单</tab-item>
        <tab-item class="vux-center vux-1px-r" @on-item-click='cut2'>未完成订单</tab-item>
      </tab>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { Panel, Tab, TabItem } from "vux";
export default {
  components: {
    Panel,
    Tab,
    TabItem
  },
  data() {
    return {
      index: 0
    };
  },
  methods: {
    cut1() {
      this.$router.push({
        path: "/finishOrder"
      });
    },
    cut2() {
      this.$router.push({
        path: "/unfinishedOrder2"
      });
    }
  }
};
</script>


<style lang="stylus" >
@import '../../common/stylus/mixins.styl';

.orders {
  background-color: #ddd;
  // height: 100vh;
}
.vux-tab{
  z-index 100000
}
</style>

