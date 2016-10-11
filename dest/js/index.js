(function () {
'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();















var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var marked = createCommonjsModule(function (module, exports) {
  /**
   * marked - a markdown parser
   * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
   * https://github.com/chjj/marked
   */

  (function () {

    /**
     * Block-Level Grammar
     */

    var block = {
      newline: /^\n+/,
      code: /^( {4}[^\n]+\n*)+/,
      fences: noop,
      hr: /^( *[-*_]){3,} *(?:\n+|$)/,
      heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
      nptable: noop,
      lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
      blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
      list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
      html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
      def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
      table: noop,
      paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
      text: /^[^\n]+/
    };

    block.bullet = /(?:[*+-]|\d+\.)/;
    block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
    block.item = replace(block.item, 'gm')(/bull/g, block.bullet)();

    block.list = replace(block.list)(/bull/g, block.bullet)('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')('def', '\\n+(?=' + block.def.source + ')')();

    block.blockquote = replace(block.blockquote)('def', block.def)();

    block._tag = '(?!(?:' + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code' + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo' + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';

    block.html = replace(block.html)('comment', /<!--[\s\S]*?-->/)('closed', /<(tag)[\s\S]+?<\/\1>/)('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g, block._tag)();

    block.paragraph = replace(block.paragraph)('hr', block.hr)('heading', block.heading)('lheading', block.lheading)('blockquote', block.blockquote)('tag', '<' + block._tag)('def', block.def)();

    /**
     * Normal Block Grammar
     */

    block.normal = merge({}, block);

    /**
     * GFM Block Grammar
     */

    block.gfm = merge({}, block.normal, {
      fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
      paragraph: /^/,
      heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
    });

    block.gfm.paragraph = replace(block.paragraph)('(?!', '(?!' + block.gfm.fences.source.replace('\\1', '\\2') + '|' + block.list.source.replace('\\1', '\\3') + '|')();

    /**
     * GFM + Tables Block Grammar
     */

    block.tables = merge({}, block.gfm, {
      nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
      table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
    });

    /**
     * Block Lexer
     */

    function Lexer(options) {
      this.tokens = [];
      this.tokens.links = {};
      this.options = options || marked.defaults;
      this.rules = block.normal;

      if (this.options.gfm) {
        if (this.options.tables) {
          this.rules = block.tables;
        } else {
          this.rules = block.gfm;
        }
      }
    }

    /**
     * Expose Block Rules
     */

    Lexer.rules = block;

    /**
     * Static Lex Method
     */

    Lexer.lex = function (src, options) {
      var lexer = new Lexer(options);
      return lexer.lex(src);
    };

    /**
     * Preprocessing
     */

    Lexer.prototype.lex = function (src) {
      src = src.replace(/\r\n|\r/g, '\n').replace(/\t/g, '    ').replace(/\u00a0/g, ' ').replace(/\u2424/g, '\n');

      return this.token(src, true);
    };

    /**
     * Lexing
     */

    Lexer.prototype.token = function (src, top, bq) {
      var src = src.replace(/^ +$/gm, ''),
          next,
          loose,
          cap,
          bull,
          b,
          item,
          space,
          i,
          l;

      while (src) {
        // newline
        if (cap = this.rules.newline.exec(src)) {
          src = src.substring(cap[0].length);
          if (cap[0].length > 1) {
            this.tokens.push({
              type: 'space'
            });
          }
        }

        // code
        if (cap = this.rules.code.exec(src)) {
          src = src.substring(cap[0].length);
          cap = cap[0].replace(/^ {4}/gm, '');
          this.tokens.push({
            type: 'code',
            text: !this.options.pedantic ? cap.replace(/\n+$/, '') : cap
          });
          continue;
        }

        // fences (gfm)
        if (cap = this.rules.fences.exec(src)) {
          src = src.substring(cap[0].length);
          this.tokens.push({
            type: 'code',
            lang: cap[2],
            text: cap[3] || ''
          });
          continue;
        }

        // heading
        if (cap = this.rules.heading.exec(src)) {
          src = src.substring(cap[0].length);
          this.tokens.push({
            type: 'heading',
            depth: cap[1].length,
            text: cap[2]
          });
          continue;
        }

        // table no leading pipe (gfm)
        if (top && (cap = this.rules.nptable.exec(src))) {
          src = src.substring(cap[0].length);

          item = {
            type: 'table',
            header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
            align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
            cells: cap[3].replace(/\n$/, '').split('\n')
          };

          for (i = 0; i < item.align.length; i++) {
            if (/^ *-+: *$/.test(item.align[i])) {
              item.align[i] = 'right';
            } else if (/^ *:-+: *$/.test(item.align[i])) {
              item.align[i] = 'center';
            } else if (/^ *:-+ *$/.test(item.align[i])) {
              item.align[i] = 'left';
            } else {
              item.align[i] = null;
            }
          }

          for (i = 0; i < item.cells.length; i++) {
            item.cells[i] = item.cells[i].split(/ *\| */);
          }

          this.tokens.push(item);

          continue;
        }

        // lheading
        if (cap = this.rules.lheading.exec(src)) {
          src = src.substring(cap[0].length);
          this.tokens.push({
            type: 'heading',
            depth: cap[2] === '=' ? 1 : 2,
            text: cap[1]
          });
          continue;
        }

        // hr
        if (cap = this.rules.hr.exec(src)) {
          src = src.substring(cap[0].length);
          this.tokens.push({
            type: 'hr'
          });
          continue;
        }

        // blockquote
        if (cap = this.rules.blockquote.exec(src)) {
          src = src.substring(cap[0].length);

          this.tokens.push({
            type: 'blockquote_start'
          });

          cap = cap[0].replace(/^ *> ?/gm, '');

          // Pass `top` to keep the current
          // "toplevel" state. This is exactly
          // how markdown.pl works.
          this.token(cap, top, true);

          this.tokens.push({
            type: 'blockquote_end'
          });

          continue;
        }

        // list
        if (cap = this.rules.list.exec(src)) {
          src = src.substring(cap[0].length);
          bull = cap[2];

          this.tokens.push({
            type: 'list_start',
            ordered: bull.length > 1
          });

          // Get each top-level item.
          cap = cap[0].match(this.rules.item);

          next = false;
          l = cap.length;
          i = 0;

          for (; i < l; i++) {
            item = cap[i];

            // Remove the list item's bullet
            // so it is seen as the next token.
            space = item.length;
            item = item.replace(/^ *([*+-]|\d+\.) +/, '');

            // Outdent whatever the
            // list item contains. Hacky.
            if (~item.indexOf('\n ')) {
              space -= item.length;
              item = !this.options.pedantic ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '') : item.replace(/^ {1,4}/gm, '');
            }

            // Determine whether the next list item belongs here.
            // Backpedal if it does not belong in this list.
            if (this.options.smartLists && i !== l - 1) {
              b = block.bullet.exec(cap[i + 1])[0];
              if (bull !== b && !(bull.length > 1 && b.length > 1)) {
                src = cap.slice(i + 1).join('\n') + src;
                i = l - 1;
              }
            }

            // Determine whether item is loose or not.
            // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
            // for discount behavior.
            loose = next || /\n\n(?!\s*$)/.test(item);
            if (i !== l - 1) {
              next = item.charAt(item.length - 1) === '\n';
              if (!loose) loose = next;
            }

            this.tokens.push({
              type: loose ? 'loose_item_start' : 'list_item_start'
            });

            // Recurse.
            this.token(item, false, bq);

            this.tokens.push({
              type: 'list_item_end'
            });
          }

          this.tokens.push({
            type: 'list_end'
          });

          continue;
        }

        // html
        if (cap = this.rules.html.exec(src)) {
          src = src.substring(cap[0].length);
          this.tokens.push({
            type: this.options.sanitize ? 'paragraph' : 'html',
            pre: !this.options.sanitizer && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
            text: cap[0]
          });
          continue;
        }

        // def
        if (!bq && top && (cap = this.rules.def.exec(src))) {
          src = src.substring(cap[0].length);
          this.tokens.links[cap[1].toLowerCase()] = {
            href: cap[2],
            title: cap[3]
          };
          continue;
        }

        // table (gfm)
        if (top && (cap = this.rules.table.exec(src))) {
          src = src.substring(cap[0].length);

          item = {
            type: 'table',
            header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
            align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
            cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
          };

          for (i = 0; i < item.align.length; i++) {
            if (/^ *-+: *$/.test(item.align[i])) {
              item.align[i] = 'right';
            } else if (/^ *:-+: *$/.test(item.align[i])) {
              item.align[i] = 'center';
            } else if (/^ *:-+ *$/.test(item.align[i])) {
              item.align[i] = 'left';
            } else {
              item.align[i] = null;
            }
          }

          for (i = 0; i < item.cells.length; i++) {
            item.cells[i] = item.cells[i].replace(/^ *\| *| *\| *$/g, '').split(/ *\| */);
          }

          this.tokens.push(item);

          continue;
        }

        // top-level paragraph
        if (top && (cap = this.rules.paragraph.exec(src))) {
          src = src.substring(cap[0].length);
          this.tokens.push({
            type: 'paragraph',
            text: cap[1].charAt(cap[1].length - 1) === '\n' ? cap[1].slice(0, -1) : cap[1]
          });
          continue;
        }

        // text
        if (cap = this.rules.text.exec(src)) {
          // Top-level should never reach here.
          src = src.substring(cap[0].length);
          this.tokens.push({
            type: 'text',
            text: cap[0]
          });
          continue;
        }

        if (src) {
          throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
        }
      }

      return this.tokens;
    };

    /**
     * Inline-Level Grammar
     */

    var inline = {
      escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
      autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
      url: noop,
      tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
      link: /^!?\[(inside)\]\(href\)/,
      reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
      nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
      strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
      em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
      code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
      br: /^ {2,}\n(?!\s*$)/,
      del: noop,
      text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
    };

    inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
    inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

    inline.link = replace(inline.link)('inside', inline._inside)('href', inline._href)();

    inline.reflink = replace(inline.reflink)('inside', inline._inside)();

    /**
     * Normal Inline Grammar
     */

    inline.normal = merge({}, inline);

    /**
     * Pedantic Inline Grammar
     */

    inline.pedantic = merge({}, inline.normal, {
      strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
      em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
    });

    /**
     * GFM Inline Grammar
     */

    inline.gfm = merge({}, inline.normal, {
      escape: replace(inline.escape)('])', '~|])')(),
      url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
      del: /^~~(?=\S)([\s\S]*?\S)~~/,
      text: replace(inline.text)(']|', '~]|')('|', '|https?://|')()
    });

    /**
     * GFM + Line Breaks Inline Grammar
     */

    inline.breaks = merge({}, inline.gfm, {
      br: replace(inline.br)('{2,}', '*')(),
      text: replace(inline.gfm.text)('{2,}', '*')()
    });

    /**
     * Inline Lexer & Compiler
     */

    function InlineLexer(links, options) {
      this.options = options || marked.defaults;
      this.links = links;
      this.rules = inline.normal;
      this.renderer = this.options.renderer || new Renderer();
      this.renderer.options = this.options;

      if (!this.links) {
        throw new Error('Tokens array requires a `links` property.');
      }

      if (this.options.gfm) {
        if (this.options.breaks) {
          this.rules = inline.breaks;
        } else {
          this.rules = inline.gfm;
        }
      } else if (this.options.pedantic) {
        this.rules = inline.pedantic;
      }
    }

    /**
     * Expose Inline Rules
     */

    InlineLexer.rules = inline;

    /**
     * Static Lexing/Compiling Method
     */

    InlineLexer.output = function (src, links, options) {
      var inline = new InlineLexer(links, options);
      return inline.output(src);
    };

    /**
     * Lexing/Compiling
     */

    InlineLexer.prototype.output = function (src) {
      var out = '',
          link,
          text,
          href,
          cap;

      while (src) {
        // escape
        if (cap = this.rules.escape.exec(src)) {
          src = src.substring(cap[0].length);
          out += cap[1];
          continue;
        }

        // autolink
        if (cap = this.rules.autolink.exec(src)) {
          src = src.substring(cap[0].length);
          if (cap[2] === '@') {
            text = cap[1].charAt(6) === ':' ? this.mangle(cap[1].substring(7)) : this.mangle(cap[1]);
            href = this.mangle('mailto:') + text;
          } else {
            text = escape(cap[1]);
            href = text;
          }
          out += this.renderer.link(href, null, text);
          continue;
        }

        // url (gfm)
        if (!this.inLink && (cap = this.rules.url.exec(src))) {
          src = src.substring(cap[0].length);
          text = escape(cap[1]);
          href = text;
          out += this.renderer.link(href, null, text);
          continue;
        }

        // tag
        if (cap = this.rules.tag.exec(src)) {
          if (!this.inLink && /^<a /i.test(cap[0])) {
            this.inLink = true;
          } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
            this.inLink = false;
          }
          src = src.substring(cap[0].length);
          out += this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape(cap[0]) : cap[0];
          continue;
        }

        // link
        if (cap = this.rules.link.exec(src)) {
          src = src.substring(cap[0].length);
          this.inLink = true;
          out += this.outputLink(cap, {
            href: cap[2],
            title: cap[3]
          });
          this.inLink = false;
          continue;
        }

        // reflink, nolink
        if ((cap = this.rules.reflink.exec(src)) || (cap = this.rules.nolink.exec(src))) {
          src = src.substring(cap[0].length);
          link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
          link = this.links[link.toLowerCase()];
          if (!link || !link.href) {
            out += cap[0].charAt(0);
            src = cap[0].substring(1) + src;
            continue;
          }
          this.inLink = true;
          out += this.outputLink(cap, link);
          this.inLink = false;
          continue;
        }

        // strong
        if (cap = this.rules.strong.exec(src)) {
          src = src.substring(cap[0].length);
          out += this.renderer.strong(this.output(cap[2] || cap[1]));
          continue;
        }

        // em
        if (cap = this.rules.em.exec(src)) {
          src = src.substring(cap[0].length);
          out += this.renderer.em(this.output(cap[2] || cap[1]));
          continue;
        }

        // code
        if (cap = this.rules.code.exec(src)) {
          src = src.substring(cap[0].length);
          out += this.renderer.codespan(escape(cap[2], true));
          continue;
        }

        // br
        if (cap = this.rules.br.exec(src)) {
          src = src.substring(cap[0].length);
          out += this.renderer.br();
          continue;
        }

        // del (gfm)
        if (cap = this.rules.del.exec(src)) {
          src = src.substring(cap[0].length);
          out += this.renderer.del(this.output(cap[1]));
          continue;
        }

        // text
        if (cap = this.rules.text.exec(src)) {
          src = src.substring(cap[0].length);
          out += this.renderer.text(escape(this.smartypants(cap[0])));
          continue;
        }

        if (src) {
          throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
        }
      }

      return out;
    };

    /**
     * Compile Link
     */

    InlineLexer.prototype.outputLink = function (cap, link) {
      var href = escape(link.href),
          title = link.title ? escape(link.title) : null;

      return cap[0].charAt(0) !== '!' ? this.renderer.link(href, title, this.output(cap[1])) : this.renderer.image(href, title, escape(cap[1]));
    };

    /**
     * Smartypants Transformations
     */

    InlineLexer.prototype.smartypants = function (text) {
      if (!this.options.smartypants) return text;
      return text
      // em-dashes
      .replace(/---/g, '\u2014')
      // en-dashes
      .replace(/--/g, '\u2013')
      // opening singles
      .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
      // closing singles & apostrophes
      .replace(/'/g, '\u2019')
      // opening doubles
      .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201C')
      // closing doubles
      .replace(/"/g, '\u201D')
      // ellipses
      .replace(/\.{3}/g, '\u2026');
    };

    /**
     * Mangle Links
     */

    InlineLexer.prototype.mangle = function (text) {
      if (!this.options.mangle) return text;
      var out = '',
          l = text.length,
          i = 0,
          ch;

      for (; i < l; i++) {
        ch = text.charCodeAt(i);
        if (Math.random() > 0.5) {
          ch = 'x' + ch.toString(16);
        }
        out += '&#' + ch + ';';
      }

      return out;
    };

    /**
     * Renderer
     */

    function Renderer(options) {
      this.options = options || {};
    }

    Renderer.prototype.code = function (code, lang, escaped) {
      if (this.options.highlight) {
        var out = this.options.highlight(code, lang);
        if (out != null && out !== code) {
          escaped = true;
          code = out;
        }
      }

      if (!lang) {
        return '<pre><code>' + (escaped ? code : escape(code, true)) + '\n</code></pre>';
      }

      return '<pre><code class="' + this.options.langPrefix + escape(lang, true) + '">' + (escaped ? code : escape(code, true)) + '\n</code></pre>\n';
    };

    Renderer.prototype.blockquote = function (quote) {
      return '<blockquote>\n' + quote + '</blockquote>\n';
    };

    Renderer.prototype.html = function (html) {
      return html;
    };

    Renderer.prototype.heading = function (text, level, raw) {
      return '<h' + level + ' id="' + this.options.headerPrefix + raw.toLowerCase().replace(/[^\w]+/g, '-') + '">' + text + '</h' + level + '>\n';
    };

    Renderer.prototype.hr = function () {
      return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
    };

    Renderer.prototype.list = function (body, ordered) {
      var type = ordered ? 'ol' : 'ul';
      return '<' + type + '>\n' + body + '</' + type + '>\n';
    };

    Renderer.prototype.listitem = function (text) {
      return '<li>' + text + '</li>\n';
    };

    Renderer.prototype.paragraph = function (text) {
      return '<p>' + text + '</p>\n';
    };

    Renderer.prototype.table = function (header, body) {
      return '<table>\n' + '<thead>\n' + header + '</thead>\n' + '<tbody>\n' + body + '</tbody>\n' + '</table>\n';
    };

    Renderer.prototype.tablerow = function (content) {
      return '<tr>\n' + content + '</tr>\n';
    };

    Renderer.prototype.tablecell = function (content, flags) {
      var type = flags.header ? 'th' : 'td';
      var tag = flags.align ? '<' + type + ' style="text-align:' + flags.align + '">' : '<' + type + '>';
      return tag + content + '</' + type + '>\n';
    };

    // span level renderer
    Renderer.prototype.strong = function (text) {
      return '<strong>' + text + '</strong>';
    };

    Renderer.prototype.em = function (text) {
      return '<em>' + text + '</em>';
    };

    Renderer.prototype.codespan = function (text) {
      return '<code>' + text + '</code>';
    };

    Renderer.prototype.br = function () {
      return this.options.xhtml ? '<br/>' : '<br>';
    };

    Renderer.prototype.del = function (text) {
      return '<del>' + text + '</del>';
    };

    Renderer.prototype.link = function (href, title, text) {
      if (this.options.sanitize) {
        try {
          var prot = decodeURIComponent(unescape(href)).replace(/[^\w:]/g, '').toLowerCase();
        } catch (e) {
          return '';
        }
        if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
          return '';
        }
      }
      var out = '<a href="' + href + '"';
      if (title) {
        out += ' title="' + title + '"';
      }
      out += '>' + text + '</a>';
      return out;
    };

    Renderer.prototype.image = function (href, title, text) {
      var out = '<img src="' + href + '" alt="' + text + '"';
      if (title) {
        out += ' title="' + title + '"';
      }
      out += this.options.xhtml ? '/>' : '>';
      return out;
    };

    Renderer.prototype.text = function (text) {
      return text;
    };

    /**
     * Parsing & Compiling
     */

    function Parser(options) {
      this.tokens = [];
      this.token = null;
      this.options = options || marked.defaults;
      this.options.renderer = this.options.renderer || new Renderer();
      this.renderer = this.options.renderer;
      this.renderer.options = this.options;
    }

    /**
     * Static Parse Method
     */

    Parser.parse = function (src, options, renderer) {
      var parser = new Parser(options, renderer);
      return parser.parse(src);
    };

    /**
     * Parse Loop
     */

    Parser.prototype.parse = function (src) {
      this.inline = new InlineLexer(src.links, this.options, this.renderer);
      this.tokens = src.reverse();

      var out = '';
      while (this.next()) {
        out += this.tok();
      }

      return out;
    };

    /**
     * Next Token
     */

    Parser.prototype.next = function () {
      return this.token = this.tokens.pop();
    };

    /**
     * Preview Next Token
     */

    Parser.prototype.peek = function () {
      return this.tokens[this.tokens.length - 1] || 0;
    };

    /**
     * Parse Text Tokens
     */

    Parser.prototype.parseText = function () {
      var body = this.token.text;

      while (this.peek().type === 'text') {
        body += '\n' + this.next().text;
      }

      return this.inline.output(body);
    };

    /**
     * Parse Current Token
     */

    Parser.prototype.tok = function () {
      switch (this.token.type) {
        case 'space':
          {
            return '';
          }
        case 'hr':
          {
            return this.renderer.hr();
          }
        case 'heading':
          {
            return this.renderer.heading(this.inline.output(this.token.text), this.token.depth, this.token.text);
          }
        case 'code':
          {
            return this.renderer.code(this.token.text, this.token.lang, this.token.escaped);
          }
        case 'table':
          {
            var header = '',
                body = '',
                i,
                row,
                cell,
                flags,
                j;

            // header
            cell = '';
            for (i = 0; i < this.token.header.length; i++) {
              flags = { header: true, align: this.token.align[i] };
              cell += this.renderer.tablecell(this.inline.output(this.token.header[i]), { header: true, align: this.token.align[i] });
            }
            header += this.renderer.tablerow(cell);

            for (i = 0; i < this.token.cells.length; i++) {
              row = this.token.cells[i];

              cell = '';
              for (j = 0; j < row.length; j++) {
                cell += this.renderer.tablecell(this.inline.output(row[j]), { header: false, align: this.token.align[j] });
              }

              body += this.renderer.tablerow(cell);
            }
            return this.renderer.table(header, body);
          }
        case 'blockquote_start':
          {
            var body = '';

            while (this.next().type !== 'blockquote_end') {
              body += this.tok();
            }

            return this.renderer.blockquote(body);
          }
        case 'list_start':
          {
            var body = '',
                ordered = this.token.ordered;

            while (this.next().type !== 'list_end') {
              body += this.tok();
            }

            return this.renderer.list(body, ordered);
          }
        case 'list_item_start':
          {
            var body = '';

            while (this.next().type !== 'list_item_end') {
              body += this.token.type === 'text' ? this.parseText() : this.tok();
            }

            return this.renderer.listitem(body);
          }
        case 'loose_item_start':
          {
            var body = '';

            while (this.next().type !== 'list_item_end') {
              body += this.tok();
            }

            return this.renderer.listitem(body);
          }
        case 'html':
          {
            var html = !this.token.pre && !this.options.pedantic ? this.inline.output(this.token.text) : this.token.text;
            return this.renderer.html(html);
          }
        case 'paragraph':
          {
            return this.renderer.paragraph(this.inline.output(this.token.text));
          }
        case 'text':
          {
            return this.renderer.paragraph(this.parseText());
          }
      }
    };

    /**
     * Helpers
     */

    function escape(html, encode) {
      return html.replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    function unescape(html) {
      // explicitly match decimal, hex, and named HTML entities 
      return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g, function (_, n) {
        n = n.toLowerCase();
        if (n === 'colon') return ':';
        if (n.charAt(0) === '#') {
          return n.charAt(1) === 'x' ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
        }
        return '';
      });
    }

    function replace(regex, opt) {
      regex = regex.source;
      opt = opt || '';
      return function self(name, val) {
        if (!name) return new RegExp(regex, opt);
        val = val.source || val;
        val = val.replace(/(^|[^\[])\^/g, '$1');
        regex = regex.replace(name, val);
        return self;
      };
    }

    function noop() {}
    noop.exec = noop;

    function merge(obj) {
      var i = 1,
          target,
          key;

      for (; i < arguments.length; i++) {
        target = arguments[i];
        for (key in target) {
          if (Object.prototype.hasOwnProperty.call(target, key)) {
            obj[key] = target[key];
          }
        }
      }

      return obj;
    }

    /**
     * Marked
     */

    function marked(src, opt, callback) {
      if (callback || typeof opt === 'function') {
        if (!callback) {
          callback = opt;
          opt = null;
        }

        opt = merge({}, marked.defaults, opt || {});

        var highlight = opt.highlight,
            tokens,
            pending,
            i = 0;

        try {
          tokens = Lexer.lex(src, opt);
        } catch (e) {
          return callback(e);
        }

        pending = tokens.length;

        var done = function done(err) {
          if (err) {
            opt.highlight = highlight;
            return callback(err);
          }

          var out;

          try {
            out = Parser.parse(tokens, opt);
          } catch (e) {
            err = e;
          }

          opt.highlight = highlight;

          return err ? callback(err) : callback(null, out);
        };

        if (!highlight || highlight.length < 3) {
          return done();
        }

        delete opt.highlight;

        if (!pending) return done();

        for (; i < tokens.length; i++) {
          (function (token) {
            if (token.type !== 'code') {
              return --pending || done();
            }
            return highlight(token.text, token.lang, function (err, code) {
              if (err) return done(err);
              if (code == null || code === token.text) {
                return --pending || done();
              }
              token.text = code;
              token.escaped = true;
              --pending || done();
            });
          })(tokens[i]);
        }

        return;
      }
      try {
        if (opt) opt = merge({}, marked.defaults, opt);
        return Parser.parse(Lexer.lex(src, opt), opt);
      } catch (e) {
        e.message += '\nPlease report this to https://github.com/chjj/marked.';
        if ((opt || marked.defaults).silent) {
          return '<p>An error occured:</p><pre>' + escape(e.message + '', true) + '</pre>';
        }
        throw e;
      }
    }

    /**
     * Options
     */

    marked.options = marked.setOptions = function (opt) {
      merge(marked.defaults, opt);
      return marked;
    };

    marked.defaults = {
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      sanitizer: null,
      mangle: true,
      smartLists: false,
      silent: false,
      highlight: null,
      langPrefix: 'lang-',
      smartypants: false,
      headerPrefix: '',
      renderer: new Renderer(),
      xhtml: false
    };

    /**
     * Expose
     */

    marked.Parser = Parser;
    marked.parser = Parser.parse;

    marked.Renderer = Renderer;

    marked.Lexer = Lexer;
    marked.lexer = Lexer.lex;

    marked.InlineLexer = InlineLexer;
    marked.inlineLexer = InlineLexer.output;

    marked.parse = marked;

    if (typeof module !== 'undefined' && (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
      module.exports = marked;
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return marked;
      });
    } else {
      this.marked = marked;
    }
  }).call(function () {
    return this || (typeof window !== 'undefined' ? window : commonjsGlobal);
  }());
});

var style = "markdown-editor,\n.markdown-editor {\n  width: 100%;\n  height: 100%;\n  display: block;\n  position: relative; }\n\n.markdown-editor-textarea, .markdown-editor-content {\n  width: 50%;\n  height: 100%;\n  float: left; }\n\n.markdown-editor-textarea {\n  border: none;\n  resize: none;\n  overflow: auto;\n  font-size: 24px;\n  box-sizing: border-box; }\n\n.markdown-editor-textarea:focus, .markdown-editor-textarea:active {\n  outline: none; }\n";

var template = "<div class=\"markdown-editor\">\n    <textarea class=\"markdown-editor-textarea\" placeholder=\"Please enter markdown here.\" data-bind=\"textInput: markdown\"></textarea>\n    <div class=\"markdown-editor-content\" data-bind=\"html: html\"></div>\n</div>";

var __ko_component_label__ = 'markdown-editor';
var __ko_component_style__ = '';
var __ko_component_template__ = '';
var __ko_component__ = {
    constructor: function constructor(opts) {
        this.html = ko.observable(opts.html);
        this.markdown = ko.observable(opts.markdown);

        this._onMarkdownChanged = this._onMarkdownChanged.bind(this);
    },


    defaults: {
        markdown: '',
        html: ''
    },

    methods: {
        ready: function ready() {
            this.markdown.subscribe(this._onMarkdownChanged);
        },
        _convertMarkdownToHTML: function _convertMarkdownToHTML(markdown) {
            return markdown ? marked(markdown) : '';
        },
        _onMarkdownChanged: function _onMarkdownChanged(markdown) {
            this.html(this._convertMarkdownToHTML(markdown));
        }
    },

    style: style,
    template: template
};
__ko_component__.name = __ko_component__.name || __ko_component_label__;
__ko_component__.style = __ko_component__.style || __ko_component_style__;
__ko_component__.template = __ko_component__.template || __ko_component_template__;
ko.components.register(__ko_component__);

var style$1 = ".comment-item {\n  position: relative; }\n\n.comment-item-title {\n  margin: 0; }\n";

var template$1 = "<div class=\"comment-item\">\n    <h2 class=\"comment-item-title\" data-bind=\"text: title\"></h2>\n    <p class=\"comment-item-comment\" data-bind=\"text: comment\"></p>\n</div>\n";

var __ko_component_label__$3 = 'comment-item';
var __ko_component_style__$3 = '';
var __ko_component_template__$3 = '';
var __ko_component__$6 = {
    constructor: function constructor(opts) {
        this.title = ko.observable(opts.title);
        this.comment = ko.observable(opts.comment);
    },


    defaults: {
        title: '',
        comment: ''
    },

    style: style$1,
    template: template$1
};
__ko_component__$6.name = __ko_component__$6.name || __ko_component_label__$3;
__ko_component__$6.style = __ko_component__$6.style || __ko_component_style__$3;
__ko_component__$6.template = __ko_component__$6.template || __ko_component_template__$3;
ko.components.register(__ko_component__$6);

var style$2 = ".comment-list {\n  position: relative; }\n\n.comment-list-wrapper {\n  list-style: none;\n  padding-left: 0; }\n\n.comment-list-item {\n  border-bottom: solid 1px #999999; }\n\n.comment-list-item:last-child {\n  border-bottom: none; }\n";

var template$2 = "<div class=\"comment-list\">\n    <ul class=\"comment-list-wrapper\" data-bind=\"foreach: comments\">\n        <li class=\"comment-list-item\">\n            <comment-item k-title=\"title\" k-comment=\"comment\"></comment-item>\n        </li>\n    </ul>\n</div>\n";

var __ko_component_label__$2 = 'comment-list';
var __ko_component_style__$2 = '';
var __ko_component_template__$2 = '';
var __ko_component__$4 = {
    constructor: function constructor(opts) {
        this.comments = ko.observableArray(opts.comments);
    },


    defaults: {
        comments: []
    },

    methods: {
        addComment: function addComment(title, comment) {
            this.comments.push({
                title: title,
                comment: comment
            });
        }
    },

    style: style$2,
    template: template$2
};
__ko_component__$4.name = __ko_component__$4.name || __ko_component_label__$2;
__ko_component__$4.style = __ko_component__$4.style || __ko_component_style__$2;
__ko_component__$4.template = __ko_component__$4.template || __ko_component_template__$2;
ko.components.register(__ko_component__$4);

var slice = Array.prototype.slice;
var noop = function noop() {};

function word(str) {
  return str && str[0].toUpperCase() + str.slice(1);
}

function onName(name) {
  return 'on' + name.split(/[^a-zA-Z0-9]/).reduce(function (rst, w) {
    rst += word(w) || '';
    return rst;
  }, '');
}

var eventMixin = {
  on: function on(name, cb) {
    this._events = this._events || {};
    (this._events[name] = this._events[name] || []).push(cb || noop);
    return this;
  },
  off: function off(name, cb) {
    if (!this._events) return this;
    var queue, index;
    if (!(queue = this._events[name])) return this;
    if (typeof cb === 'function') (index = queue.indexOf(cb)) !== -1 && (queue[index] = noop);else this._events[name] = queue.map(function () {
      return noop;
    });
    return this;
  },
  once: function once(name, cb) {
    var _this = this,
        _arguments = arguments;

    var tmp = function tmp() {
      cb.apply(_this, slice.call(_arguments));
      _this.off(name, tmp);
    };
    this.on(name, tmp);
    return this;
  },
  trigger: function trigger(name) {
    var _this2 = this;

    if (!this._events) return this;
    var queue;
    if (!(queue = this._events[name])) return this;
    var data = slice.call(arguments, 1);
    queue.forEach(function (cb) {
      return cb.apply(_this2, data);
    });
    queue = this._events[name];
    (queue = queue.filter(function (cb) {
      return cb !== noop;
    })).length === 0 ? delete this._events[name] : this._events[name] = queue;
    return this;
  },
  fireAll: function fireAll() {
    var args = slice.call(arguments);
    var name = onName(args[0]);
    this.props[name] && this.props[name].apply(this, args.slice(1));
    return this.fire.apply(this, args);
  }
};

var style$3 = ".comment-btn {\n  color: #999999;\n  border: none;\n  border-radius: 3px;\n  position: relative; }\n\n.comment-btn-default {\n  background-color: #ececec; }\n\n.comment-btn-primary {\n  color: #ffffff;\n  background-color: #38bc9c; }\n\n.comment-btn-danger {\n  color: #ffffff;\n  background-color: #ff493c; }\n";

var template$3 = "<button data-bind=\"text: text, attr: _getRootAttrBind(), click: _onClick\"></button>\n";

var __ko_component_label__$5 = 'comment-btn';
var __ko_component_style__$5 = '';
var __ko_component_template__$5 = '';
var __ko_component__$10 = {
    constructor: function constructor(opts) {
        this.text = ko.observable(opts.text);
        this.theme = opts.theme;
    },


    defaults: {
        theme: 'default'
    },

    mixins: [eventMixin],

    methods: {
        _onClick: function _onClick(vm, ev) {
            if (this.opts.onClick) {
                this.opts.onClick.apply(this, arguments);
            }

            this.trigger('click', vm, ev);
        },
        _getRootAttrBind: function _getRootAttrBind() {
            return {
                'class': [this.componentInfo.name, this.componentInfo.name + '-' + this.theme].join(' ')
            };
        }
    },

    style: style$3,
    template: template$3
};
__ko_component__$10.name = __ko_component__$10.name || __ko_component_label__$5;
__ko_component__$10.style = __ko_component__$10.style || __ko_component_style__$5;
__ko_component__$10.template = __ko_component__$10.template || __ko_component_template__$5;
ko.components.register(__ko_component__$10);

var style$4 = ".comment-form {\n  position: relative; }\n\n.comment-form-input, .comment-form-textarea {\n  border: solid 1px #999999;\n  display: block;\n  width: 100%;\n  margin-bottom: 10px; }\n";

var template$4 = "<div class=\"comment-form\">\n    <input class=\"comment-form-input\" data-bind=\"value: title\" placeholder=\"请输入标题\" />\n    <textarea class=\"comment-form-textarea\" data-bind=\"value: comment\" placeholder=\"请输入评论\"></textarea>\n    <comment-btn text=\"发送\" theme=\"primary\" on-click=\"_onSubmit\"></comment-btn>\n    <comment-btn text=\"清除\" theme=\"danger\" on-click=\"_onClear\"></comment-btn>\n</div>\n";

var __ko_component_label__$4 = 'comment-form';
var __ko_component_style__$4 = '';
var __ko_component_template__$4 = '';
var ERR_EMPTY_TITLE = '请输入标题';
var ERR_EMPTY_COMMENT = '请输入评论';

var __ko_component__$8 = {
    constructor: function constructor(opts) {
        this.title = ko.observable(opts.title);
        this.comment = ko.observable(opts.comment);

        this._onSubmit = this._onSubmit.bind(this);
        this._onClear = this._onClear.bind(this);
    },


    defaults: {
        title: '',
        comment: ''
    },

    mixins: [eventMixin],

    methods: {
        ready: function ready() {
            this.clear();
        },
        validate: function validate() {
            if (!this.title()) {
                return ERR_EMPTY_TITLE;
            }

            if (!this.comment()) {
                return ERR_EMPTY_COMMENT;
            }
        },
        submit: function submit() {
            var errMsg = this.validate();

            if (errMsg) {
                return alert(errMsg);
            }

            this.trigger('submit', {
                title: this.title(),
                comment: this.comment()
            });
        },
        clear: function clear() {
            this.title('');
            this.comment('');
            this.trigger('clear');
        },
        _onSubmit: function _onSubmit() {
            this.submit();
            this.clear();
        },
        _onClear: function _onClear() {
            this.clear();
        }
    },

    style: style$4,
    template: template$4
};
__ko_component__$8.name = __ko_component__$8.name || __ko_component_label__$4;
__ko_component__$8.style = __ko_component__$8.style || __ko_component_style__$4;
__ko_component__$8.template = __ko_component__$8.template || __ko_component_template__$4;
ko.components.register(__ko_component__$8);

var style$5 = ".comment-box {\n  width: 300px;\n  margin-left: auto;\n  margin-right: auto;\n  position: relative; }\n";

var template$5 = "<div class=\"comment-box\">\n    <comment-list></comment-list>\n    <hr />\n    <comment-form></comment-form>\n</div>\n";

var __ko_component_label__$1 = 'comment-box';
var __ko_component_style__$1 = '';
var __ko_component_template__$1 = '';
var __ko_component__$2 = {
    constructor: function constructor(opts) {
        this._onFormSubmitted = this._onFormSubmitted.bind(this);
    },


    methods: {
        ready: function ready() {
            this.commentList = this.ref('comment-list');
            this.commentForm = this.ref('comment-form');

            this.commentForm.on('submit', this._onFormSubmitted);
        },
        _onFormSubmitted: function _onFormSubmitted(comment) {
            this.commentList.addComment(comment.title, comment.comment);
        }
    },

    style: style$5,
    template: template$5
};
__ko_component__$2.name = __ko_component__$2.name || __ko_component_label__$1;
__ko_component__$2.style = __ko_component__$2.style || __ko_component_style__$1;
__ko_component__$2.template = __ko_component__$2.template || __ko_component_template__$1;
ko.components.register(__ko_component__$2);

var template$6 = "<div class=\"headline ui-basis\">\n    <div class=\"g g--row\">\n        <div class=\"c\"></div>\n        <div class=\"c c--3of5\">\n            <h1 class=\"h tac\" data-bind=\"text: text\"></h1>\n        </div>\n        <div class=\"c\"></div>\n    </div>\n</div>\n";

var __ko_component_label__$7 = 'headline';
var __ko_component_style__$7 = '';
var __ko_component_template__$7 = '';
var __ko_component__$14 = {
    constructor: function constructor(opts) {
        this.text = opts.text;
    },


    defaults: {
        text: '标题'
    },

    template: template$6
};
__ko_component__$14.name = __ko_component__$14.name || __ko_component_label__$7;
__ko_component__$14.style = __ko_component__$14.style || __ko_component_style__$7;
__ko_component__$14.template = __ko_component__$14.template || __ko_component_template__$7;
ko.components.register(__ko_component__$14);

var style$6 = ".avatar {\n  width: 24px;\n  height: 24px;\n  position: relative; }\n\n.avatar-img {\n  width: 100%;\n  height: 100%;\n  border-radius: 50%; }\n";

var template$7 = "<div class=\"avatar\">\n    <img class=\"avatar-img\" data-bind=\"attr: _getImageAttrBind()\" />\n</div>\n";

var __ko_component_label__$10 = 'avatar';
var __ko_component_style__$10 = '';
var __ko_component_template__$10 = '';
var __ko_component__$20 = {
    constructor: function constructor(opts) {
        this.src = opts.src;
        this.alt = opts.alt;
    },


    defaults: {
        src: '',
        alt: ''
    },

    methods: {
        _getImageAttrBind: function _getImageAttrBind() {
            return {
                src: this.src,
                alt: ''
            };
        }
    },

    style: style$6,
    template: template$7
};
__ko_component__$20.name = __ko_component__$20.name || __ko_component_label__$10;
__ko_component__$20.style = __ko_component__$20.style || __ko_component_style__$10;
__ko_component__$20.template = __ko_component__$20.template || __ko_component_template__$10;
ko.components.register(__ko_component__$20);

var style$7 = ".topic {\n  margin-left: 10px;\n  margin-right: 10px;\n  position: relative; }\n\n.topic-header, .topic-title, .topic-content {\n  margin-bottom: 0; }\n\n.topic-title {\n  margin-bottom: 20px; }\n\n.topic-content {\n  color: #6d6d6d; }\n";

var template$8 = "<div class=\"topic\">\n    <p class=\"topic-header\">\n        <avatar k-src=\"avatar\"></avatar>\n        <span class=\"topic-author\" data-bind=\"text: author\"></span>\n    </p>\n    <h2 class=\"topic-title\" data-bind=\"text: title\"></h2>\n    <p class=\"topic-content\" data-bind=\"html: content\"></p>\n</div>\n";

var __ko_component_label__$9 = 'topic';
var __ko_component_style__$9 = '';
var __ko_component_template__$9 = '';
var __ko_component__$18 = {
    constructor: function constructor(opts) {
        this.author = opts.author;
        this.title = opts.title;
        this.content = opts.content;
        this.avatar = opts.avatar;
    },


    defaults: {
        author: '',
        lable: '',
        title: '',
        content: ''
    },

    style: style$7,
    template: template$8
};
__ko_component__$18.name = __ko_component__$18.name || __ko_component_label__$9;
__ko_component__$18.style = __ko_component__$18.style || __ko_component_style__$9;
__ko_component__$18.template = __ko_component__$18.template || __ko_component_template__$9;
ko.components.register(__ko_component__$18);

var style$8 = ".topic-list {\n  position: relative; }\n";

var template$9 = "<div class=\"topic-list\">\n    <ul class=\"topic-list-wrapper vlist vlist--loose vlist--basis vlist--solid\" data-bind=\"foreach: topics\">\n        <li class=\"topic-list-item\">\n            <topic k-avatar=\"avatar\"\n                   k-author=\"author\"\n                   k-title=\"title\"\n                   k-content=\"content\">\n            </topic>\n        </li>\n    </ul>\n</div>\n";

var __ko_component_label__$8 = 'topic-list';
var __ko_component_style__$8 = '';
var __ko_component_template__$8 = '';
var __ko_component__$16 = {
    constructor: function constructor(opts) {
        this.url = opts.url;
        this.topics = ko.observableArray(opts.topics);
    },


    defaults: {
        url: '',
        topics: []
    },

    methods: {
        _getTopics: function _getTopics() {
            return $.get(this.url).then(function (result) {
                return result.data.map(function (item) {
                    return {
                        avatar: item.author.avatar_url,
                        author: item.author.loginname,
                        title: item.title,
                        content: item.content
                    };
                });
            });
        },
        fetch: function fetch() {
            var _this = this;

            return this._getTopics().then(function (topics) {
                topics.forEach(function (topic) {
                    _this.topics.push(topic);
                });
            });
        }
    },

    style: style$8,
    template: template$9
};
__ko_component__$16.name = __ko_component__$16.name || __ko_component_label__$8;
__ko_component__$16.style = __ko_component__$16.style || __ko_component_style__$8;
__ko_component__$16.template = __ko_component__$16.template || __ko_component_template__$8;
ko.components.register(__ko_component__$16);

var style$9 = ".index {\n  position: relative; }\n";

var template$10 = "<div class=\"index\">\n    <headline text=\"CNode\"></headline>\n    <topic-list k-url=\"url\"></topic-list>\n</div>\n";

var __ko_component_label__$6 = 'index';
var __ko_component_style__$6 = '';
var __ko_component_template__$6 = '';
var __ko_component__$12 = {
    constructor: function constructor(opts) {
        this.url = opts.url;
    },


    defaults: {
        url: ''
    },

    methods: {
        ready: function ready() {
            this.topicList = this.ref('topic-list');
            this.topicList.fetch();
        }
    },

    style: style$9,
    template: template$10
};
__ko_component__$12.name = __ko_component__$12.name || __ko_component_label__$6;
__ko_component__$12.style = __ko_component__$12.style || __ko_component_style__$6;
__ko_component__$12.template = __ko_component__$12.template || __ko_component_template__$6;
ko.components.register(__ko_component__$12);

ko.components.apply('body');

}());
