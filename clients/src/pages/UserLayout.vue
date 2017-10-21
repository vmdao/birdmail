<template>
<v-app light="light">
  <v-toolbar class="red pa-6" fixed="fixed" dark="dark">
    <div class="image-brand"><img src="/static/images/selii_logo_2.png"/></div>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat="flat" :to="{name: 'messageCompose'}"> Compose </v-btn>    
      <v-btn flat="flat" :to="{name: 'mailList'}"> Mail List</v-btn>
      <v-btn flat="flat" :to="{name: 'campaignList'}"> Campaign </v-btn>
    </v-toolbar-items>
      <v-menu flat="flat" offset-y="offset-y">
        <v-btn icon="icon" dark="dark" slot="activator">
          <v-icon dark="dark">language</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="lang in locales" :key="lang" @mouseover.native="changeLocale(lang)">
            <v-list-tile-title>{{lang}}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn flat="flat" icon="icon" dark="dark" label="Logout">
          <v-icon dark="dark">fa-sign-out</v-icon>
      </v-btn>
  </v-toolbar>
  <main>
    <v-container class="pa-6">
      <v-alert v-bind="message" v-model="message.body" dismissible="dismissible">{{message.body}}</v-alert>
      <div class="py-2">
        <v-slide-y-transition mode="out-in">
          <router-view></router-view>
        </v-slide-y-transition>
      </div>
    </v-container>
  </main>
</v-app>
</template>

<script>

import { mapState } from 'vuex'

export default {
  data () {
    return {
      url: '/',
      dark: false,
      theme: 'primary',
      mini: false,
      drawer: true,
      locales: ['en-US', 'vi-VN']
    }
  },
  computed: {
    ...mapState(['message', 'menu', 'pageTitle'])
  },
  methods: {
    changeLocale (to) {
      global.helper.ls.set('locale', to)
      this.$i18n.locale = to
    },
    fetchMenu () {
      // fetch menu from server
      // this.$http.get('menu').then(({data}) => this.$store.commit('setMenu', data))
    }
  },

  created () {
    this.fetchMenu()
  }
}
</script>

