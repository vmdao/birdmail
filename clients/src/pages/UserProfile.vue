<template>
<v-card>
  <v-layout row wrap>
      <v-flex xs8 offset-xs2 pa-5>
          <div class="page-title">
            <h5>{{pageTitle}}</h5>
          </div>
          <v-form v-model="model" v-bind="$data">
            <div class="my-4" slot="buttons">
              <v-btn class="grey" dark="dark" @click.native="$root.back()"> 
                <v-icon dark="dark" left="left">chevron_left </v-icon><span>Back</span>
              </v-btn>
              <v-btn primary="primary" dark="dark" type="submit">Submit
                <v-icon right="right" dark="dark">send</v-icon>
              </v-btn>
            </div>
          </v-form>
      </v-flex>
  </v-layout>
</v-card>
</template>
<script>

export default {

  data () {
    return {
      model: {},
      rules: {},
      messages: {},
      pageTitle: "Your Profile",
      'fields': {
        'name': {label: 'Name'},
        'email': {label: 'Email', type: 'text'},
        'address': {label: 'Adress', type: 'text'},
        'country': {label: 'Country', type: 'text'},
        'city': {label: 'City', type: 'text'},
        'phone': {label: 'Phone', type: 'number'},
        'zipcode': {label: 'Zip', type: 'text'},
        'description': {label: 'Description(Textarea)', type: 'textarea'}
      }
    }
  },
  computed: {
    isEdit () {
      return !!this.id
    }
  },
  watch: {
    '$route': 'fetch',
    'model': 'updateFields'
  },
  methods: {
    getFieldError (fieldName) {
      for (let k in this.errors) {
        let error = this.errors[k]
        if (error.field === fieldName) {
          return error.message
        }
      }
    },
    updateFields () {

    },
    fetch () {
      this.$http.get(`settings/form`, {
        params: {id: this.id}
      }).then(({data}) => {
        this.model = data.model
        this.fields = data.fields
        this.rules = data.rules
        this.messages = data.messages
      })
    },
    onSubmit () {

    },
    onSuccess (data) {

    }
  },
  created () {

  },
  mounted () {
    // this.fetch()
  }
}
</script>
