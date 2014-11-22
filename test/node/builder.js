
var fs = require('fs-extra');

var chai = require('chai');
var expect = chai.expect;

var builder = require('../../src/node/builder.js');
var testPath = './test/node/testPath';
var structure = require('../../src/node/templates/structure.json');
var tmplsPath = './src/node/templates';

var game = {
  name: 'Awesome Game',
  package: 'awesomeness'
};

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

    it('Must initialize a Game Directory', function(done){

      builder.initGame(game, testPath, function(err){
        expect(err).to.be.null;

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
        expect(gamejson.settings.fps).to.be.equal(60);
        expect(gamejson.package.actions).to.be.ok;

        done();
      });

    });
  });

  describe('#getGameData', function(){

    it('Must retrieve the Game JSON from a Directory', function(done){

      builder.getGameData(testPath, function(err, gameData){
        expect(err).to.be.null;

        expect(gameData.settings.name).to.be.equal(game.name);
        expect(gameData.settings.package).to.be.equal(game.package);

        done();
      });

    });
  });

  describe('#saveGameData', function(){

    it('Must update the Game JSON of a Directory preserving values',
      function(done){

      var newPackage = 'newpackage';

      var newgame = {
        settings: {
          name: 'New Awesome Name',
          package: newPackage
        },

        components: {
          renderer: {
            options: {
              backgroundColor: '#00FF00'
            }
          }
        },

        package: {
          actions: {
            "WalkTo": {
              something: 5
            }
          }
        }

      };

      builder.saveGameData(newgame, testPath, false, function(err){
        expect(err).to.be.null;

        builder.getGameData(testPath, function(err, gameData){
          expect(err).to.be.null;

          expect(gameData.settings.name).to.be.equal(newgame.settings.name);
          expect(gameData.settings.package).to.be.equal(newPackage);

          expect(gameData.components.renderer.options.backgroundColor)
            .to.be.equal(newgame.components.renderer.options.backgroundColor);

          // check new values
          expect(gameData.package.actions.WalkTo.something).to.be.equal(5);

          // check if other props are still there
          expect(gameData.settings.fps).to.be.equal(60);
          expect(gameData.package).to.have.property('prefabs');

          expect(gameData.components.renderer.options)
            .to.have.property('layers');

          // check if directory changed to new package name
          var exist = fs.existsSync(testPath + '/src/' + newPackage);
          expect(exist).to.be.true;

          // old should not exist
          exist = fs.existsSync(testPath + '/src/' + game.package);
          expect(exist).to.be.false;

          done();
        });
      });

    });

    it('Must replace the Game JSON of a Directory', function(done){

      builder.getGameData(testPath, function(err, data){

        var newPackage = 'somewpackage';
        var lastPackage = data.package;

        data.settings.package = 'somewpackage';
        delete data.components.input;

        builder.saveGameData(data, testPath, true, function(err){
          expect(err).to.be.null;

          builder.getGameData(testPath, function(err, gameData){
            expect(err).to.be.null;

            expect(gameData.settings.name).to.be.equal(data.settings.name);
            expect(gameData.settings.package).to.be.equal(newPackage);

            expect(gameData.components.renderer.options.backgroundColor)
              .to.be.equal(data.components.renderer.options.backgroundColor);

            // is deleted
            expect(gameData.components.input).to.be.undefined;

            // check if directory changed to new package name
            var exist = fs.existsSync(testPath + '/src/' + newPackage);
            expect(exist).to.be.true;

            // old should not exist
            exist = fs.existsSync(testPath + '/src/' + lastPackage);
            expect(exist).to.be.false;

            done();
          });
        });
      });
    });

  });


});
