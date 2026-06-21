const getSharedDependencies = ({eager = true}) => {
  const {dependencies} = require('./package.json');

  const shared = Object.entries(dependencies)
    .filter(
      ([dep]) =>
        dep !== '@module-federation/enhanced' &&
        // Shared explicitly as a subpath singleton (super-app-showcase-sdk/lib/counterStore),
        // not as a whole-package share — its file: version isn't a valid shared range.
        dep !== 'super-app-showcase-sdk',
    )
    .map(([dep, version]) => {
      return [dep, {singleton: true, eager, version, requiredVersion: version}];
    });
  return Object.fromEntries(shared);
};

module.exports = getSharedDependencies;
