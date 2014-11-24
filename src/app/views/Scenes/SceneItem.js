
var template = require('./templates/sceneItem.hbs'),
  Form = require('../controls/Form');

module.exports = Backbone.Marionette.LayoutView.extend({

  //--------------------------------------
  //+ PUBLIC PROPERTIES / CONSTANTS
  //--------------------------------------

  className: 'panel panel-default',
  template: template,

  regions: {
    'body': '.panel-body'
  },

  events: {
    'click #save': 'saveChanges',
    'click #cancel': 'cancelChanges'
  },

  modelEvents: {
    'change': 'render'
  },

  //--------------------------------------
  //+ INHERITED / OVERRIDES
  //--------------------------------------

  initialize: function(options){
    this.gameSize = options && options.gameSize;
    this.sceneTypes = options && options.sceneTypes;
  },

  onRender: function(){

    if (this.sceneTypes){
      var type = this.model.get('type');
      var opts = this.sceneTypes.findWhere({ type: type }).toJSON();

      opts.size.default = this.gameSize;
      delete opts.type;

      this.body.show(Form.create(opts, this.model.toJSON().options));
    }

  },

  //--------------------------------------
  //+ PUBLIC METHODS / GETTERS / SETTERS
  //--------------------------------------

  //--------------------------------------
  //+ EVENT HANDLERS
  //--------------------------------------

  saveChanges: function(){
    var options = this.body.currentView.getValue();
    this.model.set('options', options);
  },

  cancelChanges: function(){
    this.render();
  }

  //--------------------------------------
  //+ PRIVATE AND PROTECTED METHODS
  //--------------------------------------

});