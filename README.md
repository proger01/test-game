# ProTrak HTML5 Client

## Prerequisites

- [x] [Node.js](https://nodejs.org/en/) 10
- [x] [Yarn](https://yarnpkg.com/ru/docs/install) 1.15

## Installation

```
$ yarn
```

## Running

```
$ yarn start
```

## Build

```
$ yarn build
```

## Format code (using [Prettier](https://github.com/prettier/prettier))

```
$ yarn prettier
```

## Run TSLint

```
$ yarn lint
```

## Project structure

```
ProTrak.HTML5.React
|-- src                     source files of project
|   |-- app
|   |   |-- components      React components and containers
|   |   |   |-- App         Main application component
|   |   |   |-- basic       Base components with ProTrak styling
|   |   |   |-- dialogs     Dialog components
|   |   |   |-- pages       React components which used as pages in router
|   |   |   `-- ...         Other components of application
|   |   |-- ducks           Redux actions, constants, middleware and reducers
|   |   |-- models          interfaces and types for data structures
|   |   |-- utils           any kind of helpers and utilities
|   |   |-- const.ts        global constants
|   |   `-- store.ts        Redux store
|   |-- assets
|   |   |-- favicon.ico     favicon image for browser
|   |   `-- index.html      HTML file which is used to render a project
|   `-- main.tsx            starting point of a project
|-- tests                   configuration and mocks for tests
|-- types                   declarations of modules with missing types
|-- azure-piplines.yml      config of DevOps piplines
|-- package.json            main config of project
|-- tsconfig.json           config for TypeScript
|-- tslint.json             config for TSLint
|-- webpack.config.js       config for Webpack to build the project
`-- yarn.lock               auto-generated file to store exact package versions

```

## Main concepts

We are using:

- [TypeScript](https://www.typescriptlang.org/docs/home.html)
- [React](https://reactjs.org/docs/getting-started.html)
- [React-Router](https://reacttraining.com/react-router/web/guides/quick-start)
- [Redux](https://redux.js.org/introduction/getting-started)

React components is used only for rendering HTML and dispatching actions.

Actions and Reducers is placed in **ducks** folder as described [here](https://github.com/erikras/ducks-modular-redux).

We do not work with HTML DOM directly, only by using JSX.

We do not make API call inside components. Instead of this, we make an API call inside middleware.

We do not use local state inside components as long as we can.
Mostly preferred to use Stateless React components – pure functions.
We use global state inside Redux Store to save and use application data.

We create Redux Container and connect it to Component if we need to use data from store or dispatch some actions.
Container for Component must have a name which is the same as component name with added suffix "Connected", for ex. App and AppConnected.
