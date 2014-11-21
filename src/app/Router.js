/*
 * Router
 */

var
  // Views
    Scenes = require('./views/Scenes');

  // Models

module.exports = Backbone.Marionette.AppRouter.extend({

  routes : {
    '' : 'index',
    'index': 'index'
  },

  index: function(){
    ide.app.content.show(new Scenes({
      model: ide.app.game
    }));
  },

});