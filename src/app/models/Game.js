
module.exports = Backbone.Model.extend({

  defaults: {
    settings: null,
    components: null,
    events: null
  },

  parse: function(response, options){
    response.settings = new Backbone.Model(response.settings);
    response.components = new Backbone.Model(response.components);
  }

});

