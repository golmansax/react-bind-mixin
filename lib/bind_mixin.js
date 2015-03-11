'use strict';

var hash = require('object-hash');

var BindMixin = function (Store, getStateAttr) {
  var storeHash = hash.MD5(Store);

  return {
    getInitialState: function () {
      return this[getStateAttr]();
    },

    _updateStateFromStore: function (getStateAttr) {
      this.setState(this[getStateAttr]());
    },

    componentDidMount: function () {
      this._changeListeners = this._changeListeners || {};

      var changeListener = this._updateStateFromStore.bind(this, getStateAttr);
      this._changeListeners[Store] = changeListener;

      Store.addChangeListener(this._changeListeners[storeHash]);
    },

    componentWillUnmount: function () {
      Store.removeChangeListener(this._changeListeners[storeHash]);
      this._changeListeners[storeHash] = null;
    },

    componentWillReceiveProps: function () {
      this._updateStateFromStore.bind(this, getStateAttr);
    }
  };
};

module.exports = BindMixin;
