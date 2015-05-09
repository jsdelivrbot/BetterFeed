/**
 *
 * @param {Element} element
 * @param {string} selector
 * @param {boolean} [withSelf]
 * @return {Element|null}
 */
var closestParent = function (element, selector, withSelf) {
    withSelf = withSelf || false;
    var p = withSelf ? element : element.parentNode;
    if (p && p.nodeType == Node.ELEMENT_NODE) {
        return p.matches(selector) ? p : closestParent(p, selector);
    }
    return null;
};

module.exports = closestParent;