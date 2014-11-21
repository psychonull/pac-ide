
var Control = require('./Control'),

  // Control Types
  TextCtrl = require('./TextCtrl'),
  NumberCtrl = require('./NumberCtrl'),
  CheckCtrl = require('./CheckCtrl'),
  PointCtrl = require('./PointCtrl'),
  EnumCtrl = require('./EnumCtrl'),

  // List Control Types
  TextCtrlList = require('./TextCtrlList'),
  NumberCtrlList = require('./NumberCtrlList'),
  CheckCtrlList = require('./CheckCtrlList'),
  PointCtrlList = require('./PointCtrlList');

var Form = Backbone.Marionette.CollectionView.extend({

  //--------------------------------------
  //+ PUBLIC PROPERTIES / CONSTANTS
  //--------------------------------------

  className: 'form-horizontal',
  tagName: 'form',

  childView: Control,

  //--------------------------------------
  //+ INHERITED / OVERRIDES
  //--------------------------------------

  buildChildView: function(child, ChildViewClass, childViewOptions){
    var options = _.extend({ model: child }, childViewOptions);
    return this.createChildView(child, options);
  },

  //--------------------------------------
  //+ PUBLIC METHODS / GETTERS / SETTERS
  //--------------------------------------

  getValue: function(){
    var obj = {};

    this.children.each(function(view){
      var val = view.getValue();
      obj[val.name] = val.value;
    });

    return obj;
  },

  //--------------------------------------
  //+ EVENT HANDLERS
  //--------------------------------------

  //--------------------------------------
  //+ PRIVATE AND PROTECTED METHODS
  //--------------------------------------

  createChildView: function(child, viewOptions){
    var ChildViewClass,
      type = child.get('type'),
      options = child.get('options'),
      addOptions = false;

    if (child.has('enum')){
      ChildViewClass = EnumCtrl;
      if (options){
        addOptions = true;
      }
    }
    else if (Array.isArray(type)){

      ChildViewClass = this.getListViewType(type[0]);

      var list = new Backbone.Collection();
      var valuesArr = child.get('value');

      _.each(valuesArr, function(value){
        list.add({ value: value });
      });

      viewOptions.collection = list;
    }
    else {
      ChildViewClass = this.getItemViewType(type);
    }

    var view = new ChildViewClass(viewOptions);

    if (addOptions){
      this.addOptions(view, child);
    }

    return view;
  },

  getItemViewType: function(type){
    switch(type){
      case String: return TextCtrl;
      case Number: return NumberCtrl;
      case Boolean: return CheckCtrl;
      case pac.Point: return PointCtrl;
    }
  },

  getListViewType: function(type){
    switch(type){
      case String: return TextCtrlList;
      case Number: return NumberCtrlList;
      case Boolean: return CheckCtrlList;
      case pac.Point: return PointCtrlList;
    }
  },

  // must do this way because of circular require()
  addOptions: function(view, child){
    var value = child.get('value'),
      options = child.get('options');

    view.setOptionsForm(Form.create(options, value.options));
  }

}, {

  create: function(definition, values){
    values = values || {};
    var list = new Backbone.Collection();

    _.each(definition, function(def, key){

      var ctrl = {
        type: def,
        name: key,
        value: values[key]
      };

      if (ctrl.type.hasOwnProperty('enum')){
        ctrl.enum = ctrl.type.enum;
        ctrl.default = def.default;
        ctrl.options = ctrl.type.options;

        delete ctrl.type;
      }

      if (typeof ctrl.type === 'object' && !Array.isArray(ctrl.type)){

        if (!values[key]){
          ctrl.value = def.default;
        }

        ctrl.type = def.type;
        ctrl.default = def.default;
      }

      list.add(ctrl);

    });

    return new Form({
      collection: list
    });
  }

});

module.exports = Form;
