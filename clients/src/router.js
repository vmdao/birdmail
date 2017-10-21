import Vue from 'vue'
import Router from 'vue-router'

function route (path, file, name, modelCode, children) {
  return {
    exact: true,
    path,
    name,
    children,
    component: require(`./pages/${file}.vue`),
    props: { modelCode: modelCode }
  }
}

Vue.use(Router)

const router = new Router({
  base: __dirname,
  mode: 'hash',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    route('/login', 'Login', 'login', 'login'),
    // path, file(*.vue), name, children
    route('/', 'UserLayout', null, '', [
      route('/', 'Home', 'home', 'home')
    ]),
    route('/', 'SupplierLayout', null, '', [
      route('/messages/stored', 'MessageList', 'messageList', 'messages'),
      route('/messages/compose', 'MessageCompose', 'messageCompose', 'messages'),
      route('/messages/edit', 'MessageEdit', 'messageEdit', 'messages'),

      route('/templates', 'TemplateList', 'templateList', 'templates'),
      route('/templates/create', 'TemplateCreate', 'templateCreate', 'templates'),
      route('/templates/:id/edit', 'TemplateEdit', 'templateEdit', 'templates'),

      route('/maillists', 'MailList', 'mailList', 'maillists'),
      route('/maillists/:id/edit', 'MailListEdit', 'mailListEdit', 'maillists'),
      route('/maillists/create', 'MailListCreate', 'mailListCreate', 'maillists'),

      route('/maillists/:mailListId/members', 'MailListMember', 'mailListMember', 'maillistmembers'),
      route('/maillists/:mailListId/members/:id/edit', 'MailListMemberEdit', 'mailListMemberEdit', 'maillistmembers'),
      route('/maillists/:mailListId/members/create', 'MailListMemberCreate', 'mailListMemberCreate', 'maillistmembers'),

      route('/campaigns', 'CampaignList', 'campaignList', 'campaigns'),
      route('/campaigns/:id/edit', 'CampaignEdit', 'campaignEdit', 'campaigns'),
      route('/campaigns/create', 'CampaignCreate', 'campaignCreate', 'campaigns'),

      route('/accounts', 'Account'),
      route('/settings', 'Settings')
    ])

    // Global redirect for 404
    // { path: '*', redirect: '/error', query: {code: 404, message: 'Page Not Found.'} }
  ]
})

router.beforeEach((to, from, next) => {
  global.store.dispatch('checkPageTitle', to.path)
  /* eslint-disable no-undef */
  if (typeof ga !== 'undefined') {
    ga('set', 'page', to.path)
    ga('send', 'pageview')
  }
  next()
})

export default router
