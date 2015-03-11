'use strict';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _value = 'initial';
var CHANGE_EVENT = 'change';

var Store = assign({}, EventEmitter.prototype, {
  getValue: function () {
    return _value;
  },

  setValue: function (value) {
    _value = value;
    this._emitChange();
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  _emitChange: function () {
    this.emit(CHANGE_EVENT);
  }
});

module.exports = Store;
