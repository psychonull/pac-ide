window.$ = window.jQuery = require('jquery');

window.Backbone     = require('backbone');
window.Backbone.$   = window.$;
window._            = require('underscore');

window.Handlebars   = require('handlebars');

require('backbone.marionette');
require('bootstrap');

// Override toJSON to work also with nested Models
Backbone.Model.prototype.toJSON = function() {
  var json = _.clone(this.attributes);
  for(var attr in json) {
    if((json[attr] instanceof Backbone.Model) ||
      (json[attr] instanceof Backbone.Collection)) {

      json[attr] = json[attr].toJSON();
    }
  }
  return json;
};

