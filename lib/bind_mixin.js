/* istanbul ignore next */
(function (root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals
    root.React.BindMixin = factory();
  }
}(this, function () {
  'use strict';

  var BindMixin = function (Store, getStateAttr) {
    return {
      getInitialState: function () {
        if (typeof this[getStateAttr] !== 'function') {
          throw 'Cannot bind to this.' + getStateAttr + ' because it is not ' +
            'a function';
        }

        return this[getStateAttr](this.props);
      },

      componentDidMount: function () {
        this._changeListeners = this._changeListeners || {};

        if (this._changeListeners[getStateAttr]) {
          throw 'Cannot bind to this.' + getStateAttr + ' because something ' +
            'is already bound to it';
        }

        this._changeListeners[getStateAttr] = function () {
          this.setState(this[getStateAttr](this.props));
        }.bind(this);

        Store.addChangeListener(this._changeListeners[getStateAttr]);
      },

      componentWillUnmount: function () {
        Store.removeChangeListener(this._changeListeners[getStateAttr]);
        this._changeListeners[getStateAttr] = null;
      },

      componentWillReceiveProps: function (newProps) {
        this.setState(this[getStateAttr](newProps));
      }
    };
  };

  return BindMixin;
}));
