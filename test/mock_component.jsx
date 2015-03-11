'use strict';

var React = require('react');
var Store = require('./mock_store');
var BindMixin = require('../lib/bind_mixin');

var Component = React.createClass({
  mixins: [BindMixin(Store, 'getStateFromStore')],

  getStateFromStore: function () {
    return { value: Store.getValue() };
  },

  render: function () {
    return <div>{this.state.value}</div>
  }
});

module.exports = Component;