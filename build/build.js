const fs = require('fs');
const rollup = require('rollup');
const buble = require('rollup-plugin-buble');
const sass = require('rollup-plugin-sass');
const string = require('rollup-plugin-string');
const json = require('rollup-plugin-json');
const ko = require('rollup-plugin-ko-component');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

function getRollupIncludeList() {
    const rootPathList = [
        './src/component/demo1/',
        './src/component/demo2/',
        './src/component/demo3/'
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
            sass(),
            string({ include: ['**/*.tpl'] }),
            json(),
            nodeResolve({ jsnext: true, main: true }),
            commonjs(),
            ko({ include: getRollupIncludeList() }),
            buble()
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
