(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ?
        exports = module.exports = factory() :
        typeof define === 'function' && define.amd ?
        define(factory) :
        (global.jQuery = global.$ = factory())
})(this, function () {
    var arrayPrototype = Array.prototype,
        _slice = arrayPrototype.slice,
        _toString = Object.prototype.toString;

    function isPlainObject(obj) {
        return /Object/.test(_toString.call(obj));
    }

    function jQuery(selector, context) {
        return new jQuery.fn.init(selector, context);
    }

    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
        init: function (selector, context) {
            if (!selector) {
                return this;
            }
            if (typeof selector === 'string') {

            }
        }
    }

    jQuery.fn.init.prototype = jQuery.fn;

    var extend = jQuery.extend = jQuery.fn.extend = function () {
        var target, source, options, copy, src, prop, clone, copyIsArray
            deep = true,
            args = _slice.call(arguments),
            len = args.length,
            last = args[len - 1],
            i = 1;

        if (last && typeof last === 'boolean') {
            deep = last;
            args.pop();
            len--;
        }

        if (!len) {
            return {};
        }

        target = args[0] || {};

        if (len === 1) {
            target = this;
            i--;
        }

        for (; i < len; i++) {
            if (options = args[i]) {
                for (prop in options) {
                    src = target[prop];
                    copy = options[prop];
                    if (target === copy) {
                        continue;
                    }
                    if (deep && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && Array.isArray(src) ? src : [];
                        } else {
                            clone = src && isPlainObject(src) ? src : {};
                        }
                        target[prop] = extend(clone, copy);
                    } else if (copy !== undefined) {
                        target[prop] = copy
                    }
                }
            }
        }
        return target;
    }
    return jQuery;
});