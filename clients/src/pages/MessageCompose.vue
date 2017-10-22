<template>
<v-layout> 
  <v-flex xs10>
    <v-card flat>
      <v-card-text>
        <v-form ref="form" v-model="model" v-bind="$data" lazy-validation>
          <div class="my-4" slot="buttons">
            <v-btn class="grey" dark="dark" @click.native="$root.back()"> 
              <v-icon dark="dark" left="left">chevron_left </v-icon><span>{{$t('Back')}}</span>
            </v-btn>
            <v-btn primary="primary" dark="dark" @click="onSubmit" type="submit">{{$t('Submit')}}
              <v-icon right="right" dark="dark">send</v-icon>
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-flex>
</v-layout>
</template>

<script>

export default {
  props: {
    modelCode: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      dialog: false,
      model: {},
      rules: {},
      messages: {},
      fields: {
        from: {
          label: 'From',
          required: true
        },
        subject: {
          label: 'Subject',
          required: true
        },
        templates: {label: 'Templates', type: 'select', choices: [], options: {autocomplete: true, multiple: false, chips: false}},
        html: {
          label: 'Body',
          type: 'html'
        },
        deliveryTime: {label: 'Delivery Time(About 3 days)', type: 'date2'},
        campaigns: {label: 'Campaigns', type: 'select', choices: [], options: {autocomplete: true, multiple: false, chips: true}},
        maillists: {label: 'Mail List', type: 'select', choices: [], options: {autocomplete: false, multiple: true, chips: true}}
      }
    }
  },
  watch: {
    '$route': 'fetch',
    'model': 'updateFields'
  },
  computed: {
    action () {
      if (this.isEdit) {
        return `${this.resource}/${this.id}`
      } else {
        return `/${this.resource}`
      }
    },
    isEdit () {
      return !!this.id
    },
    resource () {
      return this.modelCode
    },
    id () {
      return this.$route.params.id
    }

  },
  methods: {
    updateFields () {
    },
    changeTemplate (data) {
    },
    changeMailList (data) {
    },
    onSubmit () {
      this.$http.post(`${this.resource}`, this.model).then(({ data }) => {
        if (data.error) {
          return alert('Error. Check again information')
        }
        this.onSuccess(data);
      })
    },
    onSuccess (data) {
      this.$router.push({name: 'messageList', params: {resource: this.resource}})
      if (data.id) {
        this.$router.go(-1)
      }
    },
    fetch () {
      this.$http.get(`${this.resource}/${this.id}`, {
        params: {}
      }).then(({data}) => {
        this.model = data;
        this.rules = data.rules;
        this.messages = data.messages;
      })
    },
    fetchDataTemplate () {
      this.$http.get('templates').then(respone => {
        if (respone.status !== 200) {
          return 1;
        }
        const fieldsNew = JSON.parse(JSON.stringify(this.fields));
        fieldsNew.templates.choices = respone.data;
        this.fields = fieldsNew;
      })
    },
    fetchDataMailList () {
      this.$http.get('maillists').then(respone => {
        if (respone.status !== 200) {
          return 1;
        }
        const fieldsNew = JSON.parse(JSON.stringify(this.fields));
        fieldsNew.maillists.choices = respone.data.items;
        this.fields = fieldsNew;
      })
    },
    fetchDataCampaigns () {
      this.$http.get('campaigns').then(respone => {
        if (respone.status !== 200) {
          return 1;
        }
        const fieldsNew = JSON.parse(JSON.stringify(this.fields));
        fieldsNew.campaigns.choices = respone.data.items;
        this.fields = fieldsNew;
      })
    }
  },
  created () {
    let pageTitle = (this.isEdit ? 'Update' : 'Create') + ' ' + global.helper.i.titleize(global.helper.i.singularize(this.resource))
    this.$store.commit('setPageTitle', pageTitle);
    this.fetchDataTemplate();
    this.fetchDataMailList();
    this.fetchDataCampaigns();
  }
}
</script>
