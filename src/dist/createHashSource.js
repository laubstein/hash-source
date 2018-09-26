var hasWindow = function () {
    return typeof window !== "undefined";
};
var getHashPath = function () {
    var href = hasWindow() ? window.location.href : '';
    var hashIndex = href.indexOf('#');
    return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
};
var pushHashPath = function (path) { return (window.location.hash = path); };
var replaceHashPath = function (path) {
    if (hasWindow()) {
        var hashIndex = window.location.href.indexOf('#');
        window.location.replace(window.location.href.slice(0, hashIndex >= 0 ? hashIndex : 0) + '#' + path);
    }
};
var getState = function (path) {
    var pathname = path ? path : getHashPath();
    return { pathname: pathname, search: '' };
};
var resolveInitialState = function (state) {
    if (state.pathname === '') {
        replaceHashPath('/');
    }
};
var createHashSource = function () {
    var state = getState();
    resolveInitialState(state);
    return {
        get location() {
            return getState();
        },
        addEventListener: function (name, fn) {
            hasWindow() && window.addEventListener(name, fn);
        },
        removeEventListener: function (name, fn) {
            hasWindow() && window.removeEventListener(name, fn);
        },
        history: {
            state: state,
            pushState: function (stateObj, _, uri) {
                state = getState(uri);
                pushHashPath(uri);
            },
            replaceState: function (stateObj, _, uri) {
                state = getState(uri);
                replaceHashPath(uri);
            },
        },
    };
};
export default createHashSource;
