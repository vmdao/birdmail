module.exports.routes = {

  //NORMAL ROUTES

  'GET /': {
    controller: 'AuthController',
    action: 'pageLogin'
  },

  'GET /login': {
    controller: 'AuthController',
    action: 'pageLogin'
  },

  'GET /go': {
    controller: 'admin/AdminController',
    action: 'pageIndex'
  },

  'POST /login': {
    controller: 'AuthController',
    action: 'login'
  },

  'GET /logout': {
    controller: 'AuthController',
    action: 'logout'
  },

  'GET /api/v1/shots/bum': {
    controller: 'ShotController',
    action: 'bum'
  },

  'POST /api/v1/upload': {
    controller: 'UploadController',
    action: 'upload'
  }
};