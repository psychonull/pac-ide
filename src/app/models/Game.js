
var Scenes = require('./Scenes');

var Game = module.exports = Backbone.Model.extend({

  defaults: {
    settings: null,
    components: null,
    scenes: null,
    events: null
  },

  parse: function(response, options){

    return {
      settings: new Backbone.Model(response.settings),
      components: new Backbone.Model(response.components),
      scenes: new Scenes(response.scenes)
    };

  },

  save: function(done, replace){
    //ide.node.game.save();

    var path = ide.app.getStorage('gamepath').path;

    ide.node.builder.saveGameData(this.toJSON(), path, replace, function(err){
      if (err){
        window.alert('Error on saving game.');
      }

      done && done(err);
    });

  },

}, {

  create: function(path, game, done){
    ide.node.builder.create(game, path, function(err, ideGame){
      if (!err)  {
        ide.app.setStorage('gamepath', { path: path });
        ide.node.game = ideGame;
      }

      done && done(err);
    });
  },

  open: function(done){
    var path = ide.app.getStorage('gamepath').path;

    ide.node.builder.open(path, function(err, ideGame){

      if (err){
        ide.app.clearStorage('gamepath');
        return done && done(err);
      }

      ide.node.game = ideGame;

      var game;
      try {
        game = new Game(ide.node.game, { parse: true });
      }
      catch (e){
        return done && done(e);
      }

      done && done(null, game);
    });
  }

});

