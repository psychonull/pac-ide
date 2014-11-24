
var template = require('./templates/layout.hbs'),
  Scenes = require('./Scenes'),
  SceneList = require('./SceneList');

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
    var scenes = this.model.get('scenes');

    this.scenesCtn.show(new Scenes({
      model: this.model,
      collection: scenes
    }));

    this.content.show(new SceneList({
      model: this.model,
      collection: scenes
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