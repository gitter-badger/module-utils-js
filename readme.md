# utils-js
*Alpha version - compiler works, utils are unfinished.*

Storage for custom javascript utility functions (utils).
Project contains compiler which generates following output:

```javascript
var U = {
    name: 'DefaultModule',
    version: '1.0.0',
    utilsVersion: '1.0.0',
    yourUtilityFunction1: // (function|object|date)
    // More utilities...
}
```

## Recommendations
Keep utils structure flat. Compiler allows to add utils under nested objects
but toplevel object will be compiled always as `oneliner` which makes finding utils harder.
So avoid making objects to wrap your utils.

## Benefits
- Great for developing standalone module or library with no need to start always from scratch.
- Simply copy&paste utils to or between modules.
- Track `module version` and `utils version` separately.
- Contains some usefull utilities out of a box.
- Easy to accommodate, just remove files from utils and create your custom utils.
- Brutal fast compilation.

## Drawbacks
- Required compile step.
- You must keep utils structure flat.

## Compile command
ENV variables:
- `MODULE` - **PascalCase** name of your module.
To compile utilities run:
```
    MODULE="ContentEditor" node compile
```
