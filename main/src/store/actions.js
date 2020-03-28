import { TokenService, UserService } from '../services'
import { CHANGE_SESSION, TOGGLE_SIDEBAR_COLLAPSE, INCREMENT, DECREMENT, GET_TRAFFIC_FLOW, GET_WEATHER } from './mutation-types'

export default {
  /**
   * 改变页面标题
   */
  changeTitle: ({ commit }, title) => {
    commit(CHANGE_SESSION, { title: title })
  },

  /**
   * 创建新的客户端令牌
   */
  createToken: ({ commit }, { username, password }) => {
    return TokenService.post({
      username: username.trim(),
      password: password.trim()
    })
      .then(res => {
        commit(CHANGE_SESSION, { token: res.data.token })
        return res.data.token
      })
  },

  /**
   * 检查客户端令牌是否可用
   */
  checkToken: ({ commit, getters }) => {
    return new Promise((resolve, reject) => {
      // validate local store
      if (!getters.session.token) {
        return resolve(false)
      }
      // remote
      TokenService.get()
        .then(res => resolve(true))
        .catch(err => {
          console.error(err)
          commit(CHANGE_SESSION, { token: null })
          resolve(false)
        })
    })
  },

  /**
   * 删除客户端令牌
   */
  deleteToken: ({ commit, getters }) => {
    return TokenService.delete(getters.session.token)
      .then(res => {
        commit(CHANGE_SESSION, { token: null })
      })
  },

  /**
   * 获取当前登录用户信息
   */
  getCurrentUser: ({ commit }) => {
    return UserService.get('me')
      .then(res => {
        commit(CHANGE_SESSION, { user: res.data })
        return res.data
      })
  },

  /**
   * 切换边栏的展开收起
   */
  toggleSidebarCollapse: ({ commit }) => {
    commit(TOGGLE_SIDEBAR_COLLAPSE)
  },

  // ==================== DEMO ====================

  /**
   * 增加计数器计数
   */
  increment: ({ commit }) => commit(INCREMENT),

  /**
   * 增加计数器计数
   */
  incrementAsync: ({ commit }) => setTimeout(() => commit(INCREMENT), 1000),

  /**
   * 减少计数器计数
   */
  decrement: ({ commit }) => commit(DECREMENT),

  /**
   * 减少计数器计数
   */
  decrementAsync: ({ commit }) => setTimeout(() => commit(DECREMENT), 1000),

  getTrafficFlow: ({ commit }) => {

    var timestamp;
    var flow;

    var traffic_url = 'http://localhost:3000/https://traffic.ls.hereapi.com/traffic/6.2/flow/json/8/134/86?apiKey=WjsBGdFvSK97byVwsm2rUHLMlPsGnEfcRgURoCv3Kzg'
    fetch(
      traffic_url, {
      }
    )
    .then((response) => {
      return response.json()
    })
    .then((myJson) => {
      timestamp = new Date(myJson.CREATED_TIMESTAMP).toLocaleString('en-US', { timeZone: 'Asia/Shanghai' })
      flow = myJson.RWS[0].RW[2].FIS[0].FI[0].CF[0].SU
      commit(GET_TRAFFIC_FLOW, { flow: flow, timestamp: timestamp })
    })

    var request = require('request')
    //
    // var options = {
    //   method: 'POST',
    //   url: 'http://localhost:3000/https://trafficdata-9c4b.restdb.io/rest/trafficflow',
    //   headers:
    //    { 'cache-control': 'no-cache',
    //      'x-apikey': '04f38926441ca1d56ce0d13967d09bb9999ba',
    //      'content-type': 'application/json' },
    //   body: { flow: flow, timestamp: timestamp },
    //   json: true };
    //
    // request(options, function (error, response, body) {
    //   if (error) throw new Error(error);
    //
    //   console.log(body);
    // });

    // var headers = new Headers({
    //     'cache-control': 'no-cache',
    //     'x-apikey': '04f38926441ca1d56ce0d13967d09bb9999ba'
    // });
    //
    // fetch('http://localhost:3000/https://trafficdata-9c4b.restdb.io/rest/trafficflow', {
    //   method: 'GET', headers: headers,
    //   },
    // )
    // .then((response) => {
    //   console.log(response)
    //   return response.json()
    // })
    // .then((myJson) => {
    //   console.log(myJson)
    // })
    // .catch((err) => {
    //   console.log("Something went wrong!", err);
    // })

    // var options = {
    //   method: 'GET',
    //   url: 'http://localhost:3000/https://trafficdata-9c4b.restdb.io/rest/trafficflow',
    //   headers:
    //    { 'cache-control': 'no-cache',
    //      'x-apikey': '04f38926441ca1d56ce0d13967d09bb9999ba'
    //    }
    // };
    //
    // request(options, function (error, response, body) {
    //   return response.json()
    //   if (error) throw new Error(error);
    //
    //   console.log(body);
    // });

    var apiKey = 'WjsBGdFvSK97byVwsm2rUHLMlPsGnEfcRgURoCv3Kzg'
    var weather_url = 'http://localhost:3000/https://weather.ls.hereapi.com/weather/1.0/report.json?apiKey=' + apiKey + '&product=observation&name=Johor'
    fetch(
      weather_url, {
      }
    )
    .then((response) => {
      return response.json()
    })
    .then((myJson) => { // description / skyDescription / temperatureDesc
      var weather_temp = myJson.observations.location[0].observation[0].temperature
      var weather_description = myJson.observations.location[0].observation[0].temperatureDesc
      var weather_icon = myJson.observations.location[0].observation[0].iconLink + '?apiKey=' +
          apiKey
      weather_icon = "http://10.208.98.181:8080/video"
      commit(GET_WEATHER, { temp: weather_temp, description: weather_description, icon: weather_icon })
    })
  }
}
