'use strict';

var hash = require('object-hash');

var BindMixin = function (Store, getStateAttr) {
  return {
    getInitialState: function () {
      return this[getStateAttr]();
    },

    _updateStateFromStore: function (getStateAttr) {
      this.setState(this[getStateAttr]());
    },

    componentDidMount: function () {
      this._changeListeners = this._changeListeners || {};
      var storeHash = hash.MD5(Store);

      var changeListener = this._updateStateFromStore.bind(this, getStateAttr);
      this._changeListeners[storeHash] = changeListener;

      Store.addChangeListener(this._changeListeners[storeHash]);
    },

    componentWillUnmount: function () {
      var storeHash = hash.MD5(Store);

      Store.removeChangeListener(this._changeListeners[storeHash]);
      this._changeListeners[storeHash] = null;
    },

    componentWillReceiveProps: function () {
      this._updateStateFromStore.bind(this, getStateAttr);
    }
  };
};

module.exports = BindMixin;
