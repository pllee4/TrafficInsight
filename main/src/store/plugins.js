import { axios, storage } from '../utils'
import { CHANGE_SESSION, TOGGLE_SIDEBAR_COLLAPSE, INCREMENT, DECREMENT, GET_TRAFFIC_FLOW, GET_WEATHER } from './mutation-types'

const storagePlugin = store => {
  // called when the store is initialized
  store.subscribe((mutation, state) => {
    // called after every mutation.
    // The mutation comes in the format of `{ type, payload }`.
    switch (mutation.type) {
      case CHANGE_SESSION:
        // save session
        storage.set('session_info', state.session)
        break
      case TOGGLE_SIDEBAR_COLLAPSE:
        // save sidebar collapse
        storage.set('sidebar_collapse', state.sidebar.collapse)
        break
      case INCREMENT:
      case DECREMENT:
        // save demo counter
        storage.set('demo_count', state.count)
        break
      case GET_TRAFFIC_FLOW:
        storage.set('traffic_flow', state.traffic.flow)
        storage.set('traffic_timestamp', state.traffic.timestamp)
        break
      case GET_WEATHER:
        storage.set('weather_temp', state.weather.temp)
        storage.set('weather_description', state.weather.description)
        storage.set('weather_icon', state.weather.icon)
        break
    }
  })
}

const axiosPlugin = store => {
  // called when the store is initialized
  store.subscribe((mutation, state) => {
    // called after every mutation.
    // The mutation comes in the format of `{ type, payload }`.
    if (mutation.type !== CHANGE_SESSION) return

    // change axios default request auth token
    if (state.session && state.session.token) {
      // change axios authorization header
      axios.defaults.headers.Authorization = `Bearer ${state.session.token}`
    }
  })
}

export default [
  storagePlugin,
  axiosPlugin
]
