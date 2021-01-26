var app=function(){"use strict";function t(){}function n(t){return t()}function e(){return Object.create(null)}function o(t){t.forEach(n)}function r(t){return"function"==typeof t}function c(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function u(n,e,o){n.$$.on_destroy.push(function(n,...e){if(null==n)return t;const o=n.subscribe(...e);return o.unsubscribe?()=>o.unsubscribe():o}(e,o))}function s(t,n,e=n){return t.set(e),n}function i(t,n){t.appendChild(n)}function l(t,n,e){t.insertBefore(n,e||null)}function f(t){t.parentNode.removeChild(t)}function a(t){return document.createElement(t)}function d(t){return document.createTextNode(t)}function h(){return d(" ")}function p(){return d("")}function m(t,n,e,o){return t.addEventListener(n,e,o),()=>t.removeEventListener(n,e,o)}function $(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function g(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function b(t,n){t.value=null==n?"":n}let y;function v(t){y=t}const x=[],_=[],w=[],k=[],C=Promise.resolve();let z=!1;function E(t){w.push(t)}let N=!1;const O=new Set;function j(){if(!N){N=!0;do{for(let t=0;t<x.length;t+=1){const n=x[t];v(n),A(n.$$)}for(v(null),x.length=0;_.length;)_.pop()();for(let t=0;t<w.length;t+=1){const n=w[t];O.has(n)||(O.add(n),n())}w.length=0}while(x.length);for(;k.length;)k.pop()();z=!1,N=!1,O.clear()}}function A(t){if(null!==t.fragment){t.update(),o(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(E)}}const H=new Set;let L;function P(t,n){t&&t.i&&(H.delete(t),t.i(n))}function S(t,n,e,o){if(t&&t.o){if(H.has(t))return;H.add(t),L.c.push((()=>{H.delete(t),o&&(e&&t.d(1),o())})),t.o(n)}}function T(t){t&&t.c()}function q(t,e,c){const{fragment:u,on_mount:s,on_destroy:i,after_update:l}=t.$$;u&&u.m(e,c),E((()=>{const e=s.map(n).filter(r);i?i.push(...e):o(e),t.$$.on_mount=[]})),l.forEach(E)}function B(t,n){const e=t.$$;null!==e.fragment&&(o(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function I(t,n){-1===t.$$.dirty[0]&&(x.push(t),z||(z=!0,C.then(j)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function M(n,r,c,u,s,i,l=[-1]){const a=y;v(n);const d=r.props||{},h=n.$$={fragment:null,ctx:null,props:i,update:t,not_equal:s,bound:e(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(a?a.$$.context:[]),callbacks:e(),dirty:l,skip_bound:!1};let p=!1;if(h.ctx=c?c(n,d,((t,e,...o)=>{const r=o.length?o[0]:e;return h.ctx&&s(h.ctx[t],h.ctx[t]=r)&&(!h.skip_bound&&h.bound[t]&&h.bound[t](r),p&&I(n,t)),e})):[],h.update(),p=!0,o(h.before_update),h.fragment=!!u&&u(h.ctx),r.target){if(r.hydrate){const t=function(t){return Array.from(t.childNodes)}(r.target);h.fragment&&h.fragment.l(t),t.forEach(f)}else h.fragment&&h.fragment.c();r.intro&&P(n.$$.fragment),q(n,r.target,r.anchor),j()}v(a)}class D{$destroy(){B(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}var F;!function(t){t[t.Choose=0]="Choose",t[t.Name=1]="Name",t[t.Host=2]="Host",t[t.Contestant=3]="Contestant"}(F||(F={}));const G=[];function J(n,e=t){let o;const r=[];function u(t){if(c(n,t)&&(n=t,o)){const t=!G.length;for(let t=0;t<r.length;t+=1){const e=r[t];e[1](),G.push(e,n)}if(t){for(let t=0;t<G.length;t+=2)G[t][0](G[t+1]);G.length=0}}}return{set:u,update:function(t){u(t(n))},subscribe:function(c,s=t){const i=[c,s];return r.push(i),1===r.length&&(o=e(u)||t),c(n),()=>{const t=r.indexOf(i);-1!==t&&r.splice(t,1),0===r.length&&(o(),o=null)}}}}let K=F.Choose;const Q=J({state:"Open"}),R=J([]),U=J(K),V=J(null);function W(n){let e,o,r;return{c(){e=a("div"),o=d(n[1]),$(e,"style",r=`color: #${n[0]}`)},m(t,n){l(t,e,n),i(e,o)},p(t,[n]){1&n&&r!==(r=`color: #${t[0]}`)&&$(e,"style",r)},i:t,o:t,d(t){t&&f(e)}}}function X(t,n,e){let o,r,c;u(t,Q,(t=>e(2,o=t))),u(t,V,(t=>e(3,r=t))),u(t,U,(t=>e(4,c=t)));let[s,i]="Open"===o.state?["the buzzer is open","a3be8c"]:"Closed"===o.state?["the buzzer is closed","bf616a"]:o.owner===r?["you have buzzed in","88c0d0"]:[`${o.owner} has buzzed in`,"bf616a"];return"Host"===c&&(i="88c0d0"),[i,s]}class Y extends D{constructor(t){super(),M(this,t,X,W,c,{})}}function Z(t,n,e){const o=t.slice();return o[3]=n[e],o[4]=n,o[5]=e,o}function tt(t){let n,e=t[3].score+"";return{c(){n=d(e)},m(t,e){l(t,n,e)},p(t,o){1&o&&e!==(e=t[3].score+"")&&g(n,e)},d(t){t&&f(n)}}}function nt(t){let n,e,o;function r(){t[2].call(n,t[4],t[5])}return{c(){n=a("input"),$(n,"class","small")},m(c,u){l(c,n,u),b(n,t[3].score),e||(o=m(n,"input",r),e=!0)},p(e,o){t=e,1&o&&n.value!==t[3].score&&b(n,t[3].score)},d(t){t&&f(n),e=!1,o()}}}function et(t){let n,e,o,r,c=t[3].name+"";function u(t,n){return 2===t[1]?nt:tt}let s=u(t),p=s(t);return{c(){n=a("div"),e=d(c),o=d(":\n        "),p.c(),r=h()},m(t,c){l(t,n,c),i(n,e),i(n,o),p.m(n,null),i(n,r)},p(t,o){1&o&&c!==(c=t[3].name+"")&&g(e,c),s===(s=u(t))&&p?p.p(t,o):(p.d(1),p=s(t),p&&(p.c(),p.m(n,r)))},d(t){t&&f(n),p.d()}}}function ot(n){let e,o=n[0],r=[];for(let t=0;t<o.length;t+=1)r[t]=et(Z(n,o,t));return{c(){for(let t=0;t<r.length;t+=1)r[t].c();e=p()},m(t,n){for(let e=0;e<r.length;e+=1)r[e].m(t,n);l(t,e,n)},p(t,[n]){if(3&n){let c;for(o=t[0],c=0;c<o.length;c+=1){const u=Z(t,o,c);r[c]?r[c].p(u,n):(r[c]=et(u),r[c].c(),r[c].m(e.parentNode,e))}for(;c<r.length;c+=1)r[c].d(1);r.length=o.length}},i:t,o:t,d(t){!function(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}(r,t),t&&f(e)}}}function rt(t,n,e){let o,r;return u(t,R,(t=>e(0,o=t))),u(t,U,(t=>e(1,r=t))),[o,r,function(t,n){t[n].score=this.value,R.set(o)}]}class ct extends D{constructor(t){super(),M(this,t,rt,ot,c,{})}}function ut(n){let e,o,r,c;return e=new Y({}),r=new ct({}),{c(){T(e.$$.fragment),o=h(),T(r.$$.fragment)},m(t,n){q(e,t,n),l(t,o,n),q(r,t,n),c=!0},p:t,i(t){c||(P(e.$$.fragment,t),P(r.$$.fragment,t),c=!0)},o(t){S(e.$$.fragment,t),S(r.$$.fragment,t),c=!1},d(t){B(e,t),t&&f(o),B(r,t)}}}function st(n){let e,r,c,u,s;return{c(){e=a("input"),r=h(),c=a("button"),c.textContent="done",$(e,"class","large"),$(e,"placeholder","enter your name"),$(c,"class","large")},m(t,o){l(t,e,o),b(e,n[1]),l(t,r,o),l(t,c,o),u||(s=[m(e,"input",n[4]),m(c,"click",n[5])],u=!0)},p(t,n){2&n&&e.value!==t[1]&&b(e,t[1])},i:t,o:t,d(t){t&&f(e),t&&f(r),t&&f(c),u=!1,o(s)}}}function it(n){let e,r,c,u,s,i,h;return{c(){e=d("will you be the\n    "),r=a("button"),r.textContent="host",c=d("\n    or a\n    "),u=a("button"),u.textContent="contestant",s=d("?"),$(r,"class","small"),$(u,"class","small")},m(t,o){l(t,e,o),l(t,r,o),l(t,c,o),l(t,u,o),l(t,s,o),i||(h=[m(r,"click",n[2]),m(u,"click",n[3])],i=!0)},p:t,i:t,o:t,d(t){t&&f(e),t&&f(r),t&&f(c),t&&f(u),t&&f(s),i=!1,o(h)}}}function lt(t){let n,e,r,c;const u=[it,st,ut],s=[];function i(t,n){return 0===t[0]?0:1===t[0]?1:2}return n=i(t),e=s[n]=u[n](t),{c(){e.c(),r=p()},m(t,e){s[n].m(t,e),l(t,r,e),c=!0},p(t,[c]){let l=n;n=i(t),n===l?s[n].p(t,c):(L={r:0,c:[],p:L},S(s[l],1,1,(()=>{s[l]=null})),L.r||o(L.c),L=L.p,e=s[n],e?e.p(t,c):(e=s[n]=u[n](t),e.c()),P(e,1),e.m(r.parentNode,r))},i(t){c||(P(e),c=!0)},o(t){S(e),c=!1},d(t){s[n].d(t),t&&f(r)}}}function ft(t,n,e){let o,r,c,i;u(t,Q,(t=>e(6,o=t))),u(t,R,(t=>e(7,r=t))),u(t,U,(t=>e(0,c=t))),u(t,V,(t=>e(1,i=t)));var l=this&&this.__awaiter||function(t,n,e,o){return new(e||(e=Promise))((function(r,c){function u(t){try{i(o.next(t))}catch(t){c(t)}}function s(t){try{i(o.throw(t))}catch(t){c(t)}}function i(t){var n;t.done?r(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(u,s)}i((o=o.apply(t,n||[])).next())}))};function f(t){return l(this,void 0,void 0,(function*(){const n=yield fetch(t),e=yield n.json();if(n.ok)return e;throw new Error("couldn't reach server")}))}setInterval((function(){f("/state/buzzer").then((t=>s(Q,o=t,o))),f("/state/scores").then((t=>s(R,r=t,r)))}),2e3);return[c,i,()=>s(U,c=2,c),()=>s(U,c=1,c),function(){i=this.value,V.set(i)},()=>s(U,c=3,c)]}return new class extends D{constructor(t){super(),M(this,t,ft,lt,c,{})}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map