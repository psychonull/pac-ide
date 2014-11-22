
var template = require('./templates/layout.hbs'),
  Scenes = require('./Scenes');

module.exports = Backbone.Marionette.LayoutView.extend({

  //--------------------------------------
  //+ PUBLIC PROPERTIES / CONSTANTS
  //--------------------------------------

  className: 'row clearfix',
  template: template,

  regions: {
    //header: '.header',
    scenesCtn: '.scenes-ctn'
  },

  //--------------------------------------
  //+ INHERITED / OVERRIDES
  //--------------------------------------

  onRender: function(){
/*
    this.header.show(new Header({
      model: ide.app.game
    }));
*/
    this.scenesCtn.show(new Scenes({
      model: this.model,
      collection: this.model.get('scenes')
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