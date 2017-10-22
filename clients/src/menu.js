export default [
  { 'header': 'Email' },
  { 'href': '/messages/compose', 'title': 'Compose Email', 'icon': 'send' },
  { 'href': '/messages/stored', 'title': 'Message Stored', 'icon': 'view_list' },
  {
    'title': 'Template Manager',
    'icon': 'domain',
    'items': [
      { 'href': '/templates', 'title': 'Template Lists', 'icon': 'view_list' },
      { 'href': '/templates/create', 'title': 'Create Template', 'icon': 'note_add' }
    ]
  },
  { divider: true },
  { 'header': 'Analytic' },
  {
    'title': 'Mail List Manager',
    'icon': 'work',
    'items': [
      { 'href': '/maillists', 'title': 'Mail Lists', 'icon': 'view_list' },
      { 'href': '/maillists/create', 'title': 'Create Mail List', 'icon': 'account_box' }
    ]
  },
  {
    'title': 'Campaign Manager',
    'icon': 'launch',
    'items': [
      { 'href': '/campaigns', 'title': 'Campaign Lists', 'icon': 'view_list' },
      { 'href': '/campaigns/create', 'title': 'Create Campaign', 'icon': 'note_add' }
    ]
  },
  { divider: true },
  { 'href': '/', 'title': 'Go Dashboard', 'icon': 'timeline' },
  { 'href': '/login', 'icon': 'lock', 'title': 'Logout' }
]
