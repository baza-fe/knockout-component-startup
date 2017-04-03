Knockout Component Demos
=====

## Startup

Install from NPM:

```bash
# rollup stuff
npm install rollup \
            rollup-plugin-buble \
            rollup-plugin-json \
            rollup-plugin-sass \
            rollup-plugin-string \
            rollup-plugin-if \
            rollup-plugin-ko-component \
            rollup-plugin-node-resolve \
            rollup-plugin-commonjs -D

# librarys
npm install knockout jquery --save

# plugins
npm install knockout.filter \
            knockout.register  \ --save
```

## Scaffolding

```
+ build/
+ dest/
- src/
    + component/
    + js/
    + scss/
index.html
```

## Demos

Remove comment brace in `index.html` to checkout demos.
