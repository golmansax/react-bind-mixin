'use strict';

var React = require('react');
var Store = require('./store_mock');
var BindMixin = require('../lib/bind_mixin');

var Component = React.createClass({
  mixin: [BindMixin(Store, 'getStateFromStore')],

  getStateFromStore: function () {
    return { value: Store.getValue() };
  },

  render: function () {
    return <div>{this.state.value}</div>
  }
});

module.exports = Component;
