import { axios, storage } from '../utils'

const state = {
  /**
   * 客户端会话信息
   * @type {Object}
   * TODO: storage - local or session
   */
  session: storage.get('session_info') || {},

  /**
   * 顶部工具栏
   * @type {Object}
   */
  header: {
    /**
     * 站点名称
     * @type {String}
     */
    name: 'Traffic Insight',

    /**
     * 顶部菜单
     * @type {Array}
     */
    menus: [
      {
        text: 'New',
        icon: 'display',
        name: 'users',
        params: { type: 'blog' }
      },
      // Component Pages
      {
        text: 'Components',
        icon: 'lab',
        name: 'components',
        children: [
          { text: 'Icons', name: 'components-icons' },
          { text: 'Button', name: 'components-button' },
          { text: 'Table', name: 'components-table' }
        ]
      },
      // Demo Pages
      {
        text: 'Demo',
        icon: 'magic-wand',
        name: 'demo',
        children: [
          { text: 'Data', name: 'demo-data' },
          { text: 'Params', name: 'demo-params', params: { name: '汪磊' } },
          { text: 'Vuex', name: 'demo-vuex' },
          { text: 'I18n', name: 'demo-i18n' },
          { divider: true },
          { text: 'Proxy', name: 'demo-proxy' },
          { text: 'CORS', name: 'demo-cors' },
          { divider: true },
          { text: 'NotFound', path: '/hello-world' }
        ]
      }
    ]
  },

  /**
   * 侧边导航栏
   * @type {Object}
   */
  sidebar: {
    /**
     * 版权所属
     * @type {String}
     */
    copyright: 'TraficInsight',

    /**
     * 是否收起边栏
     * @type {Boolean}
     */
    collapse: storage.get('sidebar_collapse'),

    /**
     * 侧边菜单
     * @type {Array}
     */
    menus: [
      {
        title: 'Actions'
      },
      {
        divider: true
      },
      {
        text: 'Overview',
        icon: 'stats-dots',
        name: 'overview'
      },
      {
        divider: true
      },
      {
        text: 'Pie',
        icon: 'pie-chart',
        name: 'pie'
      },
      {
        divider: true
      },
      {
        text: 'Bar',
        icon: 'stats-bars',
        name: 'bar'
      },
      {
        divider: true
      },
      {
        text: 'History',
        icon: 'history',
        children: [
          { text: 'Graph', name: 'history-graph' },
          { text: 'Bar', name: 'history-bar' },
          { text: 'Pie', name: 'history-pie' }
        ]
      },
      {
        divider: true
      },
      {
        text: 'Reporting',
        icon: 'file-text',
        name: 'users',
        children: [
          { text: 'All users', name: 'users' },
          { text: 'Roles', name: 'roles' },
          { text: 'Permissions', name: 'permissions' }
        ]
      },
      {
        divider: true
      },
      {
        text: 'Camera Feed',
        icon: 'camera',
        name: 'comments'
      },
      {
        divider: true
      },
      {
        text: 'Settings',
        icon: 'wrench',
        name: 'options',
        params: { type: 'general' },
        children: [
          { text: 'General', name: 'options', params: { type: 'general' } },
          { divider: true },
          { text: 'Writing', name: 'options', params: { type: 'writing' } },
          { text: 'Reading', name: 'options', params: { type: 'reading' } },
          { text: 'Discussion', name: 'options', params: { type: 'discussion' } },
          { text: 'Media', name: 'options', params: { type: 'media' } },
          { text: 'Permalink', name: 'options', params: { type: 'permalink' } }
        ]
      }
    ]
  },

  // ==================== DEMO ====================

  /**
   * 计数器
   * @type {Number}
   */
  count: storage.get('demo_count') || 0,

  /**
   *
   * @type {Object}
   */
  traffic: {
    flow: storage.get('traffic_flow'),
    timestamp: storage.get('traffic_timestamp')
  },

  weather: {
    temp: storage.get('weather_temp'),
    description: storage.get('weather_description'),
    icon: storage.get('weather_icon')
  }

}

if (state.session && state.session.token) {
  // init axios headers
  axios.defaults.headers.Authorization = `Bearer ${state.session.token}`
}

export default state
