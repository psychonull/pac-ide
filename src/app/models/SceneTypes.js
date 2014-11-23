
var SceneType = require('./SceneType'),
  baseOptions = require('../define/scene');

module.exports = Backbone.Collection.extend({

  model: SceneType,

  load: function(){
    //TODO: change this to get json files

    var game = ide.app.game,
      scenes = game.get('package').scenes;

    _.each(scenes, function(options, className){

      var type = new SceneType(options);
      type.set('type', className);

      this.add(type);

    }, this);
  },

  getEnum: function(){
    /*
    var game = ide.app.game,
      settings = game.get('settings'),
      pkg = settings.get('package') + '.scenes.';
    */

    return this.map(function(item){
      return /*pkg + */item.get('type');
    });
  },

});