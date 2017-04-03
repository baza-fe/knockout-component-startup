const fs = require('fs');
const path = require('path');

const name = process.argv[process.argv.length - 1];
const dir = process.argv[process.argv.length - 2];

if (name && dir && process.argv.length >= 4) {
    scaffold(dir, name);
} else {
    console.error('$node build/yo.js demo3 "template-name-in-double-quote"');
}

function scaffold(dir, name) {
    const content = render(name);

    try {
        fs.mkdirSync(`./src/component/${dir}/`);
    } catch (e) {}

    fs.mkdirSync(`./src/component/${dir}/${name}`);
    fs.writeFileSync(`./src/component/${dir}/${name}/${name}.js`, content.js);
    fs.writeFileSync(`./src/component/${dir}/${name}/${name}.scss`, content.scss);
    fs.writeFileSync(`./src/component/${dir}/${name}/${name}.tpl`, content.tpl);
}

function renderJs(name) {
    return [
        `import style from './${name}.scss';`,
        `import template from './${name}.tpl';`,
        '',
        `export default {`,
        '    props: {',
        '',
        '    },',
        '',
        '    methods: {',
        '        created() {',
        '        },',
        '',
        '        ready() {',
        '        }',
        '    },',
        '',
        '    style,',
        '    template',
        '}'
    ].join('\n');
};

function renderStyle(name) {
    return [
        `$name: '${name}';`,
        '',
        '.#{$name} {',
        '    position: relative;',
        '}',
        '',
        '// scaffloding',
        '// =====',
        '',
        '.#{$name} {',
        '',
        '}',
    ].join('\n');
}

function renderTpl(name) {
    return [
        `<div class="${name}">`,
        '</div>'
    ].join('\n');
}

function render(name) {
    return {
        js: renderJs(name),
        scss: renderStyle(name),
        tpl: renderTpl(name)
    };
}
