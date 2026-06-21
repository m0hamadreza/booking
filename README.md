# Booking

`booking` is a [React Native](https://reactnative.dev) **mini-app** within the Super App Showcase. It is built as a [Module Federation](https://module-federation.io) remote using [Re.Pack](https://re-pack.dev) (Rspack), and is loaded at runtime by the host shell — or run on its own in standalone mode for local development.

## What it exposes

The Rspack config registers a federated container named `booking` and exposes a single module:

| Key      | Module     | Description                            |
| -------- | ---------- | -------------------------------------- |
| `./App`  | `./App`    | Root component rendered by the host    |

- **Container name:** `booking`
- **Remote entry:** `booking.container.js.bundle`
- **Output uniqueName:** `sas-booking`

It also shares a single [`super-app-showcase-sdk/lib/counterStore`](../superApp/packages/sdk) singleton with the rest of the mini-apps, so the "Shared counter" stays in sync across the super app.

## Tech stack

- React Native `0.84.1` / React `19.2.3`
- [`@callstack/repack`](https://re-pack.dev) `^5.2.5` with `@rspack/core` for bundling
- [`@module-federation/enhanced`](https://module-federation.io) (`ModuleFederationPluginV2`)
- [`zustand`](https://github.com/pmndrs/zustand) for state (shared counter store)
- [`@gorhom/bottom-sheet`](https://github.com/gorhom/react-native-bottom-sheet) + `react-native-reanimated` / `react-native-gesture-handler`

## Getting Started

> **Note**: Complete the [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment) before proceeding. Requires Node `>= 22.11.0`.

Install dependencies (this repo uses `pnpm`):

```sh
pnpm install
```

### Step 1: Start the dev server

`booking` runs its Re.Pack dev server on **port 9000** so it doesn't collide with the host (8081):

```sh
pnpm start
```

To run the mini-app **standalone** (eager-loaded shared deps, default port 8081):

```sh
pnpm start:standalone
```

The `STANDALONE` env flag flips shared dependencies to `eager` so the bundle can boot without a host providing them.

### Step 2: Build and run on a device

With the dev server running, in another terminal:

```sh
# Android
pnpm android   # react-native run-android --no-packager --active-arch-only

# iOS — install pods first (first clone / after native dep changes)
bundle install
bundle exec pod install
pnpm ios
```

> When adding a native module, see the project memory note on rebuilding generated Android dirs with `--active-arch-only`.

## Project layout

| Path                | Purpose                                                        |
| ------------------- | ------------------------------------------------------------- |
| `App.tsx`           | Root component — booking screen, shared counter, bottom sheet |
| `index.js`          | `AppRegistry` entry point (standalone runs)                   |
| `rspack.config.mjs` | Re.Pack + Module Federation V2 configuration                  |
| `sharedDeps.js`     | Derives the shared dependency map from `package.json`         |
| `android/` `ios/`   | Native projects                                               |

## Scripts

| Script                   | Description                                          |
| ------------------------ | ---------------------------------------------------- |
| `pnpm start`             | Start the dev server on port 9000                    |
| `pnpm start:standalone`  | Start standalone (eager shared deps) on port 8081    |
| `pnpm android`           | Build & run on Android                               |
| `pnpm ios`               | Build & run on iOS                                   |
| `pnpm lint`              | Run ESLint                                           |
| `pnpm test`              | Run Jest tests                                       |

## Learn more

- [Re.Pack documentation](https://re-pack.dev/docs)
- [Module Federation](https://module-federation.io)
- [React Native](https://reactnative.dev)
</content>
