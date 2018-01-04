# module-utils-js

[![Join the chat at https://gitter.im/module-utils-js/Lobby](https://badges.gitter.im/module-utils-js/Lobby.svg)](https://gitter.im/module-utils-js/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
*Alpha version - compiler works, utils are unfinished.*

Storage for custom javascript utility functions (utils).
Project contains compiler which generates following output:

```javascript
var U = {
    name: 'DefaultModule',
    version: '1.0.0',
    utilsVersion: '1.2.0',
    yourUtilityFunction1: // (function|object|date)
    // More utilities...
}
```

Compiler writes output to: `utils.min.js`.

## Recommendations
Keep utils structure flat. Compiler allows to add utils under nested objects
but toplevel object will be compiled always as `oneliner` which makes finding utils harder.
For this reason try to avoid creating objects to wrap your utils. On the other hand object support is useful to hold internal state of group of utilities i.e. dom event handler functions are stored this way, see `utils/dom.js`.

## Benefits
- Great for developing standalone module or library with no need to start always from scratch.
- Simply copy&paste utils to or between modules.
- Track `module version` and `utils version` separately.
- Contains some useful utilities out of a box.
- Easy to accommodate, just remove files from utils and create your custom utils.
- Brutal fast compilation.

## Drawbacks
- Required compile step.
- You must keep utils structure flat.

## Compile command
```
    node compile
```
ENV variables:
- `MODULE` - **PascalCase** `U.name` of module.
- `KEYS` - list of comma separated keys, useful when generating light version of utils.

```
    MODULE=ContentEditor KEYS=moduleName,objectKeys,find,extend,ajax node compile
```
