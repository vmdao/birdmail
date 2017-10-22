<template>
<v-layout row wrap> 
    <v-flex xs10 offset-xs1>
      <v-card class="chart pa-2">
        <h2>Campaigns Analytic Bar</h2>
        <v-bar :data="dataCollection"
          :height="400"
          :options="{responsive: true, maintainAspectRatio: false}"
        ></v-bar>
      </v-card>
    </v-flex>
    <v-flex xs10 offset-xs1>
      <v-card class="chart pa-2"> 
        <h2>Campaigns Analytic Line</h2>       
        <v-line :data="dataCollection"
          :options="{responsive: true, maintainAspectRatio: false}"
        ></v-line>
      </v-card>
    </v-flex>
    <v-flex xs10 offset-xs1>
      <v-card>
      <v-card-text> 
        <h5> Email System for marketing. Power by Mailgun</h5>
        <h6> Version 0.1 will upgrade</h6>
      </v-card-text> 
      <v-card-text>
        <ul>
          <p>Hướng dẫn soạn email cơ bản</p>
          <li>1. Tạo maillist lập danh sách tập contacts</li>
          <li>2. Tạo contact trong maillist hoặc Upload danh sách contacts bằng file csv</li>
          <li>3. Soạn mail chọn mailist muốn gửi, viết nội dung, send</li>
        </ul> 
      </v-card-text>
      <v-card-text>
        <ul>
          <p>Tracking cơ bản</p>
          <li>1. Vào maillist quan sát thông tin dòng maillist</li>
          <li>2. comming soon</li>
        </ul> 
      </v-card-text>
      </v-card>
    </v-flex>
</v-layout> 
</template>

<script>
export default {
  data () {
    return {
      dataCollection: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Mail Analyticsss',
            backgroundColor: '#53346d',
            data: [40, 20, 12, 39, 10, 40, 39, 40, 23, 20, 12, 11]
          },
          {
            label: 'Mails Analyticsss',
            backgroundColor: '#c6c6c6',
            data: [40, 11, 12, 39, 10, 40, 39, 40, 33, 20, 13, 11]
          }
        ]
      }
    }
  },
  methods: {
    capitalizeFirstLetter (string) {
      let str = string.charAt(0).toUpperCase() + string.slice(1);
      return str.split("_")[0]
    },
    fetchCampaign () {
      this.$http.get(`campaigns`, {
        params: {}
      }).then(({data}) => {
        const fieds = ['submitted_count', 'clicked_count', 'complained_count', 'opened_count', 'clicked_count', 'bounced_count', 'dropped_count', 'delivered_count'];
        const color = ['#53346d', '#c6c6c6', 'red']
        const dataCollection = {
          labels: [],
          datasets: []
        };
        const dataSets = data.items.map((item, index) => {
          const d = fieds.map(f => {
            return item[f]
          })
          return {
            data: d,
            label: item.name,
            backgroundColor: color[index]
          }
        })
        dataCollection.datasets = dataSets;
        dataCollection.labels = fieds.map(f => {
          return this.capitalizeFirstLetter(f);
        })
        this.dataCollection = dataCollection;
      })
    }
  },
  mounted () {
    this.fetchCampaign();
  }
}
</script>
<style>
  .chart {
    background-color: #212733 !important;
    border-radius: 15px;
    box-shadow: 0 2px 15px rgba(20,25,25,.27);
    margin: 25px 0;
  }
  .chart h2 {
    margin-top: 0;
    padding: 15px 0;
    color: rgba(255,0,0,.5);
    border-bottom: 1px solid #323d54;
    text-align: center;
    font-size: 1.5em;
  }
</style>
