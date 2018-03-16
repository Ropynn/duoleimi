<template>
  <div class="business">
    <header>
      <div class="headimg">
        <img :src="user.headimgurl">
      </div>
      <div class="uname">
        <div>{{user.nickname}}</div>
        <div>普通会员</div>
      </div>
    </header>

    <div class="today container">
      <div class="head">当日数据</div>
      <grid :cols="3">
        <grid-item>
          <div class="dec">新增用户</div>
          <span class="grid-center">{{allInfo.nPerson}}</span>
        </grid-item>
        <grid-item>
          <div class="dec">新增订单</div>
          <span class="grid-center">{{allInfo.nOrder}}</span>
        </grid-item>
        <grid-item>
          <div class="dec">新增管理员</div>
          <span class="grid-center">{{allInfo.nAdminer}}</span>
        </grid-item>
      </grid>
    </div>

    <div class="all container">
      <div class="head">总数据</div>
      <grid :cols="3">
        <grid-item>
          <div class="dec">注册用户</div>
          <span class="grid-center">{{allInfo.aPerson}}</span>
        </grid-item>
        <grid-item>
          <div class="dec">订单</div>
          <span class="grid-center">{{allInfo.aOrder}}</span>
        </grid-item>
        <grid-item>
          <div class="dec">管理员</div>
          <span class="grid-center">{{allInfo.aAdminer}}</span>
        </grid-item>
      </grid>
    </div>

    <div class="all_money container">
      <div class="head">总收入（元）</div>
      <grid :cols="col">
        <grid-item>
          <div class="dec">投资人收益</div>
          <span class="grid-center">{{allMoney.investo/100 || 0}}</span>
        </grid-item>
        <grid-item>
          <div class="dec">合伙人收益</div>
          <span class="grid-center">{{allMoney.partner/100 || 0}}</span>
        </grid-item>
        <grid-item>
          <div class="dec">店家收益</div>
          <span class="grid-center">{{allMoney.owner/100 ||0}}</span>
        </grid-item>
        <grid-item>
          <div class="dec">平台收益</div>
          <span class="grid-center">{{allMoney.platform/100 || 0}}</span>
        </grid-item>
      </grid>
    </div>

    <div class="command">
      <div class="head">走势图</div>
      <div id="myCharts"></div>
    </div>
  </div>
</template>

<script>
import { Grid, GridItem, GroupTitle } from "vux";
const format = require("date-fns/format");
// 引入 ECharts 主模块
// import echarts from "echarts";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
export default {
  components: {
    Grid,
    GridItem,
    GroupTitle
  },
  data() {
    return {
      user: {},
      allInfo: {},
      allMoney: {},
      col: 2,
      date: [
        format(new Date() - 6 * 24 * 3600 * 1000, "MM-DD"),
        format(new Date() - 5 * 24 * 3600 * 1000, "MM-DD"),
        format(new Date() - 4 * 24 * 3600 * 1000, "MM-DD"),
        format(new Date() - 3 * 24 * 3600 * 1000, "MM-DD"),
        format(new Date() - 2 * 24 * 3600 * 1000, "MM-DD"),
        format(new Date() - 1 * 24 * 3600 * 1000, "MM-DD"),
        format(new Date(), "MM-DD")
      ]
    };
  },
  created() {
    this.axios.get(this.api+"/wx/getUser").then(res => {
      if (res.data.statu == 1) {
        // console.log(res);
        this.user = res.data.user;
      } else {
        window.location = this.api+"/wx/login?goback=businessman";
      }
    });
    this.axios.get(this.api+"/wx/getAllHome").then(res => {
      console.log(res);
      this.allInfo = res.data;
    });
    this.axios.get(this.api+"/wx/getAllMoney").then(res => {
      console.log(res);
      this.allMoney = res.data;
    });
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myCharts"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["新注册用户", "新增订单", "新增管理员"]
        },
        textStyle: {
          fontFamily: "Arial",
          fontSize: "14px"
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.date
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "新注册用户",
            type: "line",
            smooth: true,
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210],
            label: { show: true }
          },
          {
            name: "新增订单",
            type: "line",
            smooth: true,
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310],
            label: { show: true }
          },
          {
            name: "新增管理员",
            type: "line",
            smooth: true,
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410],
            label: { show: true }
          }
        ]
      });
    }
  },
  mounted() {
    this.drawLine();
  }
};
</script>

<style lang="stylus" scoped>
@import '../common/stylus/mixins.styl';

.business {
  background-color: #ddd;

  header {
    background-color: #fe4871;
    padding: px2rem(20px);
  }

  .headimg {
    display: inline-block;

    img {
      height: px2rem(100px);
      vertical-align: middle;
    }
  }

  .uname {
    padding-left px2rem(20px)
    display: inline-block;
    font-size: 14px;
    vertical-align middle
  }
  .dec{
    text-align center
  }

  .grid-center {
    display: block;
    text-align: center;
    color: #666;
    font-size: 16px;
  }

  .container {
    margin-top: px2rem(20px);
    background-color: #fff;
    border: 1px solid #ccc;
  }

  .head {
    padding: px2rem(20px);
    text-align: center;
  }

  .command {
    background-color: #fff;
    margin-top: px2rem(20px);
  }

  #myCharts {
    width: 100%;
    height: px2rem(700px);
    font-size: 14px;
  }
}
</style>

