<template>
<v-layout>
  <v-flex md4="md4">
    <v-card flat="flat">
      <v-card-text>
        <h5>{{$t('Result:')}}</h5>
        <p>{{model}}</p>
      </v-card-text>
    </v-card>
  </v-flex>
  <v-flex md8="md8">
    <v-card flat="flat">
      <v-card-text>
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
      </v-card-text>
    </v-card>
  </v-flex>
</v-layout>

</template>
<script>

export default {

  data () {
    return {
      model: {},
      rules: {},
      messages: {},
      'fields': {
        'name': {label: 'Name'},
        'sku': {label: 'SKU', type: 'text'},
        'slug': {label: 'Slug', type: 'text'},
        'price': {label: 'Price', type: 'number'},
        'stock': {label: 'Stock', type: 'number'},
        'images': {label: 'Images', type: 'image'},
        'start': {label: 'Start At', type: 'datetime'},
        'categories': {label: 'Category', type: 'select', options: {autocomplete: true, multiple: false}},
        'collections': {label: 'Collections', type: 'select', options: {autocomplete: false, multiple: true, chips: true}},
        'end': {label: 'End At', type: 'datetime'},
        'status': {label: 'Status',
          type: 'switch',
          width: 'md3',
          options: [
            {text: 'Enabled', value: 1},
            {text: 'Disabled', value: 2}
          ]},
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
