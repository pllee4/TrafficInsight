<template>
  <apexchart ref="chart" width="100%" height="400px" type="bar" :options="options" :series="series"></apexchart>
</template>

<script>
export default {
  data: function () {
    return {
      options: {
        bar: {
          dataLabels: {
            position: 'top' // top, center, bottom
          }
        }
      },
      series: [{
        name: 'Inflation',
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
      }]
    }
  }
}
</script>
