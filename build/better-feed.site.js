!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){var r=n(1),o=n(2),a=[];MutationObserver&&Promise&&r.then(function(){var e=new MutationObserver(function(e){e.forEach(function(e){var t,n,r;for(t=0,n=e.addedNodes.length;n>t;t++)r=e.addedNodes[t],r.nodeType==Node.ELEMENT_NODE&&a.forEach(function(e){e(r)})})});if(e.observe(document.body,{childList:!0,subtree:!0}),a.forEach(function(e){e()}),"1"===localStorage["be-fe-enabled"]){var t=document.createElement("script");t.src="https://cdn.rawgit.com/davidmz/BetterFeed/v1.13.0/build/better-feed.user.js",t.type="text/javascript",t.charset="utf-8",t.async=!0,document.head.appendChild(t)}}),a.push(function(e){e=e||document.body;var t=e.querySelector(".p-settings-changepassword-header");if(t&&!e.querySelector(".p-settings-betterfeed-header")){var n=null,r=null,a=o("div",o("h2.p-settings-betterfeed-header","BetterFeed"),o("p",o("label",n=o("input",{type:"checkbox"})," включить BetterFeed")),o("p","BetterFeed — это скрипт, улучшающий интерфейс FreeFeed-а (",o("a",{href:"https://github.com/davidmz/BetterFeed",target:"_blank"},"подробнее"),")."),o("p",r=o("button.btn.btn-default","Применить")),o("hr"));t.parentNode.insertBefore(a,t),n.checked="1"===localStorage["be-fe-enabled"],r.addEventListener("click",function(){localStorage["be-fe-enabled"]=n.checked?"1":"",location.reload()})}})},function(e,t,n){e.exports=new Promise(function(e){"complete"===document.readyState||"interactive"===document.readyState?setTimeout(e,0):document.addEventListener("DOMContentLoaded",e)})},function(e,t,n){function r(e,t){t instanceof Node?e.appendChild(t):o(t)?t.forEach(r.bind(null,e)):"string"==typeof t&&e.appendChild(document.createTextNode(t))}var o=n(3);e.exports=function(e,t,n){var a,d,i=e.split("."),c=i.shift()||"div",s=document.createElement(c);i.length>0&&(s.className=i.join(" "));var u=1;if(arguments.length>1&&"object"==typeof t&&!(t instanceof Node)&&!o(t)){for(d in t)t.hasOwnProperty(d)&&s.setAttribute(d,t[d]);u=2}if(arguments.length>u)for(a=u;a<arguments.length;a++)r(s,arguments[a]);return s}},function(e,t,n){e.exports=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)}}]);