<script>
import {Line} from 'vue-chartjs'
export default {
  extends: Line,
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
