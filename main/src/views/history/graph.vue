<template>
  <div>
    <!-- <i style="float: left;" class="icon icon-calendar"></i>
      <datetime v-model="date" placeholder="Please choose a date" format="dd-MM-yyyy" class="theme-orange calendar" @change="dateSelected()">
      </datetime> -->
    <datepicker v-model="date" placeholder="Please choose a date" :calendar-button="true" calendar-button-icon="icon icon-calendar"
    :clear-button="true" clear-button-icon="icon icon-cancel-circle" :disabledDates="disabledDates" class="calendar":bootstrap-styling="true"></datepicker>
  </div>
</template>

<script>

import Datepicker from 'vuejs-datepicker'

export default {
  components: {
    Datepicker
  },
  name: 'history-graph',
  data () {
    return {
      disabledDates: {
        daysOfMonth: [
          12,
          18,
          30
        ]
      },
      date: ''
    }
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
