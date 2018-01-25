<template>
  <div class="orders">
    <!-- <banner-header></banner-header> -->
    <div class="tab">
      <tab :line-width=1 active-color='#0066CC' v-model="index">
        <tab-item class="vux-center vux-1px-r" @on-item-click='cut1'>已完成订单</tab-item>
        <tab-item class="vux-center vux-1px-r" @on-item-click='cut2'>未完成订单</tab-item>
      </tab>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import bannerHeader from "./header.vue";
import { Panel, Tab, TabItem } from "vux";
const list = () => ["订单明细", "分账明细"];
export default {
  components: {
    Panel,
    Tab,
    TabItem
    // bannerHeader
  },
  data() {
    return {
      list1: list(),
      demo1: "",
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
        path: "/unfinishedOrder"
      });
    }
  }
};
</script>


<style lang="stylus" scoped>
@import '../common/stylus/mixins.styl';

.orders {
  background-color: #ddd;
  height: 100vh;
}
</style>

