import Vue from 'vue'
import element from 'element-ui'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// import { sync } from 'vuex-router-sync'

import App from './app'
import store from './store'
import router from './router'
import plugins from './plugins'

import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
import 'echarts/lib/chart/pie'

import VueApexCharts from 'vue-apexcharts'
import ApexCharts from 'apexcharts'
/**
 * Import styles
 */
import './assets/styles/element.scss'
import './assets/styles/main.scss'

Vue.component('apexchart', VueApexCharts)
Vue.component('chart', ECharts)
/**
 * Use plugins
 */

Vue.use(element)
Vue.use(plugins)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueApexCharts)
// Vue.use(VueFusionCharts, FusionCharts, TimeSeries, Column2D, FusionTheme)
// sync(store, router, { moduleName: 'route' })
/**
 * Config
 */

Vue.config.debug = process.env.NODE_ENV === 'development'
Vue.config.silent = process.env.NODE_ENV === 'production'
Vue.config.devtools = true
Vue.config.productionTip = false

/**
 * Initial
 */

// ...

/**
 * Root app
 */

const app = new Vue({
  name: 'root',
  store: store,
  router: router,
  render: h => h(App)
})

/**
 * Mount to `#app` element
 */
app.$mount('#app')
