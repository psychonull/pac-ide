
var Scene = require('./Scene'),
  Create = require('./Create');

module.exports = Backbone.Marionette.CollectionView.extend({

  //--------------------------------------
  //+ PUBLIC PROPERTIES / CONSTANTS
  //--------------------------------------

  tagName: 'ul',
  childView: Scene,

  //--------------------------------------
  //+ INHERITED / OVERRIDES
  //--------------------------------------

  onRender: function(){
    

    var addButton = $('<li>').addClass('create').text('+');
    this.$el.append(addButton);
    addButton.on('click', this.showCreateModal.bind(this));
  },

  //--------------------------------------
  //+ PUBLIC METHODS / GETTERS / SETTERS
  //--------------------------------------

  //--------------------------------------
  //+ EVENT HANDLERS
  //--------------------------------------

  showCreateModal: function(){
    ide.app.modals.show(new Create({
      model: this.model
    }));
  }

  //--------------------------------------
  //+ PRIVATE AND PROTECTED METHODS
  //--------------------------------------

});