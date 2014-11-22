
var fs = require('fs-extra');

var chai = require('chai');
var expect = chai.expect;

var builder = require('../../src/node/builder.js');
var testPath = './test/node/testPath';
var structure = require('../../src/node/templates/structure.json');
var tmplsPath = './src/node/templates';

describe('Builder', function(){

  before(function(done){

    // remove if the test dir exists
    fs.remove(testPath, function(err){

      // create a test directory
      fs.mkdir(testPath, function(err){
        expect(err).to.be.null;
        done();
      });
    });
  });

  after(function(done){

    // remove the test directory
    fs.remove(testPath, function(err){
      expect(err).to.be.null;
      done();
    });

  });

  describe('#initGame', function(){

    it('Must initialize a Game Directory', function(){

      var game = {
        name: 'Awesome Game',
        package: 'awesomeness'
      };

      builder.initGame(game, testPath, function(err){
        expect(err).to.be.undefined;

        structure.dirs.forEach(function(dir){
          var exist = false;

          if (dir.indexOf('{{game.package}}')){
            exist = fs.existsSync(testPath + '/' +
              dir.replace('{{game.package}}', game.package));
          }
          else {
            exist = fs.existsSync(testPath + '/' + dir);
          }

          expect(exist).to.be.true;
        });

        structure.files.forEach(function(file){
          var exist = fs.existsSync(testPath + '/' + file);
          expect(exist).to.be.true;
        });

        var gamejson = fs.readJsonSync(testPath + "/game.json");
        expect(gamejson.settings.name).to.be.equal(game.name);
        expect(gamejson.settings.package).to.be.equal(game.package);

      });

    });
  });


});
