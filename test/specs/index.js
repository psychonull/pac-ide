var chai = require('chai');
var expect = chai.expect;

window.pac = require('../../../pac/src/');
require('../../src/shim.js');

describe('PAC IDE', function(){

  require('./Controls');

});
