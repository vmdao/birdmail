<script>
import {Bar} from 'vue-chartjs'
export default {
  extends: Bar,
  props: ['data', 'options'],
  watch: {
    data: 'updateed'
  },
  methods: {
    updateed () {
      this.renderChart(this.data, this.options)
    }
  },
  mounted () {
    // const data = Object.assign(this.dataCollection, this.dataDefault);
  }
}
</script>
