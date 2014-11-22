
var fs = require('fs-extra');
var path = require('path');

var hogan = require('hogan.js');
var structure = require('./templates/structure');

module.exports = {

  initGame: function(game, gamePath, done){

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

    done();
  }

};
