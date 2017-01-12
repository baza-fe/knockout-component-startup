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
            knockout.lifecycle \
            knockout.register \
            knockout.slot \ --save
```

## Scaffolding

```
+ build/
+ dest
- src/
    + component/
    + js/
    + scss/
index.html
```

## Demos

### Markdown Editor

Install Packages:

```bash
npm install marked --save
```
