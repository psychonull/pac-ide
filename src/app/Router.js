/*
 * Router
 */

var
  // Views
    Scenes = require('./views/Scenes'),
    CreateScene = require('./views/Scenes/Create');

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