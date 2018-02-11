var SPACE = ' ',
    STANDARDUNIT = 16,
    DURATION = 4000,
    _slice = Array.prototype.slice,
    body = document.body || document.getElementsByTagName('body')[0],
    $ = document.querySelector.bind(document),
    $$ = document.querySelectorAll.bind(document),
    createEl = document.createElement.bind(document),
    createFragment = document.createDocumentFragment.bind(document);

function isString(str) {
    return typeof str === 'string';
}

function isObject(obj) {
    return !!obj && Object.prototype.toString.call(obj).slice(8, -1).toLowerCase() == 'object';
}

function remove(el) {
    if (el.parentNode) {
        el.parentNode.removeChild(el);
    }
}

function getOffset(el) {
    if (el) {
        return el.getBoundingClientRect();
    }
}

function hideEl(el) {
    if (el) {
        fixNotiOffset(el);
        el.classList.add('disappearing')
        el.style.opacity = 0;
    }
}

function boxHideHandle(div, duration) {
    if (duration && duration > 0) {
        setTimeout(function () {
            hideEl(div)
        }, duration);
    }
}

function bindTransitionEnd() {
    body.addEventListener('transitionend', function (e) {
        var target = e.target;
        var hasClass = _slice.call(arguments).some(function (cls) {
            return target.classList.contains(cls);
        })
        if (hasClass && target.style.opacity === '0') {
            remove(target);
        }
    }, false);
}

//if arguments exist(dom object), exclude them;
function fixNotiOffset() {
    var boxes = _slice
        .call($$('.notification'))
        .filter(function (item) {
            return !item.classList.contains('disappearing');
        })
    if (arguments.length) {
        _slice.call(arguments).forEach(function (item) {
            boxes.splice(boxes.indexOf(item), 1);
        })
    }

    var temp = STANDARDUNIT;
    boxes.forEach(function (box, index) {
        if (index !== 0) {
            temp += getOffset(box).height + STANDARDUNIT;
        }

        if (getOffset(box).top !== temp) {
            box.style.top = temp + 'px';
        }
    });
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


function closeBox() {
    body.addEventListener('click', function (e) {
        var target = e.target;
        if (target.classList.contains('notification__closeBtn')) {
            hideEl(target.parentNode.parentNode);
        }
    })
}

function createBox(title, content) {
    var div = buildNoti(title, content);
    div.classList.add('top-right', 'right-in');
    var doc = createFragment();
    doc.appendChild(div);
    body.appendChild(doc);
    fixNotiOffset();
    div.classList.remove('right-in');
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
bindTransitionEnd('notification');
closeBox();
document.addEventListener('click', function (e) {
    createBox({
        a: 1
    }, [1, 2, 3, 324, 23, 423, 4, 234, 23, 432, 4]);
}, false);
return Homer;
Vue.prototype._proxy = function (key) {
    // $和_开头的属性默认是Vue内部属性,不允许挂载到Vue上,
    // 大家自己写data的时候也尽量别写这些属性名,尤其是在使用mongo做后台时,没错,我想说的就是那个_id属性
    if (!isReserved(key)) {
      // need to store ref to self here
      // because these getter/setters might
      // be called by child scopes via
      // prototype inheritance.
      var self = this
      Object.defineProperty(self, key, {
        configurable: true,
        enumerable: true,
        get: function proxyGetter () {
          return self._data[key]
        },
        set: function proxySetter (val) {
          self._data[key] = val
        }
      })
    }
  }