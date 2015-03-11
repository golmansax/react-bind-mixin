/* istanbul ignore next */
(function (root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['object-hash'], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory(require('object-hash'));
  } else {
    // Browser globals
    root.BindMixin = factory(root.hash);
  }
}(this, function (hash) {
  'use strict';

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

  return BindMixin;
}));
