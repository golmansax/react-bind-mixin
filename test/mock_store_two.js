'use strict';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var INITIAL_VALUE = 'second';
var CHANGE_EVENT = 'change';
var _value;

var StoreTwo = assign({}, EventEmitter.prototype, {
  getValue: function () {
    return _value;
  },

  reset: function () {
    _value = INITIAL_VALUE;
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
StoreTwo.reset();

module.exports = StoreTwo;
