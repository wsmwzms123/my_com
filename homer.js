;
(function (global, factory) {
    typeof exports === 'object' && module !== void 0 ? exports = module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
        global.Homer = factory();
})(this, function () {
    var SPACE = ' ',
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

    function isObject(obj) {
        return !!obj && [].toString.call(obj).slice(8, -1).toLowerCase() == 'object'
    }

    //compatibility for IE9 
    function addClass(el, cls) {
        if (!el || !cls || !(cls = cls.trim())) return false;
        if (el.classList) {
            if (cls.indexOf(SPACE) > -1) {
                cls.split(/\s+/).forEach(function (item) {
                    el.classList.add(item);
                })
            } else {
                el.classList.add(cls);
            }
        } else {
            var tempClass = SPACE + (el.getAttribute('class') || '').trim() + SPACE;
            if (tempClass.indexOf(SPACE + cls + SPACE) < 0) {
                el.setAttribute('class', (tempClass + cls.trim()));
            }
        }
    }
    function removeClass(el, cls) {
        if (!el || !cls || !(cls = cls.trim())) return false;
        if (el.classList) {
            if (cls.indexOf(SPACE) > -1) {
                cls.split(/\s+/).forEach(function (item) {
                    el.classList.remove(item);
                })
            } else {
                el.classList.remove(cls);
            }
            if (!el.classList.length) el.removeAttribute('class');
        } else {
            var tempClass = SPACE + (el.getAttribute('class') || '').trim() + SPACE;
            cls = SPACE + cls + SPACE;
            while (tempClass.indexOf(cls) > -1) {
                tempClass = tempClass.replace(cls, ' ');
            }
            if (tempClass) {
                el.setAttribute('class', tempClass);
            } else {
                el.removeAttribute('class');
            }

        }
    }
    function fixBoxOffset(exclude) {
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

    function buildNoti(title, content) {
        if (!title && !content) return false;
        if (title && !content) {
            content = title;
            title = '';
        }
        // <div class="notification">
        //     <div class="notification__group">
        //         <div class="iconfont icon-close notification__closeBtn"></div>
        //         <h2 class="notification__title">这是标题阿斯达岁的萨德阿萨德阿萨德阿萨德阿萨德</h2>
        //         <div class="notification__content">
        //                 的萨德阿萨德阿萨的萨德阿萨德阿萨的萨德阿萨德阿萨的萨德阿萨德阿萨的萨德阿萨德阿萨的萨德阿萨德阿萨的萨德阿萨德阿萨的萨德阿萨德阿萨的萨德阿萨德阿萨的萨德阿萨德阿萨
        //         </div>
        //     </div>
        // </div>

    }

    function createBox(content) {
        div = createEl('div');
        div.textContent = content || '';
        addClass(div, 'notification top-right right-in');
        body.appendChild(div);
        fixBoxOffset();
        (function (div) {
            setTimeout(function () {
                // div.classList.remove('right-in');
                removeClass(div, 'right-in');
                setTimeout(function () {
                    div.style.opacity = 0;
                    fixBoxOffset(div);
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
        createBox('asdasdsad asdasd asd  asd asd as asd asd asd sad asd as as dasd asd asd asd asd');
    })
    return Homer;
})