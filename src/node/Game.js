
// NodeJS Game Class

var Game = module.exports = function(path, game){

  this.path = path;

  this.settings = game.settings;
  this.components = game.components;

  this.assets = game.assets;
  this.scenes = game.scenes;
  this.prefabs = game.prefabs;

  this.package = {
    scenes: {},
    prefabs: {},
    actions: {},
    animations: {},
    evens: {}
  };

};

Game.prototype.build = function() {
  //TODO: calls the registration
  //require(path + '/config')(this);
};

Game.prototype.register = function(package, name, options) {
  //TODO: register a type for a package (scenes, prefabs, etc)
};

Game.prototype.getTypes = function(package) {
  //TODO: returns a list of types with it's options
  // package is scenes, prefabs, etc
};

Game.prototype.save = function() {
  //TODO: saves the current game into a json
};
