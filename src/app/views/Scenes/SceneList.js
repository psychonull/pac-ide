
var template = require('./templates/sceneList.hbs'),
  SceneItem = require('./SceneItem'),
  Create = require('./Create'),
  SceneTypes = require('../../models/SceneTypes');

module.exports = Backbone.Marionette.CompositeView.extend({

  //--------------------------------------
  //+ PUBLIC PROPERTIES / CONSTANTS
  //--------------------------------------

  template: template,
  childView: SceneItem,
  childViewContainer: '.scene-list',

  ui:{
    'linkScene': '.new-scene'
  },

  events: {
    'click @ui.linkScene': 'showNewScene',
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
    var components = this.model.get('components'),
      gameSize = components.get('renderer').options.size;

    this.gameSize = gameSize;

    var sceneTypes = new SceneTypes();
    sceneTypes.load();

    this.sceneTypes = sceneTypes;
  },

  onRender: function(){
    if (this.sceneTypes.length === 0){
      this.ui.linkScene.text('No Scene Types found! (reload)');
    }
  },

  //--------------------------------------
  //+ PUBLIC METHODS / GETTERS / SETTERS
  //--------------------------------------

  //--------------------------------------
  //+ EVENT HANDLERS
  //--------------------------------------

  showNewScene: function(){
    if (this.sceneTypes.length > 0){
      ide.app.modals.show(new Create({
        model: this.model
      }));
    }
    else {
      window.location.reload();
    }
  }

  //--------------------------------------
  //+ PRIVATE AND PROTECTED METHODS
  //--------------------------------------

});