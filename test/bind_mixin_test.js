'use strict';

require('node-jsx').install({ extension: '.jsx' });
require('./mock_dom');

var chai = require('chai');
chai.use(require('dirty-chai'));
var expect = chai.expect;
var sinon = require('sinon');
chai.use(require('sinon-chai'));

var React = require('react');
var TestUtils = require('react/addons').addons.TestUtils;
var Component = require('./mock_component');
var StoreOne = require('./mock_store_one');
var StoreTwo = require('./mock_store_two');
var BindMixin = require('../lib/bind_mixin');

describe('bind_mixin', function () {
  var component;

  beforeEach(function () {
    component = React.createElement(Component, { number: 8 });
  });

  afterEach(function () {
    StoreOne.reset();
    StoreTwo.reset();
  });

  it('sets initial state', function () {
    var instance = TestUtils.renderIntoDocument(component);
    expect(instance.getDOMNode().textContent).to.equal('8: first,second');
  });

  it('updates state when store changes', function () {
    var instance = TestUtils.renderIntoDocument(component);
    StoreOne.setValue('changed');
    expect(instance.getDOMNode().textContent).to.equal('8: changed,second');
  });

  it('only calls the bound function when the store changes', function () {
    var instance = TestUtils.renderIntoDocument(component);
    sinon.spy(instance, 'getStateFromStoreTwo');
    StoreOne.setValue('changed');
    expect(instance.getStateFromStoreTwo).not.to.have.been.called();
  });

  it('removes listener when component is unmounted', function () {
    var div = document.createElement('div');
    var instance = React.render(component, div);

    sinon.spy(instance, 'getStateFromStoreOne');
    StoreOne.setValue('changed');
    expect(instance.getStateFromStoreOne).to.have.been.called();
    instance.getStateFromStoreOne.reset();

    React.unmountComponentAtNode(div);
    StoreOne.setValue('changed again');
    expect(instance.getStateFromStoreOne).not.to.have.been.called();
  });

  it('can unmount independently of other components', function () {
    var divOne = document.createElement('div');
    React.render(component, divOne);

    var divTwo = document.createElement('div');
    React.render(component, divTwo);
    React.unmountComponentAtNode(divTwo);

    React.unmountComponentAtNode(divOne);
  });

  it('updates state when props change', function () {
    var instance = TestUtils.renderIntoDocument(component);
    sinon.spy(instance, 'getStateFromStoreOne');
    instance.setProps({ number: 88 });
    expect(instance.getStateFromStoreOne).to.have.been.called();
    expect(instance.getDOMNode().textContent).to.equal('88: first,second');
  });

  it('throw an error if bound to the same function', function () {
    var MyComponent = React.createClass({
      mixins: [
        BindMixin(StoreOne, 'getStateFromStore'),
        BindMixin(StoreTwo, 'getStateFromStore')
      ],

      getStateFromStore: function (props) {
        return {};
      },

      render: function () {
        return null;
      }
    });
    var myComponent = React.createElement(MyComponent, { number: 8 });

    expect(function () {
      TestUtils.renderIntoDocument(myComponent);
    }).to.throw('Cannot bind to this.getStateFromStore');
  });
});
