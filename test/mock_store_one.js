'use strict';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var INITIAL_VALUE = 'first';
var CHANGE_EVENT = 'change';
var _value;

var StoreOne = assign({}, EventEmitter.prototype, {
  getValue: function (number) {
    return number + ': ' + _value;
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
StoreOne.reset();

module.exports = StoreOne;
