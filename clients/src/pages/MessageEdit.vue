<template>
<v-layout> 
  <v-flex xs8="xs8">
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
        type_id: {
          type: 'select',
          label: 'Type',
          required: true
        },
        title: {
          label: 'title',
          required: true
        },
        body: {
          label: 'Body',
          type: 'html'
        }
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
      console.log(this, 'hahaaaaaaa')
    },
    onSubmit () {
      this.$http.post(`${this.resource}`, this.model).then(({ data }) => {
        this.onSuccess(data);
      })
    },
    onSuccess (data) {
      this.$router.push({name: 'productList', params: {resource: this.resource}})
      if (data.id) {
        this.$router.go(-1)
      }
    },
    fetch () {
      this.$http.get(`${this.resource}/${this.id}`, {
        params: {}
      }).then(({data}) => {
        this.model = data;
        this.rules = data.rules
        this.messages = data.messages
      })
    },
    fetchDataCategories () {
      this.$http.get('categories').then(respone => {
        if (respone.status !== 200) {
          return 1;
        }
        const fieldsNew = JSON.parse(JSON.stringify(this.fields));
        fieldsNew.categories.choices = respone.data;
        this.fields = fieldsNew;
      })
    },
    fetchDataCollections () {
      this.$http.get('collections').then(respone => {
        if (respone.status !== 200) {
          return 1;
        }
        const fieldsNew = JSON.parse(JSON.stringify(this.fields));
        fieldsNew.collections.choices = respone.data;
        this.fields = fieldsNew;
      })
    }
  },
  created () {
    let pageTitle = (this.isEdit ? 'Update' : 'Create') + ' ' + global.helper.i.titleize(global.helper.i.singularize(this.resource))
    this.$store.commit('setPageTitle', pageTitle);
    this.fetchDataCategories();
    this.fetchDataCollections();
  }
}
</script>
