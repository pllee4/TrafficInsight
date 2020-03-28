<template>
  <div>
    <!-- <apexchart ref="chart" width="100%" height="400px" type="pie" :options="options" :series="series"></apexchart> -->
      <v-chart :options="polar"/>
  </div>
</template>

<script>
import ECharts from 'vue-echarts'
// import 'echarts/lib/chart/line'
// import 'echarts/lib/component/polar'

export default {
  components: {
    'v-chart': ECharts
  },
  data: function () {
    // data: [
    //   { value: 335, name: '直接访问' },
    //   { value: 310, name: '邮件营销' },
    //   { value: 234, name: '联盟广告' },
    //   { value: 135, name: '视频广告' },
    //   { value: 1548, name: '搜索引擎' }
    // ]
    return {
      // options: {
      //   labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      //   responsive: [{
      //     breakpoint: 480,
      //     options: {
      //       chart: {
      //         width: 200
      //       },
      //       legend: {
      //         position: 'bottom'
      //       }
      //     }
      //   }]
      // },
      // series: [44, 55, 41, 17, 15],

      polar: {
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          left: 'center',
          show: true
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          show: true,
          left: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  }
}
</script>
