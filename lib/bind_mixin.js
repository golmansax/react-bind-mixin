/* istanbul ignore next */
(function (root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['node-uuid'], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory(require('node-uuid'));
  } else {
    // Browser globals
    root.React.BindMixin = factory(root.uuid);
  }
}(this, function (uuid) {
  'use strict';

  var BindMixin = function (Store, getStateAttr) {
    var id = uuid.v4();

    return {
      getInitialState: function () {
        return this[getStateAttr]();
      },

      componentDidMount: function () {
        this._changeListeners = this._changeListeners || {};

        this._changeListeners[id] = function () {
          this.setState(this[getStateAttr]());
        }.bind(this);

        Store.addChangeListener(this._changeListeners[id]);
      },

      componentWillUnmount: function () {
        Store.removeChangeListener(this._changeListeners[id]);
        this._changeListeners[id] = null;
      },

      componentWillReceiveProps: function () {
        this._updateStateFromStore.bind(this, getStateAttr);
      }
    };
  };

  return BindMixin;
}));
