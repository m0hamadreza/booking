import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as Repack from '@callstack/repack';
import getSharedDependencies from './sharedDeps.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Rspack configuration enhanced with Re.Pack defaults for React Native.
 *
 * Learn about Rspack configuration: https://rspack.dev/config/
 * Learn about Re.Pack configuration: https://re-pack.dev/docs/guides/configuration
 */

const STANDALONE = Boolean(process.env.STANDALONE);

export default Repack.defineRspackConfig({
  context: __dirname,
  entry: './index.js',
  resolve: {
    ...Repack.getResolveOptions({enablePackageExports: true}),
  },
  output: {
    uniqueName: 'sas-booking',
  },
  module: {
    rules: [
      {
        test: /\.[cm]?[jt]sx?$/,
        type: 'javascript/auto',
        use: {
          loader: '@callstack/repack/babel-swc-loader',
          parallel: true,
          options: {},
        },
      },
      ...Repack.getAssetTransformRules(),
    ],
  },
  plugins: [
    new Repack.RepackPlugin(),
    new Repack.plugins.ModuleFederationPluginV2({
      name: 'booking',
      filename: 'booking.container.js.bundle',
      dts: false,
      exposes: {
        './App': './App',
      },
      shared: {
        ...getSharedDependencies({ eager: STANDALONE }),
        // Single shared counter store instance across mini-apps.
        'super-app-showcase-sdk/lib/counterStore': {
          singleton: true,
          eager: STANDALONE,
          requiredVersion: false,
        },
      },
    }),
  ],
});
