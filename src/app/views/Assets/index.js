
var template = require('./templates/layout.hbs'),
  Textures = require('./Textures');

module.exports = Backbone.Marionette.LayoutView.extend({

  //--------------------------------------
  //+ PUBLIC PROPERTIES / CONSTANTS
  //--------------------------------------

  className: 'row clearfix assets-ctn',
  template: template,

  regions: {
    content: '.content'
  },

  //--------------------------------------
  //+ INHERITED / OVERRIDES
  //--------------------------------------

  onRender: function(){
    var assets = this.model.get('assets');

    this.content.show(new Textures({
      model: this.model,
      collection: new Backbone.Collection() //assets.get('textures')
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