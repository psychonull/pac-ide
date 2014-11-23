
var template = require('./templates/layout.hbs'),
  Scenes = require('./Scenes'),
  SceneTypes = require('../../models/SceneTypes'),
  SceneTypesList = require('./SceneTypes');

module.exports = Backbone.Marionette.LayoutView.extend({

  //--------------------------------------
  //+ PUBLIC PROPERTIES / CONSTANTS
  //--------------------------------------

  className: 'row clearfix',
  template: template,

  regions: {
    scenesCtn: '.scenes-ctn',
    sceneTypes: '.scenes-types-ctn div'
  },

  //--------------------------------------
  //+ INHERITED / OVERRIDES
  //--------------------------------------

  onRender: function(){

    this.scenesCtn.show(new Scenes({
      model: this.model,
      collection: this.model.get('scenes')
    }));

    var types = new SceneTypes();

    this.sceneTypes.show(new SceneTypesList({
      model: this.model,
      collection: types
    }));

    types.load();
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