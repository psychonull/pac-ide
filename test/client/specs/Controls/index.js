var chai = require('chai');
var expect = chai.expect;

var Form = require('../../../../src/app/views/controls/Form');

var TextCtrl = require('../../../../src/app/views/controls/TextCtrl');
var CheckCtrl = require('../../../../src/app/views/controls/CheckCtrl');
var NumberCtrl = require('../../../../src/app/views/controls/NumberCtrl');
var PointCtrl = require('../../../../src/app/views/controls/PointCtrl');
var EnumCtrl = require('../../../../src/app/views/controls/EnumCtrl');
var SizeCtrl = require('../../../../src/app/views/controls/SizeCtrl');
var ColorCtrl = require('../../../../src/app/views/controls/ColorCtrl');
var TextureCtrl = require('../../../../src/app/views/controls/TextureCtrl');

var TextCtrlList = require('../../../../src/app/views/controls/TextCtrlList');
var CheckCtrlList = require('../../../../src/app/views/controls/CheckCtrlList');
var NumberCtrlList = require('../../../../src/app/views/controls/NumberCtrlList');
var PointCtrlList = require('../../../../src/app/views/controls/PointCtrlList');

describe('Controls', function(){

  describe('Form', function(){

    it ('must create a Form View with basic controls', function(){

      var def = {
        name: String,
        active: Boolean,
        fps: Number,
        apoint: pac.Point,
        asize: pac.Size,
        acolor: pac.Color,
        atexture: pac.Texture
      };

      var values = {
        name: 'MyGame',
        active: true,
        fps: 30,
        apoint: { x: 50, y: 80 },
        asize: { width: 200, height: 200 },
        acolor: '#00ff00',
        atexture: 'sometexture'
      };

      var view = Form.create(def, values);
      expect(view).to.be.an.instanceof(Form);

      view.render();
      expect(view.children.length).to.be.equal(7);

      expect(view.children.findByIndex(0)).to.be.an.instanceof(TextCtrl);
      expect(view.children.findByIndex(1)).to.be.an.instanceof(CheckCtrl);
      expect(view.children.findByIndex(2)).to.be.an.instanceof(NumberCtrl);
      expect(view.children.findByIndex(3)).to.be.an.instanceof(PointCtrl);
      expect(view.children.findByIndex(4)).to.be.an.instanceof(SizeCtrl);
      expect(view.children.findByIndex(5)).to.be.an.instanceof(ColorCtrl);
      expect(view.children.findByIndex(6)).to.be.an.instanceof(TextureCtrl);

      var viewValues = view.getValue();
      expect(viewValues.name).to.be.equal(values.name);
      expect(viewValues.active).to.be.equal(values.active);
      expect(viewValues.fps).to.be.equal(values.fps);

      expect(viewValues.apoint).to.be.an('object');
      expect(viewValues.apoint.x).to.be.equal(values.apoint.x);
      expect(viewValues.apoint.y).to.be.equal(values.apoint.y);

      expect(viewValues.asize).to.be.an('object');
      expect(viewValues.asize.width).to.be.equal(values.asize.width);
      expect(viewValues.asize.height).to.be.equal(values.asize.height);

      expect(viewValues.acolor).to.be.an('string');
      expect(viewValues.acolor).to.be.equal(values.acolor);

      expect(viewValues.atexture).to.be.an('string');
      expect(viewValues.atexture).to.be.equal(values.atexture);

    });

    it ('must create a Form View with basic controls as object with defaults',
      function(){

      var def = {
        name: { type: String, default: 'unknown' },
        active: { type: Boolean, default: true },
        fps: { type: Number, default: 0 },
        apoint: { type: pac.Point, default: new pac.Point(1, 1) },
      };

      var values = { };

      var view = Form.create(def, values);
      expect(view).to.be.an.instanceof(Form);

      view.render();
      expect(view.children.length).to.be.equal(4);

      expect(view.children.findByIndex(0)).to.be.an.instanceof(TextCtrl);
      expect(view.children.findByIndex(1)).to.be.an.instanceof(CheckCtrl);
      expect(view.children.findByIndex(2)).to.be.an.instanceof(NumberCtrl);
      expect(view.children.findByIndex(3)).to.be.an.instanceof(PointCtrl);

      var viewValues = view.getValue();
      expect(viewValues.name).to.be.equal(def.name.default);
      expect(viewValues.active).to.be.equal(def.active.default);
      expect(viewValues.fps).to.be.equal(def.fps.default);

      expect(viewValues.apoint).to.be.an.instanceof(pac.Point);
      expect(viewValues.apoint.x).to.be.equal(def.apoint.default.x);
      expect(viewValues.apoint.y).to.be.equal(def.apoint.default.y);

    });

    it ('must create a Form View with basic controls without defaults',
      function(){

      var def = {
        name: String,
        active: Boolean,
        fps: { type: Number },
        apoint: { type: pac.Point },
      };

      var values = { };

      var view = Form.create(def, values);
      expect(view).to.be.an.instanceof(Form);

      view.render();
      expect(view.children.length).to.be.equal(4);

      expect(view.children.findByIndex(0)).to.be.an.instanceof(TextCtrl);
      expect(view.children.findByIndex(1)).to.be.an.instanceof(CheckCtrl);
      expect(view.children.findByIndex(2)).to.be.an.instanceof(NumberCtrl);
      expect(view.children.findByIndex(3)).to.be.an.instanceof(PointCtrl);

      var viewValues = view.getValue();

      expect(viewValues.name).to.be.undefined;
      expect(viewValues.active).to.be.false;
      expect(viewValues.fps).to.be.undefined;
      expect(viewValues.apoint).to.be.undefined;

    });

    it ('must create a Form View with basic controls as List', function(){

      var def = {
        name: [ String ],
        active: [ Boolean ],
        fps: [ Number ],
        points: [ pac.Point ]
      };

      var values = {
        name: [ 'Name 1', 'Name 2' ],
        active: [ true, false, true ],
        fps: [ 30, 20, 50 ],
        points: [ new pac.Point(10, 20), new pac.Point(50, 10) ]
      };

      var view = Form.create(def, values);
      expect(view).to.be.an.instanceof(Form);

      view.render();
      expect(view.children.length).to.be.equal(4);

      var viewList = view.children.findByIndex(0);
      expect(viewList).to.be.an.instanceof(TextCtrlList);
      expect(viewList.children.length).to.be.equal(values.name.length);
      expect(viewList.children.findByIndex(0)).to.be.an.instanceof(TextCtrl);

      viewList = view.children.findByIndex(1);
      expect(viewList).to.be.an.instanceof(CheckCtrlList);
      expect(viewList.children.length).to.be.equal(values.active.length);
      expect(viewList.children.findByIndex(0)).to.be.an.instanceof(CheckCtrl);

      viewList = view.children.findByIndex(2);
      expect(viewList).to.be.an.instanceof(NumberCtrlList);
      expect(viewList.children.length).to.be.equal(values.fps.length);
      expect(viewList.children.findByIndex(0)).to.be.an.instanceof(NumberCtrl);

      viewList = view.children.findByIndex(3);
      expect(viewList).to.be.an.instanceof(PointCtrlList);
      expect(viewList.children.length).to.be.equal(values.points.length);
      expect(viewList.children.findByIndex(0)).to.be.an.instanceof(PointCtrl);

      var viewValues = view.getValue();

      _.each(values, function(valueArr, key){

        _.each(valueArr, function(val, i){

          if (val instanceof pac.Point){
            expect(viewValues[key][i].x).to.be.equal(val.x);
            expect(viewValues[key][i].y).to.be.equal(val.y);
          }
          else {
            expect(viewValues[key][i]).to.be.equal(val);
          }
        });
      });

    });

    it ('must create a Form View with basic controls as List with defaults',
      function(){

      var def = {
        name: { type: [String], default: ['unknown1', 'unknown2'] },
        active: { type: [Boolean], default: [ false, true] },
        fps: { type: [Number], default: [0,1] },
        points: { type: [pac.Point], default: [new pac.Point(1, 1)] },
      };

      var values = { };
      var view = Form.create(def, values);
      expect(view).to.be.an.instanceof(Form);

      view.render();
      expect(view.children.length).to.be.equal(4);

      var viewList = view.children.findByIndex(0);
      expect(viewList).to.be.an.instanceof(TextCtrlList);
      expect(viewList.children.length).to.be.equal(def.name.default.length);
      expect(viewList.children.findByIndex(0)).to.be.an.instanceof(TextCtrl);

      viewList = view.children.findByIndex(1);
      expect(viewList).to.be.an.instanceof(CheckCtrlList);
      expect(viewList.children.length).to.be.equal(def.active.default.length);
      expect(viewList.children.findByIndex(0)).to.be.an.instanceof(CheckCtrl);

      viewList = view.children.findByIndex(2);
      expect(viewList).to.be.an.instanceof(NumberCtrlList);
      expect(viewList.children.length).to.be.equal(def.fps.default.length);
      expect(viewList.children.findByIndex(0)).to.be.an.instanceof(NumberCtrl);

      viewList = view.children.findByIndex(3);
      expect(viewList).to.be.an.instanceof(PointCtrlList);
      expect(viewList.children.length).to.be.equal(def.points.default.length);
      expect(viewList.children.findByIndex(0)).to.be.an.instanceof(PointCtrl);

      var viewValues = view.getValue();

      _.each(def, function(prop, key){
        var defaults = prop.defaults;

        _.each(defaults, function(val, i){

          if (defaults instanceof pac.Point){
            expect(viewValues[key][i].x).to.be.equal(defaults[i].x);
            expect(viewValues[key][i].y).to.be.equal(defaults[i].y);
          }
          else {
            expect(viewValues[key][i]).to.be.equal(defaults[i]);
          }
        });
      });

    });

    it ('must create a Form View with enums', function(){

      var def = {
        name: {
          enum: [ 'option1', 'option2', 'option3'],
          default: 'option2'
        }
      };

      var values = {
        name: 'option3'
      };

      var view_default = Form.create(def, {});
      var view_values = Form.create(def, values);

      expect(view_default).to.be.an.instanceof(Form);
      expect(view_values).to.be.an.instanceof(Form);

      view_default.render();
      view_values.render();

      expect(view_default.children.length).to.be.equal(1);
      expect(view_values.children.length).to.be.equal(1);

      expect(view_default.children.findByIndex(0))
        .to.be.an.instanceof(EnumCtrl);

      expect(view_values.children.findByIndex(0))
        .to.be.an.instanceof(EnumCtrl);

      var viewValues_d = view_default.getValue();
      var viewValues_v = view_values.getValue();

      expect(viewValues_d.name).to.be.equal(def.name.default);
      expect(viewValues_v.name).to.be.equal(values.name);

    });

    it ('must create a Form View with enums and options', function(){

      var def = {
        name: {
          enum: [ 'some1', 'some2', 'some3'],
          default: 'some2',
          options: {
            test: String,
            position: { type: pac.Point, default: new pac.Point() }
          }
        }
      };

      var values = {
        name: {
          value: 'some3',
          options: {
            test: 'Test!'
          }
        }
      };

      var view = Form.create(def, values);

      expect(view).to.be.an.instanceof(Form);
      view.render();

      expect(view.children.length).to.be.equal(1);
      var enumCtrl = view.children.findByIndex(0);
      expect(enumCtrl).to.be.an.instanceof(EnumCtrl);
      expect(enumCtrl.roptions.currentView).to.be.an.instanceof(Form);

      var viewValues = view.getValue();
      expect(viewValues.name.value).to.be.equal(values.name.value);
      expect(viewValues.name.options.test).to.be.equal(values.name.options.test);
      expect(viewValues.name.options.position).to.be.instanceof(pac.Point);

    });

  });

});
