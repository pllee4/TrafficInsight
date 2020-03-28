<template>
<div>
  <b-container fluid>
    <!-- <b-row class="weather-info">
      <img :src="`${icon}`" class="weather-icon">
      <div class="description">
        <h5>
          {{temp}}&degC
          {{description}}
        </h5>
      </div>
    </b-row> -->
    <b-row>
      <b-col v-for="stats in statsCards" :key="stats.title">
        <div class="card">
          <div class="col-5">
            <div class="icon-big text-center">
              <div class="icon icon-size" :class="`icon-${stats.icon}  ${stats.class}`"></div>
            </div>
          </div>
          <div class="card-body">
            <div class="head">
              {{stats.title}}
            </div>
            <div class="value">
              {{stats.value}}
            </div>
          </div>
          <div class="card-footer">
            <hr>
            <div class="stats">
              <div class="icon footer-text" :class="`icon-${stats.footerIcon}`">
              </div>
              <div class="footer-text">
                {{stats.footerText}}
              </div>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
  <!-- <div class="dropdown">
    <b-dropdown id="dropdown-1" text="Dropdown" variant="primary" class="m-md-2">
      <b-dropdown-item>First Action</b-dropdown-item>
      <b-dropdown-item>Second Action</b-dropdown-item>
      <b-dropdown-item>Third Action</b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item active>Active action</b-dropdown-item>
      <b-dropdown-item disabled>Disabled action</b-dropdown-item>
    </b-dropdown>
  </div> -->
  <apexchart ref="chart" width="100%" height="400px" type="line" :options="options" :series="series"></apexchart>
  <h3>
    timestamp = {{timestamp}}
    <br />
    trafficflow = {{trafficflow}}
  </h3>
  <!-- <div class="Overview">
      <chart ref="Overview-chart" :options="orgOptions" :auto-resize="true"></chart>
    </div> -->

</div>
</template>

<script>
// import StatsCard from '../components/statscard'
import Datepicker from 'vuejs-datepicker'
import moment from 'moment'
// import 'bootstrap/dist/css/bootstrap.css';
// import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

export default {
  components: {
    // StatsCard,
    Datepicker
  },
  data () {
    return {
      // date: new Date(2016, 9, 16),
      date: '',
      statsCards: [{
        icon: 'database',
        title: 'Total number of cars',
        value: '105,600',
        footerText: 'Updated now',
        footerIcon: 'loop2',
        class: 'card1',
      },
      {
        icon: 'switch',
        title: 'Counter opened',
        value: '21',
        footerText: 'Last day',
        footerIcon: 'loop2',
        class: 'card2'
      },
      {
        icon: 'switch',
        title: 'Counter closed',
        value: '20',
        footerText: 'In the last hour',
        footerIcon: 'loop2',
        class: 'card3'
      }
      ]
    }
  },
  mounted () {
    window.setInterval(() => {
      this.$store.dispatch('getTrafficFlow')
    }, 3000)
  },
  // created(){
  //   this.$store.subscribe((mutation, state) => {
  //     if (state.traffic.flow){
  //       // console.log(state.traffic.flow)
  //     } else{
  //       console.log("Fetching data...")
  //     }
  //   });
  // },
  watch: {
    date: function (newValue, oldValue) {
      if (String(newValue) != oldValue) {
        console.log('Different')
        if (newValue) {
          console.log(String(newValue.getDate() + '-' + (newValue.getMonth() + 1) + '-' + newValue.getFullYear()))
        }
      } else {
        console.log('Same')
      }
    },
    timestamp: function (newValue, oldValue) {
      console.log('watching...data changed from' + oldValue + ' to ' + newValue)
      this.updateGraph()
      console.log(this.series[0].data[this.series[0].data.length - 1])
    }
  },
  methods: {
    // formatDate (date) {
    //   return moment(date).format('DD-MM-YYYY')
    // },
    updateGraph () {
      this.series[0].data.push(this.trafficflow)
      this.options.xaxis.categories.push(this.timestamp)

      this.$refs.chart.updateOptions({
        xaxis: {
          categories: this.options.xaxis.categories
        },
        series: this.series
      })
    }
  },
  computed: {
    series () {
      return [{
        name: 'actual',
        data: []
        // data: [10, 41, 35, 51, 49, 62, 69, 91, 99]
      },
      {
        name: 'predicted',
        data: [20, 41, 23, 72, 73, 12, 14, 64, 90]
      }
      ]
    },
    options () {
      return {
        chart: {
          height: 350,
          zoom: {
            enabled: true
          },
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight',
          dashArray: [0, 10]
        },
        title: {
          text: 'Real time trafficflow',
          align: 'center'
        },
        xaxis: {
          // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
          categories: []
        }
      }
    },
    trafficflow () {
      return this.$store.state.traffic.flow
    },
    timestamp () {
      return this.$store.state.traffic.timestamp
    },
    temp () {
      return this.$store.state.weather.temp
    },
    description () {
      return this.$store.state.weather.description
    },
    icon () {
      return this.$store.state.weather.icon
    }
  }
}
</script>

<style scoped>
.dropdown {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  /* -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between; */

  /* Adding for cross browser support */
  /* display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between; */
}

.card {
  border-radius: 6px;
  box-shadow: 0 2px 2px rgba(204, 197, 185, 0.5);
  background-color: #FFFFFF;
  color: #252422;
  /* margin-bottom: 20px; */
  position: relative;
  z-index: 1;
  border: none;
}

.card-body {
  padding: 15px 15px 5px 15px;
}

.card-footer {
  padding: 0px;
  line-height: 30px;
  font-size: 1.2em;
}

hr {
  background-color: #a9a9a9;
  margin-top: 5px;
  margin-bottom: 5px;
}

.card-footer div {
  display: inline-block;
}

.stats {
  color: #a9a9a9;
  font-weight: 300;

  margin-left: 20px i {
    margin-right: 2px;
    min-width: 15px;
    display: inline-block;
  }
}

.text-center {
  text-align: center !important;
}

.value {
  font-size: 2em;
  text-align: right;
}

.head {
  font-size: 1.5em;
  text-align: right;
}

.card-header {
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}

.icon-big {
  font-size: 5em;
  min-height: 1px;
}

.text-center {
  /* text-align: center !important; */
}

.col-5 {
  -ms-flex: 0 0 11.666667%;
  flex: 0 0 41.666667%;
  max-width: 41.666667%;
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
}

p {
  margin: 0;
}

.icon-size {
  width: 14px !important;
  height: 8px !important;
  margin-left: 50px;
  margin-bottom: -15px;
}

.footer-text {
  margin-left: 15px;
}

.card1{
  color: #1a3278;
}

.card2{
  color: #77f29a;
}

.card3{
  color: #ff0059;
}

.description{
  float: left;
}

.weather-info{
  margin-top: -10px;
}

.weather-icon{
  float: left;
  height: 30px;
}
</style>
