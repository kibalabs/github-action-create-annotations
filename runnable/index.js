!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("@kibalabs/github-action-create-annotations",[],e):"object"==typeof exports?exports["@kibalabs/github-action-create-annotations"]=e():t["@kibalabs/github-action-create-annotations"]=e()}(global,(function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=5)}([function(t,e,n){t.exports=n(6)},function(t,e,n){"use strict";var r=n(0),o=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))((function(o,i){function a(t){try{u(r.next(t))}catch(t){i(t)}}function c(t){try{u(r.throw(t))}catch(t){i(t)}}function u(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,c)}u((r=r.apply(t,e||[])).next())}))},i=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var a,c=n(9),u=n(12),s=n(4),f=i(n(3)),l=i(n(14));function p(t){c.issue("error",t instanceof Error?t.toString():t)}function h(t){c.issue("group",t)}function d(){c.issue("endgroup")}!function(t){t[t.Success=0]="Success",t[t.Failure=1]="Failure"}(a=e.ExitCode||(e.ExitCode={})),e.exportVariable=function(t,e){var n=s.toCommandValue(e);if(Object({PACKAGE_NAME:"@kibalabs/github-action-create-annotations",PACKAGE_VERSION:"0.0.0"})[t]=n,Object({PACKAGE_NAME:"@kibalabs/github-action-create-annotations",PACKAGE_VERSION:"0.0.0"}).GITHUB_ENV||""){var r="_GitHubActionsFileCommandDelimeter_",o="".concat(t,"<<").concat(r).concat(f.EOL).concat(n).concat(f.EOL).concat(r);u.issueCommand("ENV",o)}else c.issueCommand("set-env",{name:t},n)},e.setSecret=function(t){c.issueCommand("add-mask",{},t)},e.addPath=function(t){Object({PACKAGE_NAME:"@kibalabs/github-action-create-annotations",PACKAGE_VERSION:"0.0.0"}).GITHUB_PATH||""?u.issueCommand("PATH",t):c.issueCommand("add-path",{},t),Object({PACKAGE_NAME:"@kibalabs/github-action-create-annotations",PACKAGE_VERSION:"0.0.0"}).PATH="".concat(t).concat(l.delimiter).concat(Object({PACKAGE_NAME:"@kibalabs/github-action-create-annotations",PACKAGE_VERSION:"0.0.0"}).PATH)},e.getInput=function(t,e){var n=Object({PACKAGE_NAME:"@kibalabs/github-action-create-annotations",PACKAGE_VERSION:"0.0.0"})["INPUT_".concat(t.replace(/ /g,"_").toUpperCase())]||"";if(e&&e.required&&!n)throw new Error("Input required and not supplied: ".concat(t));return n.trim()},e.setOutput=function(t,e){c.issueCommand("set-output",{name:t},e)},e.setCommandEcho=function(t){c.issue("echo",t?"on":"off")},e.setFailed=function(t){process.exitCode=a.Failure,p(t)},e.isDebug=function(){return"1"===Object({PACKAGE_NAME:"@kibalabs/github-action-create-annotations",PACKAGE_VERSION:"0.0.0"}).RUNNER_DEBUG},e.debug=function(t){c.issueCommand("debug",{},t)},e.error=p,e.warning=function(t){c.issue("warning",t instanceof Error?t.toString():t)},e.info=function(t){process.stdout.write(t+f.EOL)},e.startGroup=h,e.endGroup=d,e.group=function(t,e){return o(this,void 0,void 0,r.mark((function n(){var o;return r.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return h(t),n.prev=1,n.next=4,e();case 4:o=n.sent;case 5:return n.prev=5,d(),n.finish(5);case 8:return n.abrupt("return",o);case 9:case"end":return n.stop()}}),n,null,[[1,,5,8]])})))},e.saveState=function(t,e){c.issueCommand("save-state",{name:t},e)},e.getState=function(t){return Object({PACKAGE_NAME:"@kibalabs/github-action-create-annotations",PACKAGE_VERSION:"0.0.0"})["STATE_".concat(t)]||""}},function(t,e){function n(t,e,n,r,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void n(t)}c.done?e(u):Promise.resolve(u).then(r,o)}t.exports=function(t){return function(){var e=this,r=arguments;return new Promise((function(o,i){var a=t.apply(e,r);function c(t){n(a,o,i,c,u,"next",t)}function u(t){n(a,o,i,c,u,"throw",t)}c(void 0)}))}}},function(t,e){t.exports=require("os")},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.toCommandValue=function(t){return null==t?"":"string"==typeof t||t instanceof String?t:JSON.stringify(t)}},function(t,e,n){t.exports=n(15)},function(t,e,n){(function(t){var e=n(8),r=function(t){"use strict";var n=Object.prototype,r=n.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,n){return t[e]=n}}function s(t,e,n,r){var o=e&&e.prototype instanceof p?e:p,i=Object.create(o.prototype),a=new O(r||[]);return i._invoke=function(t,e,n){var r="suspendedStart";return function(o,i){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw i;return P()}for(n.method=o,n.arg=i;;){var a=n.delegate;if(a){var c=E(a,n);if(c){if(c===l)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var u=f(t,e,n);if("normal"===u.type){if(r=n.done?"completed":"suspendedYield",u.arg===l)continue;return{value:u.arg,done:n.done}}"throw"===u.type&&(r="completed",n.method="throw",n.arg=u.arg)}}}(t,n,a),i}function f(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=s;var l={};function p(){}function h(){}function d(){}var v={};v[i]=function(){return this};var m=Object.getPrototypeOf,y=m&&m(m(A([])));y&&y!==n&&r.call(y,i)&&(v=y);var g=d.prototype=p.prototype=Object.create(v);function b(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function w(t,n){var o;this._invoke=function(i,a){function c(){return new n((function(o,c){!function o(i,a,c,u){var s=f(t[i],t,a);if("throw"!==s.type){var l=s.arg,p=l.value;return p&&"object"===e(p)&&r.call(p,"__await")?n.resolve(p.__await).then((function(t){o("next",t,c,u)}),(function(t){o("throw",t,c,u)})):n.resolve(p).then((function(t){l.value=t,c(l)}),(function(t){return o("throw",t,c,u)}))}u(s.arg)}(i,a,o,c)}))}return o=o?o.then(c,c):c()}}function E(t,e){var n=t.iterator[e.method];if(void 0===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,E(t,e),"throw"===e.method))return l;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var r=f(n,t.iterator,e.arg);if("throw"===r.type)return e.method="throw",e.arg=r.arg,e.delegate=null,l;var o=r.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,l):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,l)}function _(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function x(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(_,this),this.reset(!0)}function A(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:P}}function P(){return{value:void 0,done:!0}}return h.prototype=g.constructor=d,d.constructor=h,h.displayName=u(d,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===h||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,d):(t.__proto__=d,u(t,c,"GeneratorFunction")),t.prototype=Object.create(g),t},t.awrap=function(t){return{__await:t}},b(w.prototype),w.prototype[a]=function(){return this},t.AsyncIterator=w,t.async=function(e,n,r,o,i){void 0===i&&(i=Promise);var a=new w(s(e,n,r,o),i);return t.isGeneratorFunction(n)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},b(g),u(g,c,"Generator"),g[i]=function(){return this},g.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=A,O.prototype={constructor:O,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(x),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,r){return a.type="throw",a.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),u=r.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,l):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),l},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),x(n),l}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;x(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:A(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),l}},t}("object"===e(t)?t.exports:{});try{regeneratorRuntime=r}catch(t){Function("r","regeneratorRuntime = r")(r)}}).call(this,n(7)(t))},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},function(t,e){function n(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=n=function(t){return typeof t}:t.exports=n=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(e)}t.exports=n},function(t,e,n){"use strict";var r=n(10),o=n(11),i=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var a=i(n(3)),c=n(4);function u(t,e,n){var r=new s(t,e,n);process.stdout.write(r.toString()+a.EOL)}e.issueCommand=u,e.issue=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";u(t,{},e)};var s=function(){function t(e,n,o){r(this,t),e||(e="missing.command"),this.command=e,this.properties=n,this.message=o}return o(t,[{key:"toString",value:function(){var t,e="::"+this.command;if(this.properties&&Object.keys(this.properties).length>0){e+=" ";var n=!0;for(var r in this.properties)if(this.properties.hasOwnProperty(r)){var o=this.properties[r];o&&(n?n=!1:e+=",",e+="".concat(r,"=").concat((t=o,c.toCommandValue(t).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A").replace(/:/g,"%3A").replace(/,/g,"%2C"))))}}return e+="".concat("::").concat(function(t){return c.toCommandValue(t).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A")}(this.message))}}]),t}()},function(t,e){t.exports=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},function(t,e){function n(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}t.exports=function(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}},function(t,e,n){"use strict";var r=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var o=r(n(13)),i=r(n(3)),a=n(4);e.issueCommand=function(t,e){var n=Object({PACKAGE_NAME:"@kibalabs/github-action-create-annotations",PACKAGE_VERSION:"0.0.0"})["GITHUB_".concat(t)];if(!n)throw new Error("Unable to find environment variable for file command ".concat(t));if(!o.existsSync(n))throw new Error("Missing file at path: ".concat(n));o.appendFileSync(n,"".concat(a.toCommandValue(e)).concat(i.EOL),{encoding:"utf8"})}},function(t,e){t.exports=require("fs")},function(t,e){t.exports=require("path")},function(t,e,n){"use strict";n.r(e);var r=n(0),o=n.n(r),i=n(2),a=n.n(i),c=n(1);function u(t){return s.apply(this,arguments)}function s(){return(s=a()(o.a.mark((function t(e){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t){if(Number.isNaN(e))throw new Error("milliseconds not a number");setTimeout((function(){return t("done!")}),e)})));case 1:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function f(){return(f=a()(o.a.mark((function t(){var e;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e=c.getInput("milliseconds"),c.debug("Waiting ".concat(e," milliseconds ...")),c.debug((new Date).toTimeString()),t.next=6,u(parseInt(e,10));case 6:c.debug((new Date).toTimeString()),c.setOutput("time",(new Date).toTimeString()),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(0),c.setFailed(t.t0.message);case 13:case"end":return t.stop()}}),t,null,[[0,10]])})))).apply(this,arguments)}!function(){f.apply(this,arguments)}()}])}));