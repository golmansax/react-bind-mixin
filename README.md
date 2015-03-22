# React Bind Mixin

[![Build Status](https://travis-ci.org/golmansax/react-bind-mixin.svg?branch=master)](https://travis-ci.org/golmansax/react-bind-mixin)
[![Code Climate](https://codeclimate.com/github/golmansax/react-bind-mixin/badges/gpa.svg)](https://codeclimate.com/github/golmansax/react-bind-mixin)
[![Test Coverage](https://codeclimate.com/github/golmansax/react-bind-mixin/badges/coverage.svg)](https://codeclimate.com/github/golmansax/react-bind-mixin)

A React mixin used to simplify the binding between components and data stores.
Can be plugged into virtually any Flux implementation!

## Sample Usage
Given a Store with the following API:
```js
var MyStore = {
  addChangeListener: function (callback) {
    // bind callback to changes to Store
  },

  removeChangeListener: function (callback) {
    // remove callback binding
  }
};
```
We can bind a React component to the Store in a simple way:
```jsx
var BindMixin = require('react-bind-mixin');
var Component = React.createClass({
  mixins: [BindMixin(MyStore, 'getStateFromStore')],

  // this.props passed in for 'props'
  // except for when called from componentWillReceiveProps (newProps passed in)
  getStateFromStore: function (props) {
    // This part can be custom to the store implementation
    return {
      value: MyStore.getValue(props.id)
    };
  },

  render: function () {
    return <div>{this.state.value}</div>;
  }
});
```

Now the state of our component will be:
* initialized with the initial value of the Store
* updated when the Store is changed

## Makes testing easy!

With this straight-forward implementation, it becomes trivial to test the
component.  Simply mock out the associated store functions.  Below is an
example using the Mocha/sinon test framework.

```jsx
sinon.stub(MyStore, 'getValue');
MyStore.getValue.returns('Hello');
var component = React.addons.TestUtils.renderIntoDocument(<Component />);
expect(component.text).to.equal('Hello');

MyStore.getValue.returns('Goodbye');
expect(component.text).to.equal('Goodbye');
```

## Installation
```bash
# Node
npm install react-bind-mixin --save
```
