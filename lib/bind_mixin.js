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
    var changeListener;

    return {
      getInitialState: function () {
        return this[getStateAttr](this.props);
      },

      componentDidMount: function () {
        changeListener = function () {
          this.setState(this[getStateAttr](this.props));
        }.bind(this);

        Store.addChangeListener(changeListener);
      },

      componentWillUnmount: function () {
        Store.removeChangeListener(changeListener);
        changeListener = null;
      },

      componentWillReceiveProps: function (newProps) {
        this.setState(this[getStateAttr](newProps));
      }
    };
  };

  return BindMixin;
}));
