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
        name: {
          label: 'Name',
          required: true
        },
        subject: {
          label: 'Subject',
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
    onSubmit () {
      this.$http.put(`${this.resource}/${this.id}`, this.model).then(({ data }) => {
        this.onSuccess(data);
      })
    },
    onSuccess (data) {
      this.$router.push({name: 'templateList', params: {resource: this.resource}})
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
    }
  },
  created () {
    let pageTitle = (this.isEdit ? 'Update' : 'Create') + ' ' + global.helper.i.titleize(global.helper.i.singularize(this.resource))
    this.$store.commit('setPageTitle', pageTitle);
  },
  mounted () {
    this.fetch();
  }
}
</script>
