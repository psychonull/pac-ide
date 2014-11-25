
var fs = require('fs-extra');
var path = require('path');

var hogan = require('hogan.js');
var _ = require('lodash');
var structure = require('./templates/structure');

var Game = require('./Game');

module.exports = {

  create: function(game, gamePath, done){

    structure.dirs.forEach(function(dir){
      var template = hogan.compile(gamePath + '/' + dir);
      fs.mkdirpSync(template.render({ game: game }));
    });

    structure.files.forEach(function(file){
      var fileName = path.basename(file);
      var pathTo = gamePath + '/' + file;
      var pathFrom = 'src/node/templates/' + fileName;

      if (fileName === 'game.json'){
        var from = fs.readFileSync(pathFrom, 'utf8');
        from = hogan.compile(from).render({ game: game });

        fs.outputFileSync(pathTo, from);
      }
      else {
        fs.copySync(pathFrom, pathTo);
      }
    });

    var game = new Game(gamePath, game);
    done && done(null, game);
  },

  open: function(gamePath, done){
    var gameData;

    try {
      gameData = fs.readJsonSync(gamePath + '/game.json');
    } catch(e){
      return done && done(e);
    }

    var game = new Game(gamePath, gameData);
    done && done(null, game);
  },

  saveGameData: function(data, gamePath, replace, done){

    try {
      var prev = fs.readJsonSync(gamePath + '/game.json');
      //TODO: history?

      var pkgPrev = prev.settings.package;
      var pkgNew = data.settings.package;

      if (replace){
        fs.writeJsonSync(gamePath + '/game.json', data);
      }
      else {
        _.merge(prev, data);
        fs.writeJsonSync(gamePath + '/game.json', prev);
      }

      if (pkgPrev !== pkgNew){
        var basePath = gamePath + '/src/';
        fs.move(basePath + pkgPrev, basePath + pkgNew, done);
        return;
      }

    } catch(e){
      return done && done(e);
    }

    done && done(null);
  }

};
