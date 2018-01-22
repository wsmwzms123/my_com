;
(function (global, factory) {
    typeof exports === 'object' && module !== void 0 ? exports = module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
        global.Homer = factory();
})(this, function () {

    var _toString = Object.prototype.toString;
    
    function isPlainObject(obj) {
        return _toString.call(obj).slice(8, -1).toLowerCase() === 'object';
    }

    function isFunction(fn) {
        return typeof fn === 'function';
    }

    function simpleObserver(obj, key, fn) {
        var oldVal = obj.key;
        Object.defineProperty(obj, key, {
            get: function () {
                return oldVal;
            },
            set: function (newVal) {
                oldVal = newVal;
                fn.call(obj);
            }
        })
    }

    function _Homer(options) {
        if (!(this instanceof _Homer)) {
            return new _Homer(options);
        }
        this._init(options);
    }

    _Homer.bindGlobalDisappearEvent = null;

    _Homer.prototype._init = function (options) {
        var hm = this;
        hm.mounted = false;
        if (!(isPlainObject(options))) {
            throw new Error('options should be an object!');
        }
        if (options.type) {
            hm.mounted = true;
            var type = options.type;
            if (hm[type] && typeof hm[type] === 'function') {
                delete options.type;
                hm.options = options;
                hm[type](options);
            }
        }
    }
    _Homer.prototype.createBox = function (options) {
        var hm = this;

    }
    return _Homer;
})