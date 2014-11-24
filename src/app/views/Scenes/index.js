
var template = require('./templates/layout.hbs'),
  Scenes = require('./Scenes'),
  SceneList = require('./SceneList'),
  SceneTypes = require('../../models/SceneTypes');

module.exports = Backbone.Marionette.LayoutView.extend({

  //--------------------------------------
  //+ PUBLIC PROPERTIES / CONSTANTS
  //--------------------------------------

  className: 'row clearfix',
  template: template,

  regions: {
    scenesCtn: '.scenes-ctn',
    content: '.content'
  },

  //--------------------------------------
  //+ INHERITED / OVERRIDES
  //--------------------------------------

  onRender: function(){
    var components = this.model.get('components'),
      gameSize = components.get('renderer').options.size,
      scenes = this.model.get('scenes');

    this.scenesCtn.show(new Scenes({
      model: this.model,
      collection: scenes
    }));

    var sceneTypes = new SceneTypes();
    sceneTypes.load();

    this.content.show(new SceneList({
      model: this.model,
      collection: scenes,
      gameSize: gameSize,
      sceneTypes: sceneTypes
    }));
  },

  //--------------------------------------
  //+ PUBLIC METHODS / GETTERS / SETTERS
  //--------------------------------------

  //--------------------------------------
  //+ EVENT HANDLERS
  //--------------------------------------

  //--------------------------------------
  //+ PRIVATE AND PROTECTED METHODS
  //--------------------------------------

});