import forSelect from "../utils/for-select";
import h from "../utils/html";
import docLoaded from "./doc-loaded";
import Settings from "../settings.js";
import { arrAdd, arrDel } from "./array-set.js";

var style = null;

docLoaded.then(() => {
    style = document.head.appendChild(h("style.be-fe-banlist")).sheet;
});

export default class Hider {
    /**
     * @param {Settings} settings
     */
    constructor(settings) {
        this.settings = settings;
        docLoaded.then(() => {
            this.settings.banPosts.forEach(user => style.insertRule(`.be-fe-post-from-u-${user} { display: none; }`, 0));
        });
    }

    hidePostsFrom(user) {
        arrAdd(this.settings.banPosts, user);
        this.settings.save();
        style.insertRule(`.be-fe-post-from-u-${user} { display: none; }`, 0);
    }


    showPostsFrom(user) {
        arrDel(this.settings.banPosts, user);
        this.settings.save();
        const selector = `.be-fe-post-from-u-${user}`;
        Array.prototype.slice.call(style.rules).some((rule, n) => {
            if (rule.selectorText === selector) {
                style.deleteRule(n);
                return true;
            }
            return false;
        });
    }

    hideCommsFrom(user) {
        arrAdd(this.settings.banComms, user);
        this.settings.save();
        this.settings.banComms.forEach(u => {
            forSelect(document.body, `.be-fe-comment-from-u-${u}:not(.be-fe-comment-hidden)`, node => {
                node.classList.add("be-fe-comment-hidden");
            });
        });
    }

    showCommsFrom(user) {
        arrDel(this.settings.banComms, user);
        this.settings.save();
        forSelect(document.body, `.be-fe-comment-from-u-${user}.be-fe-comment-hidden`, node => {
            node.classList.remove("be-fe-comment-hidden");
        });
    }
}

