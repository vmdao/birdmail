<template lang="pug">
div()
  v-layout
    v-flex(md4)
      v-upload(:field="modelUpload")
    v-flex(md8)
      v-form.row.jr(:inline='true', v-model='filters.model', v-if="filters.fields", :fields='filters.fields', @submit='doSearch', submitButtonText='Search', submitButtonIcon='search')
  v-card
    div
      v-btn(router,fab,absolute,top,right,dark,class="green", :to="{name: 'mailListMemberCreate', params: {resource}}",v-if="options.create !== false")
        v-icon add
    v-data-table(:headers='columns', :items='items',:total-items="pagination.totalItems",hide-actions, :pagination.sync="pagination", :loading="loading")
      template(slot='items', scope='props')
        tr
          td(:class="column.left? '': 'text-xs-right'", v-for='column in columns', v-html="getColumnData(props.item, column)")
          td(v-if='actions !== false', width='160')
            template(v-for="(value, action) in actions")
              v-btn(v-if="['edit', 'delete'].indexOf(action) < 0", router,primary,fab,small,dark,:to="{name: action, params: {resource,id:props.item.id}}")
                v-icon {{action.icon ? action.icon : action}}
            v-btn(v-if="options.edit !== false",dark,primary,fab,small, :to="{name: 'mailListMemberEdit', params: {resource, id:props.item.address, mailListId: mailListId}}")
              v-icon edit
            v-btn(v-if="options.delete !== false",fab,small,@click.native.stop="showDialog(props.item)")
              v-icon delete
            
    .jc
      v-pagination.ma-3(v-model='pagination.page', :length='totalPages', :total-visible="7", :next="next")

  v-dialog(v-model='dialog')
    v-card
      v-card-title.headline You want delete {{currentItem.id}} 
      v-card-text {{currentItem.name}}
      v-card-actions
        v-spacer
        v-btn(color='green darken-1', flat='flat', @click.native='dialog = false') Disagree
        v-btn(color='green darken-1', flat='flat', @click.native='remove(currentItem)') Agree
</template>

<script>

const getDefaultData = () => {
  return {
    dialog: false,
    form: {
      model: {},
      fields: {},
      rules: {},
      messages: {}
    },
    filters: {
      model: {},
      fields: null
    },
    loading: false,
    columns: [], // fetch grid setup params from server if `columns` is empty
    actions: {},
    options: {
      sort: 'id',
      create: true,
      update: true,
      delete: true
    },
    pagination: {
      page: 1,
      rowsPerPage: 10,
      sortBy: 'id',
      descending: true,
      totalItems: 0
    },
    isShowEdit: false,
    currentItem: false,
    items: []
  }
}
export default {
  props: {
    modelCode: {
      type: String,
      default: ''
    }
  },
  data: getDefaultData,

  watch: {
    '$i18n.locale' (val) {
      this.fetchGrid()
    },
    'pagination.page' (val) {
      this.fetchData()
    }
  },
  methods: {
    showDialog (item) {
      this.currentItem = item
      this.dialog = true;
    },
    preFetch () {
      let sort = this.pagination.sortBy
      if (this.pagination.descending) {
        sort = '-' + sort
      }
      // this.$route.query.query = JSON.stringify(this.filters.model)
      this.$route.query.sort = sort
      this.$route.query.limit = this.pagination.rowsPerPage
      this.$route.query.skip = (this.pagination.page - 1) * this.pagination.rowsPerPage
    },
    doSearch () {
      this.pagination.page = 1
      this.fetchData()
    },
    filter (val, search) {
      return true
      // this.search = search
      // this.fetchData()
    },
    refresh () {
      Object.assign(this.$data, getDefaultData())
      this.fetchGrid().then(() => {})
      this.fetchData()
    },
    fetch () {
      if (this.columns.length <= 0) {
        // fetch grid params from server: e.g. /crud/users/grid
        this.fetchGrid()
      } else {
        // or define grid params manually
        this.fetchData()
      }
    },
    getColumnData (row, field) {
      // process fields like `type.name`
      let [l1, l2] = field.value.split('.')
      let value = row[l1]
      let tag = null
      if (l2) {
        value = row[l1] ? row[l1][l2] : null
      }
      if (field.type === 'image') {
        tag = 'img'
      }
      if (tag) {
        const baseUrl = 'http://localhost:1337/';
        try {
          value = `<${tag} src="${baseUrl + value[0]}" class="crud-grid-thumb" controls />`
        } catch (error) {
          value = `<${tag} src="${baseUrl + value}" class="crud-grid-thumb" controls />`
        }
      }

      if (l1 === 'rank') {
        value = this.items.findIndex(i => i.id === row.id) + 1
      }
      if (l1 === 'status') {
        value = value ? 'active' : 'inactive';
      }
      return value
    },
    fetchGrid () {
      this.columns = [
        {text: '#', type: 'text', value: 'rank'},
        {text: 'Name', type: 'text', value: 'name', left: true, align: 'left'},
        {text: 'Address', type: 'text', value: 'address'},
        {text: 'Subscribed', type: 'text', value: 'subscribed'}
      ];
      if (this.options && this.options.sort) {
        let sortData = this.options.sort.split('-')
        let desc = sortData.length > 1
        let sortField = sortData.pop()
        this.pagination.sort = sortField
        this.pagination.descending = desc
      }
    },
    fetchData () {
      this.preFetch()
      Object.assign(this.$route.query, {mailListId: this.mailListId})
      this.$http.get(`${this.resource}`, {params: this.$route.query}).then(({ data }) => {
        this.pagination.totalItems = data.total_count;
        this.items = data.items;
      })
    },
    remove (item) {
      this.$http.delete(`${this.resource}/${item.id}`).then(({data}) => {
        const itemIndex = this.items.findIndex(i => i.id === item.id)
        this.items.splice(itemIndex, 1);
        this.dialog = false;
      })
    },
    next () {
      // console.log('next')
      this.pagination.page++
    }
  },
  computed: {
    resource () {
      return this.modelCode
    },
    totalPages () {
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    },
    mailListId () {
      return this.$route.params.mailListId
    },
    modelUpload () {
      return {
        url: global.config.ajaxUploadUrl,
        mailListId: this.$route.params.mailListId
      }
    }
  },

  mounted () {
    this.fetchData();
  },

  created () {
    this.$store.commit('setPageTitle', global.helper.i.titleize(global.helper.i.pluralize(this.resource)))
    this.fetchGrid();
  }
}
</script>
