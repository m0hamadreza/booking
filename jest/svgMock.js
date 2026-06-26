/**
 * Jest mock for `.svg` imports. In the app the bundler turns these into
 * react-native-svg components; in tests we render a lightweight stand-in.
 */
const React = require('react');

function SvgMock(props) {
  return React.createElement('Svg', props, props.children);
}

module.exports = SvgMock;
module.exports.default = SvgMock;
module.exports.ReactComponent = SvgMock;
