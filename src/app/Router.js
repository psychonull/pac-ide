/*
 * Router
 */

var
  // Views
  Main = require('./views/Main'),
  Header = require('./views/Header'),
  Scenes = require('./views/Scenes'),
  CreateScene = require('./views/Scenes/Create'),

  // Models
  Game = require('./models/Game');

module.exports = Backbone.Marionette.AppRouter.extend({

  routes : {
    '' : 'index',
    'index': 'index',
    'game': 'game'
  },

  index: function(){
    ide.app.header.reset();
    ide.app.content.show(new Main());
  },

  game: function(){
    var app = ide.app;

    Game.get(function(err, game){

      if (err){
        app.router.navigate('/', { trigger: true, replace: true });
        Backbone.history.loadUrl(Backbone.history.fragment);
        document.location.reload(true);
        return;
      }

      app.game = game;

      app.header.show(new Header({
        model: app.game
      }));

      app.content.show(new Scenes({
        model: app.game
      }));

    });
  }

});