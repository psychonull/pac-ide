/*
 * Router
 */

var
  // Views
  Main = require('./views/Main'),
  Header = require('./views/Header'),
  Scenes = require('./views/Scenes'),
  Assets = require('./views/Assets'),

  // Models
  Game = require('./models/Game');

module.exports = Backbone.Marionette.AppRouter.extend({

  routes : {
    '' : 'index',
    'index': 'index',
    'scenes': 'scenes',
    'assets': 'assets'
  },

  index: function(){
    ide.app.header.reset();
    ide.app.content.show(new Main());
  },

  fillGame: function(done){
    var app = ide.app;

    if (app.game){
      done && done();
      return;
    }

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

      done && done();
    });

  },

  scenes: function(){
    var app = ide.app;

    this.fillGame(function(){

      app.content.show(new Scenes({
        model: app.game
      }));

    });
  },

  assets: function(){
    var app = ide.app;

    this.fillGame(function(){

      app.content.show(new Assets({
        model: app.game
      }));

    });
  }

});