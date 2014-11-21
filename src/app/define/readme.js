
// What a definition can have and will be converted into a Control

module.exports = {

  // a property of a type
  // if not set on the value, wont use it (undefined)
  prop1: String,
  prop2: Number,
  prop3: Boolean,
  prop4: pac.Point,

  // a property of a type with default
  prop5: { type: String, default: 'unknown' },
  prop6: { type: pac.Point, default: new pac.Point(10, 10) },

  // a property of a Custom Type with options
  prop7: {
    type: 'pac.GameObject',
    options: {
      other1: String,
      other2: Number
    }
  },

  // a property as an enum with options (will be a SELECT)
  prop8: {
    enum: [ 'pac.NativeRenderer', 'pac.PixiRenderer' ],
    options: {
      other1: String,
      other2: Number
    }
  },

  // a property as an enum with NO options (will be a SELECT)
  prop9: {
    enum: [ 'pac.NativeRenderer', 'pac.PixiRenderer' ],
    options: false // or not specified
  },

  // a property of a Type as a list
  // (custom list of controls with add, delete and sorting)
  prop10: [ String ],

  // a property of a Type as a list with options
  prop11: [{
    type: 'pac.WalkToAction',
    options: {
      velocity: Number
    }
  }],


  // to remember
  // if (typeof obj.type === 'string')
  // is a custom type and has namespace

};