/*
 * Router
 */

var
  // Views
    Main = require('./views/Main');

  // Models

module.exports = Backbone.Marionette.AppRouter.extend({

  routes : {
    '' : 'index',
    'index': 'index'
  },

  index: function(){
    ide.app.main.show(new Main());
  },

});