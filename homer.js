;
(function (global, factory) {
    typeof exports === 'object' && module !== void 0 ? exports = module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
        global.Homer = factory();
})(this, function () {
    var PLACE = ' ',
        TOP, BOTTOM,
        DELAY = 300,
        DURATION = 4000,
        AUTO = true,
        _slice = Array.prototype.slice,
        body = document.body || document.getElementsByTagName('body')[0],
        $ = document.querySelector.bind(document),
        $$ = document.querySelectorAll.bind(document),
        createEl = document.createElement.bind(document),
        createFragment = document.createDocumentFragment.bind(document),
        TOP = BOTTOM = 16;

    function getOffset(el) {
        if (el) {
            return el.getBoundingClientRect();
        }
    }

    function isString(str) {
        return !!str && typeof str === 'string'
    }

    function remove(el) {
        if (el.parentNode) {
            el.parentNode.removeChild(el);
        }
    }

    function ifObject(obj) {
        return !!obj && [].toString.call(obj).slice(8, -1).toLowerCase() == 'object'
    }

    function formatBoxesTop(exclude) {
        var boxes = _slice.call($$('.notification'));
        if (exclude) {
            boxes.splice(boxes.indexOf(exclude), 1);
        }
        var temp;
        boxes.forEach(function (box, index, arr) {
            if (index === 0) {
                temp = TOP;
            } else {
                temp += getOffset(box).height + TOP;
            }
            if (getOffset(box).top !== temp) {
                box.style.top = temp + 'px';
            }
        });
    }

    function createStyles(str) {
        if (!isString(str)) return false;
        var node,
            div = createEl('div'),
            fragment = createFragment(),
            style = $('style') || createEl('style'),
            hasStyle = !!$('style');
        div.innerHTML = str;
        while (node = div.childNodes[0]) {
            fragment.appendChild(node);
        }
        style.appendChild(fragment);
        if (!hasStyle) {
            document.head.appendChild(style);
        }
    }

    function createBox(content) {
        div = createEl('div');
        div.textContent = content || '';
        div.classList.add('notification', 'top-right', 'right-in');
        body.appendChild(div);
        formatBoxesTop();
        (function (div) {
            setTimeout(function () {
                div.classList.remove('right-in');

                setTimeout(function () {
                    div.style.opacity = 0;
                    formatBoxesTop(div);
                    remove(div);
                    div = null;
                }, DURATION);

            });
        })(div);
    }

    var Homer = function () {
        if (!(this instanceof Homer)) {
            return new Homer.apply(this, _slice.call(arguments));
        }
    };

    var extend = Homer.extend = Homer.prototype.extend = function (target, source) {
        var args = _slice.call(arguments);
        if (args.length <= 1) {
            return target = target || {};
        }
    }

    Homer.prototype.message = function (config) {
        if (!config) {
            throw new Error('you should pass a string or an object as argument!')
        }
    }
    for (var prop in Homer.prototype) {
        Homer[prop] = function () {
            return new Homer()[prop].apply()
        }
    }

    document.addEventListener('click', function (e) {
        createBox('asdasdasadas');
    })
    return Homer;
})