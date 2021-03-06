import forSelect from "../utils/for-select.js";
import h from "../utils/html.js";
import closestParent from "../utils/closest-parent.js";

export default function (node, settings) {
    node = node || document.body;

    if (settings.flag("alt-text-proc")) {
        forSelect(node, ".be-fe-at-link", node => {
            hlOver(node, ".be-fe-comment-from-u-" + node.dataset["username"]);
        });
    } else {
        forSelect(node, ".comment-text, .post-body > .body > .text", function (node) {
            var c = node.firstChild;
            while (c) {
                if (c.nodeType == Node.TEXT_NODE && /\B@([a-z0-9]+(?:-[a-z0-9]+)*)\b/i.test(c.nodeValue)) {
                    var re = /\B@([a-z0-9]+(?:-[a-z0-9]+)*)\b/ig,
                        str = c.nodeValue,
                        fr = document.createDocumentFragment(),
                        m, ptr = 0;
                    while ((m = re.exec(str)) !== null) {
                        var match = m[0], login = m[1].toLowerCase(), off = m.index;
                        fr.appendChild(document.createTextNode(str.substr(ptr, off - ptr)));
                        ptr = off + match.length;
                        let existingLink = document.querySelector(`a[href="/${login}"]:not(.be-fe-at-link-regular)`);
                        let a;
                        if (existingLink) {
                            a = existingLink.cloneNode(false);
                            a.className = "be-fe-at-link";
                            a.appendChild(document.createTextNode(match));
                        } else {
                            a = h("a.be-fe-at-link.be-fe-at-link-regular", {href: "/" + login}, match);
                        }
                        fr.appendChild(a);
                        hlOver(a, ".be-fe-comment-from-u-" + login);
                    }
                    var lastCh = fr.appendChild(document.createTextNode(str.substr(ptr)));
                    node.insertBefore(fr, c);
                    node.removeChild(c);
                    c = lastCh;
                }
                c = c.nextSibling;
            }
        });
    }

    // ссылки с ^^^
    forSelect(node, ".comment-text", function (node) {
        var c = node.firstChild;
        while (c) {
            if (c.nodeType == Node.TEXT_NODE && /[↑^]/.test(c.nodeValue)) {
                var re = /↑+|\^+W?/g,
                    str = c.nodeValue,
                    fr = document.createDocumentFragment(),
                    m, ptr = 0;
                while ((m = re.exec(str)) !== null) {
                    var match = m[0], off = m.index;
                    if (match === "^W") {
                        continue;
                    }
                    match = match.replace('W', '');
                    fr.appendChild(document.createTextNode(str.substr(ptr, off - ptr)));
                    ptr = off + match.length;
                    var a = fr.appendChild(h("span.be-fe-ups", match));
                    var ref = getRefComment(closestParent(node, ".ember-view"), match.length);
                    if (ref) {
                        hlOver(a, "#" + ref.id);
                    }
                }
                var lastCh = fr.appendChild(document.createTextNode(str.substr(ptr)));
                node.insertBefore(fr, c);
                node.removeChild(c);
                c = lastCh;
            }
            c = c.nextSibling;
        }
    });

};

var getRefComment = function (comm, n) {
    var refComm = null;
    while (true) {
        var m;
        comm = comm.previousElementSibling;
        if (!comm) {
            break
        } else if (comm.classList.contains("more-comments")) {
            m = parseInt(comm.textContent);
            if (!isNaN(m)) {
                n -= m;
            }
        } else if (comm.classList.contains("more-comments-wrapper")) {
            m = parseInt(comm.firstElementChild.textContent);
            if (!isNaN(m)) {
                n -= m;
            }
        } else if (comm.classList.contains("ember-view")) {
            n--;
            if (n == 0) {
                refComm = comm;
                break;
            }
        }
    }
    return refComm;
};

var hlOver = function (el, selector) {
    if (el.dataset["hlSelector"]) return;
    el.dataset["hlSelector"] = selector;
    el.addEventListener("mouseover", linkMouseOver);
    el.addEventListener("mouseout", linkMouseOut);
};

var linkMouseOver = function (e) {
    var selector;
    if ((selector = e.target.dataset["hlSelector"])) {
        forSelect(closestParent(e.target, ".comments"), selector, function (node) {
            node.classList.add("be-fe-comment-hl");
        });
    }
};
var linkMouseOut = function (e) {
    forSelect(closestParent(e.target, ".comments"), ".be-fe-comment-hl", function (node) {
        node.classList.remove("be-fe-comment-hl");
    });
};
