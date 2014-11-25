
module.exports = function(){

  window.ide = window.ide || {};

  ide.settings = require('./settings');

  if (ide.settings.browser){
    window.ide.node = require('./nodemock');
  }

  require('./app')();

  ide.app.start();
};
