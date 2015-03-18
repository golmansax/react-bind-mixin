'use strict';

var React = require('react');
var StoreOne = require('./mock_store_one');
var StoreTwo = require('./mock_store_two');
var BindMixin = require('../lib/bind_mixin');

var Component = React.createClass({
  mixins: [
    BindMixin(StoreOne, 'getStateFromStoreOne'),
    BindMixin(StoreTwo, 'getStateFromStoreTwo')
  ],

  propTypes: {
    number: React.PropTypes.number.isRequired
  },

  getStateFromStoreOne: function () {
    return {
      valueOne: StoreOne.getValue()
    };
  },

  getStateFromStoreTwo: function () {
    return {
      valueTwo: StoreTwo.getValue()
    };
  },

  render: function () {
    return <div>{this.state.valueOne},{this.state.valueTwo}</div>;
  }
});

module.exports = Component;
