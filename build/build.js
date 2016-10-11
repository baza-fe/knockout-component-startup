const fs = require('fs');
const rollup = require('rollup');
const babelrc = require('babelrc-rollup').default;
const babel = require('rollup-plugin-babel');
const sass = require('rollup-plugin-sass');
const string = require('rollup-plugin-string');
const json = require('rollup-plugin-json');
const ko = require('rollup-plugin-ko-component');
const instruction = require('rollup-plugin-if');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

function getRollupIncludeList() {
    const rootPathList = [
        './src/component/demo1/',
        './src/component/demo2/'
    ];
    const includePathList = [];

    rootPathList.forEach(function (rootPath) {
        const pathList = fs.readdirSync(rootPath);

        pathList.forEach(function (path) {
            includePathList.push(`${rootPath}${path}/${path}.js`);
        });
    });

    return includePathList;
}

function compile(entry, dest) {
    return rollup.rollup({
        entry: entry,
        plugins: [
            instruction({ include: ['./src/js/entry/**'], vars: { DEV: true } }),
            sass(),
            string({ include: ['**/*.tpl'] }),
            json(),
            nodeResolve({ jsnext: true, main: true }),
            commonjs(),
            ko({ include: getRollupIncludeList() }),
            babel(babelrc())
        ],
        context: 'window'
    }).then(function (bundle) {
        bundle.write({
            format: 'iife',
            dest: dest
        });
    }).catch(function (err) {
        console.error(err);
    });
}

function build() {
    compile('./src/js/entry/index.js', './dest/js/index.js');
}

build();
