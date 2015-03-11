'use strict';

var chai = require('chai');
chai.use(require('dirty-chai'));
var expect = chai.expect;
var BindMixin = require('../lib/bind_mixin');
var sinon = require('sinon');
chai.use(require('sinon-chai'));
var TestUtils = require('react').addons.TestUtils;
var Component = require('./component_mock');
var Store = require('./store_mock');

describe('bind_mixin', function () {
  var component;

  beforeEach(function () {
    component = TestUtils.renderIntoDocument(<Component />);
  });

  it('sets initial state', function () {
    expect(component.getDOMNode().text).to.equal('initial');
  });

  it('updates state when store changes', function () {
    Store.setValue('changed');
    expect(component.getDOMNode().text).to.equal('changed');
  });

  it('removes listener when component is unmounted', function () {
    // Unmount component
    // Expect that Store is not listening to anything
  });
});
