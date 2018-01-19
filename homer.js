;
(function (global, factory) {
    typeof exports === 'object' && module !== void 0 ? exports = module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
        global.Homer = factory();
})(this, function () {
    var SPACE = ' ',
        TOP, BOTTOM,
        FIXTIME = 300,
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

    function isObject(obj) {
        return !!obj && [].toString.call(obj).slice(8, -1).toLowerCase() == 'object'
    }

    function fixNotiOffset() {
        var boxes = _slice
            .call($$('.notification'))
            .filter(function (item) {
                return !item.classList.contains('box-disappearing');
            })

        if (arguments.length) {
            _slice.call(arguments).forEach(function (item) {
                boxes.splice(boxes.indexOf(item), 1);
            })
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

    function boxHideHandle(div, duration) {
        div.classList.remove('right-in');
        setTimeout(function () {
            fixNotiOffset(div);
            div.classList.add('box-disappearing')
            div.style.opacity = 0;
        }, FIXTIME + duration);
    }

    function buildFragment(str) {
        if (!isString(str)) return false;
        var node,
            div = createEl('div'),
            fragment = createFragment();
        div.innerHTML = str;
        while (node = div.childNodes[0]) {
            fragment.appendChild(node);
        }
        style.appendChild(fragment);
        if (!hasStyle) {
            document.head.appendChild(style);
        }
    }

    function buildNoti(title, content) {
        title = JSON.stringify(title);
        content = JSON.stringify(content);
        if (!title && !content) return false;

        var div = createEl('div');
        var tempStr = '<div class="notification__group">' +
            '<div class="iconfont icon-close notification__closeBtn"></div>' +
            '<h2 class="notification__title">' + (title || '') + '</h2>' +
            '<div class="notification__content">' +
            '<p>' + (content || '') + '</p>' +
            '</div></div>';

        div.classList.add('notification');
        div.innerHTML = tempStr;
        return div;
    }

    function bindTransitionEnd(clsName) {
        body.addEventListener('transitionend', function (e) {
            var target = e.target;
            if (target.classList.contains(clsName)) {
                if (target.style.opacity === '0') {
                    remove(target);
                }
            }
        }, false);
    }

    function createBox(title, content) {
        var div = buildNoti(title, content);
        div.classList.add('top-right', 'right-in');
        var doc = createFragment();
        doc.appendChild(div);
        body.appendChild(doc);
        fixNotiOffset();
        boxHideHandle(div, 2000);
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
    //create a notification box 
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
        createBox({
            a: 1
        }, [1, 2, 3, 324, 23, 423, 4, 234, 23, 432, 4]);
    }, false);
    return Homer;
})