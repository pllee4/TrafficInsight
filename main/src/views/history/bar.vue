<template>
  <div>
    <datepicker v-model="date" placeholder="Please choose a date" :calendar-button="true" calendar-button-icon="icon icon-calendar"
    :clear-button="true" clear-button-icon="icon icon-cancel-circle" class="calendar":bootstrap-styling="true">
    </datepicker>
  </div>
</template>

<script>

import Datepicker from 'vuejs-datepicker'

export default {
  components: {
    Datepicker
  },
  name: 'history-bar',
  data () {
    return {
      date: ''
    }
  },
  mounted () {
  },
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
    }
  }
}
</script>

<style scoped>
.calendar{
  position:absolute;
}
</style>
