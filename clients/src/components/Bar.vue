<template>
  <div class="small">
    <template>
    <line-chart :chart-data="dataCollection"></line-chart>
    <button @click="fillData">Randomize</button>
    </template>
  </div>
</template>
<script>
import {LineChart} from './LineChart';
export default {
  components: {
    'line-chart': LineChart
  },
  data () {
    return {
      dataCollection: {}
    }
  },
  mounted () {
    this.fillData()
  },
  methods: {
    fillData () {
      this.dataCollection = {
        labels: [this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [this.getRandomInt(), this.getRandomInt()]
          }, {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [this.getRandomInt(), this.getRandomInt()]
          }
        ]
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  }
}
</script>
<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>
