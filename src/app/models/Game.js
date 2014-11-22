
var Scenes = require('./Scenes');

var Game = module.exports = Backbone.Model.extend({

  defaults: {
    settings: null,
    components: null,
    scenes: null,
    events: null
  },

  parse: function(response, options){
    response.settings = new Backbone.Model(response.settings);
    response.components = new Backbone.Model(response.components);
    response.scenes = new Scenes(response.scenes);

    return response;
  },

  save: function(done, replace){
    var path = ide.app.getStorage('gamepath').path;

    idenode.builder.saveGameData(this.toJSON(), path, replace, function(err){
      if (err){
        window.alert('Error on saving game.');
      }

      done && done(err);
    });
  },

}, {

  create: function(path, game, done){
    idenode.builder.initGame(game, path, function(err){
      if (!err)  {
        ide.app.setStorage('gamepath', { path: path });
      }

      done && done(err);
    });
  },

  get: function(done){
    var path = ide.app.getStorage('gamepath').path;

    idenode.builder.getGameData(path, function(err, data){

      if (err){
        ide.app.clearStorage('gamepath');
        return done && done(err);
      }

      done && done(null, new Game(data, { parse: true }));
    });
  }

});

