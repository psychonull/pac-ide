
var template = require('./templates/sceneList.hbs'),
  SceneItem = require('./SceneItem'),
  Create = require('./Create');

module.exports = Backbone.Marionette.CompositeView.extend({

  //--------------------------------------
  //+ PUBLIC PROPERTIES / CONSTANTS
  //--------------------------------------

  template: template,
  childView: SceneItem,
  childViewContainer: '.scene-list',

  events: {
    'click .new-scene': 'showNewScene'
  },

  childViewOptions: function(model, index) {
    return {
      gameSize: this.gameSize,
      sceneTypes: this.sceneTypes
    };
  },

  //--------------------------------------
  //+ INHERITED / OVERRIDES
  //--------------------------------------

  initialize: function(options){
    this.gameSize = options && options.gameSize;
    this.sceneTypes = options && options.sceneTypes;
  },

  //--------------------------------------
  //+ PUBLIC METHODS / GETTERS / SETTERS
  //--------------------------------------

  //--------------------------------------
  //+ EVENT HANDLERS
  //--------------------------------------

  showNewScene: function(){
    ide.app.modals.show(new Create({
      model: this.model
    }));
  }

  //--------------------------------------
  //+ PRIVATE AND PROTECTED METHODS
  //--------------------------------------

});