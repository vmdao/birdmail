import {Line, mixins} from 'vue-chartjs';
const {reactiveProp} = mixins;
export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    console.log(this.chartData, 2121)
    this.renderChart(this.chartData, this.options)
  }
}
