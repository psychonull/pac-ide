
var template = require('./templates/create.hbs'),
  Form = require('../controls/Form'),
  SceneTypes = require('../../models/SceneTypes'),
  Scene = require('../../models/Scene');

var sceneDef = require('../../define/scene');

module.exports = Backbone.Marionette.LayoutView.extend({

  //--------------------------------------
  //+ PUBLIC PROPERTIES / CONSTANTS
  //--------------------------------------

  template: template,

  regions: {
    'types': '#types',
    'options': '#options'
  },

  events: {
    'click #save': 'saveChanges',
    'change #types select': 'createOptions'
  },

  //--------------------------------------
  //+ INHERITED / OVERRIDES
  //--------------------------------------

  onRender: function(){
    this.sceneTypes = new SceneTypes();
    this.sceneTypes.load();

    this.types.show(Form.create({
      scene: { enum: this.sceneTypes.getEnum() }
    }));

    this.createOptions();
  },

  createOptions: function(){
    var components = this.model.get('components'),
      gameSize = components.get('renderer').options.size;

    var selected = $('#types select', this.$el).val();
    var opts = this.sceneTypes.findWhere({ type: selected }).toJSON();

    opts.size.default = gameSize;
    delete opts.type;

    this.options.show(Form.create(opts));
  },

  //--------------------------------------
  //+ PUBLIC METHODS / GETTERS / SETTERS
  //--------------------------------------

  //--------------------------------------
  //+ EVENT HANDLERS
  //--------------------------------------

  saveChanges: function(){
    var newScene = this.form.currentView.getValue();

    //TODO: check if the scene name exists

    this.model.get('scenes').add(new Scene(newScene));
    this.destroy();
  }

  //--------------------------------------
  //+ PRIVATE AND PROTECTED METHODS
  //--------------------------------------

});