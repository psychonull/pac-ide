
module.exports = function(){

  window.ide = window.ide || {};

  ide.settings = require('./settings');

  require('./app')();

  ide.app.start();
};
