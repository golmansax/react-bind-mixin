'use strict';

require('node-jsx').install({ extension: '.jsx' });
require('./mock_dom');

var chai = require('chai');
chai.use(require('dirty-chai'));
var expect = chai.expect;
var BindMixin = require('../lib/bind_mixin');
var sinon = require('sinon');
chai.use(require('sinon-chai'));

var React = require('react');
var TestUtils = require('react/addons').addons.TestUtils;
var Component = require('./mock_component');
var Store = require('./mock_store');

describe('bind_mixin', function () {
  var component;

  beforeEach(function () {
    component = React.createElement(Component);
  });

  it('sets initial state', function () {
    var instance = TestUtils.renderIntoDocument(component);
    expect(instance.getDOMNode().innerHTML).to.equal('initial');
  });

  it('updates state when store changes', function () {
    var instance = TestUtils.renderIntoDocument(component);
    Store.setValue('changed');
    expect(instance.getDOMNode().innerHTML).to.equal('changed');
  });

  it('removes listener when component is unmounted', function () {
    var div = document.createElement('div');
    var instance = React.render(component, div);

    sinon.spy(instance, 'getStateFromStore');
    Store.setValue('changed');
    expect(instance.getStateFromStore).to.have.been.called();
    instance.getStateFromStore.reset();

    React.unmountComponentAtNode(div);
    Store.setValue('changed again');
    expect(instance.getStateFromStore).not.to.have.been.called();
  });
});
