var app=function(){"use strict";function t(){}function n(t){return t()}function e(){return Object.create(null)}function o(t){t.forEach(n)}function r(t){return"function"==typeof t}function c(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function u(n,e,o){n.$$.on_destroy.push(function(n,...e){if(null==n)return t;const o=n.subscribe(...e);return o.unsubscribe?()=>o.unsubscribe():o}(e,o))}function s(t,n,e=n){return t.set(e),n}function l(t,n){t.appendChild(n)}function i(t,n,e){t.insertBefore(n,e||null)}function a(t){t.parentNode.removeChild(t)}function f(t){return document.createElement(t)}function d(t){return document.createTextNode(t)}function p(){return d(" ")}function h(){return d("")}function m(t,n,e,o){return t.addEventListener(n,e,o),()=>t.removeEventListener(n,e,o)}function $(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function g(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function b(t,n){t.value=null==n?"":n}let y;function x(t){y=t}const _=[],v=[],w=[],C=[],k=Promise.resolve();let z=!1;function N(t){w.push(t)}let O=!1;const E=new Set;function j(){if(!O){O=!0;do{for(let t=0;t<_.length;t+=1){const n=_[t];x(n),A(n.$$)}for(x(null),_.length=0;v.length;)v.pop()();for(let t=0;t<w.length;t+=1){const n=w[t];E.has(n)||(E.add(n),n())}w.length=0}while(_.length);for(;C.length;)C.pop()();z=!1,O=!1,E.clear()}}function A(t){if(null!==t.fragment){t.update(),o(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(N)}}const S=new Set;let T;function P(t,n){t&&t.i&&(S.delete(t),t.i(n))}function H(t,n,e,o){if(t&&t.o){if(S.has(t))return;S.add(t),T.c.push((()=>{S.delete(t),o&&(e&&t.d(1),o())})),t.o(n)}}function L(t){t&&t.c()}function q(t,e,c){const{fragment:u,on_mount:s,on_destroy:l,after_update:i}=t.$$;u&&u.m(e,c),N((()=>{const e=s.map(n).filter(r);l?l.push(...e):o(e),t.$$.on_mount=[]})),i.forEach(N)}function B(t,n){const e=t.$$;null!==e.fragment&&(o(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function I(t,n){-1===t.$$.dirty[0]&&(_.push(t),z||(z=!0,k.then(j)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function J(n,r,c,u,s,l,i=[-1]){const f=y;x(n);const d=r.props||{},p=n.$$={fragment:null,ctx:null,props:l,update:t,not_equal:s,bound:e(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(f?f.$$.context:[]),callbacks:e(),dirty:i,skip_bound:!1};let h=!1;if(p.ctx=c?c(n,d,((t,e,...o)=>{const r=o.length?o[0]:e;return p.ctx&&s(p.ctx[t],p.ctx[t]=r)&&(!p.skip_bound&&p.bound[t]&&p.bound[t](r),h&&I(n,t)),e})):[],p.update(),h=!0,o(p.before_update),p.fragment=!!u&&u(p.ctx),r.target){if(r.hydrate){const t=function(t){return Array.from(t.childNodes)}(r.target);p.fragment&&p.fragment.l(t),t.forEach(a)}else p.fragment&&p.fragment.c();r.intro&&P(n.$$.fragment),q(n,r.target,r.anchor),j()}x(f)}class M{$destroy(){B(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}var D;!function(t){t[t.Choose=0]="Choose",t[t.Name=1]="Name",t[t.Host=2]="Host",t[t.Contestant=3]="Contestant"}(D||(D={}));const F=[];function G(n,e=t){let o;const r=[];function u(t){if(c(n,t)&&(n=t,o)){const t=!F.length;for(let t=0;t<r.length;t+=1){const e=r[t];e[1](),F.push(e,n)}if(t){for(let t=0;t<F.length;t+=2)F[t][0](F[t+1]);F.length=0}}}return{set:u,update:function(t){u(t(n))},subscribe:function(c,s=t){const l=[c,s];return r.push(l),1===r.length&&(o=e(u)||t),c(n),()=>{const t=r.indexOf(l);-1!==t&&r.splice(t,1),0===r.length&&(o(),o=null)}}}}let K=D.Choose;const Q=G({state:"Open",owner:null}),R=G([]),U=G(K),V=G(null);async function W(t){let n=await fetch(t);return await n.json()}function X(n){let e,o,r;return{c(){e=f("div"),o=d(n[1]),$(e,"style",r=`color: #${n[0]}`)},m(t,n){i(t,e,n),l(e,o)},p(t,[n]){1&n&&r!==(r=`color: #${t[0]}`)&&$(e,"style",r)},i:t,o:t,d(t){t&&a(e)}}}function Y(t,n,e){let o,r,c;u(t,Q,(t=>e(2,o=t))),u(t,V,(t=>e(3,r=t))),u(t,U,(t=>e(4,c=t)));let[s,l]="Open"===o.state?["the buzzer is open","a3be8c"]:"Closed"===o.state?["the buzzer is closed","bf616a"]:o.owner===r?["you have buzzed in","88c0d0"]:[`${o.owner} has buzzed in`,"bf616a"];return o.state,2===c&&(l="88c0d0"),[l,s]}class Z extends M{constructor(t){super(),J(this,t,Y,X,c,{})}}function tt(t,n,e){const o=t.slice();return o[3]=n[e],o[4]=n,o[5]=e,o}function nt(t){let n,e=t[3].score+"";return{c(){n=d(e)},m(t,e){i(t,n,e)},p(t,o){1&o&&e!==(e=t[3].score+"")&&g(n,e)},d(t){t&&a(n)}}}function et(t){let n,e,o;function r(){t[2].call(n,t[4],t[5])}return{c(){n=f("input"),$(n,"class","small")},m(c,u){i(c,n,u),b(n,t[3].score),e||(o=m(n,"input",r),e=!0)},p(e,o){t=e,1&o&&n.value!==t[3].score&&b(n,t[3].score)},d(t){t&&a(n),e=!1,o()}}}function ot(t){let n,e,o,r,c=t[3].name+"";function u(t,n){return 2===t[1]?et:nt}let s=u(t),h=s(t);return{c(){n=f("div"),e=d(c),o=d(":\n        "),h.c(),r=p()},m(t,c){i(t,n,c),l(n,e),l(n,o),h.m(n,null),l(n,r)},p(t,o){1&o&&c!==(c=t[3].name+"")&&g(e,c),s===(s=u(t))&&h?h.p(t,o):(h.d(1),h=s(t),h&&(h.c(),h.m(n,r)))},d(t){t&&a(n),h.d()}}}function rt(n){let e,o=n[0],r=[];for(let t=0;t<o.length;t+=1)r[t]=ot(tt(n,o,t));return{c(){for(let t=0;t<r.length;t+=1)r[t].c();e=h()},m(t,n){for(let e=0;e<r.length;e+=1)r[e].m(t,n);i(t,e,n)},p(t,[n]){if(3&n){let c;for(o=t[0],c=0;c<o.length;c+=1){const u=tt(t,o,c);r[c]?r[c].p(u,n):(r[c]=ot(u),r[c].c(),r[c].m(e.parentNode,e))}for(;c<r.length;c+=1)r[c].d(1);r.length=o.length}},i:t,o:t,d(t){!function(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}(r,t),t&&a(e)}}}function ct(t,n,e){let o,r;return u(t,R,(t=>e(0,o=t))),u(t,U,(t=>e(1,r=t))),[o,r,function(t,n){t[n].score=this.value,R.set(o)}]}class ut extends M{constructor(t){super(),J(this,t,ct,rt,c,{})}}function st(n){let e,o,r,c;return e=new Z({}),r=new ut({}),{c(){L(e.$$.fragment),o=p(),L(r.$$.fragment)},m(t,n){q(e,t,n),i(t,o,n),q(r,t,n),c=!0},p:t,i(t){c||(P(e.$$.fragment,t),P(r.$$.fragment,t),c=!0)},o(t){H(e.$$.fragment,t),H(r.$$.fragment,t),c=!1},d(t){B(e,t),t&&a(o),B(r,t)}}}function lt(n){let e,r,c,u,s;return{c(){e=f("input"),r=p(),c=f("button"),c.textContent="done",$(e,"class","large"),$(e,"placeholder","enter your name"),$(c,"class","large")},m(t,o){i(t,e,o),b(e,n[0]),i(t,r,o),i(t,c,o),u||(s=[m(e,"input",n[5]),m(c,"click",n[2])],u=!0)},p(t,n){1&n&&e.value!==t[0]&&b(e,t[0])},i:t,o:t,d(t){t&&a(e),t&&a(r),t&&a(c),u=!1,o(s)}}}function it(n){let e,r,c,u,s,l,p;return{c(){e=d("will you be the\n    "),r=f("button"),r.textContent="host",c=d("\n    or a\n    "),u=f("button"),u.textContent="contestant",s=d("?"),$(r,"class","small"),$(u,"class","small")},m(t,o){i(t,e,o),i(t,r,o),i(t,c,o),i(t,u,o),i(t,s,o),l||(p=[m(r,"click",n[3]),m(u,"click",n[4])],l=!0)},p:t,i:t,o:t,d(t){t&&a(e),t&&a(r),t&&a(c),t&&a(u),t&&a(s),l=!1,o(p)}}}function at(t){let n,e,r,c;const u=[it,lt,st],s=[];function l(t,n){return 0===t[1]?0:1===t[1]?1:2}return n=l(t),e=s[n]=u[n](t),{c(){e.c(),r=h()},m(t,e){s[n].m(t,e),i(t,r,e),c=!0},p(t,[c]){let i=n;n=l(t),n===i?s[n].p(t,c):(T={r:0,c:[],p:T},H(s[i],1,1,(()=>{s[i]=null})),T.r||o(T.c),T=T.p,e=s[n],e?e.p(t,c):(e=s[n]=u[n](t),e.c()),P(e,1),e.m(r.parentNode,r))},i(t){c||(P(e),c=!0)},o(t){H(e),c=!1},d(t){s[n].d(t),t&&a(r)}}}function ft(t,n,e){let o,r,c,l;u(t,V,(t=>e(0,o=t))),u(t,U,(t=>e(1,r=t))),u(t,Q,(t=>e(6,c=t))),u(t,R,(t=>e(7,l=t))),setInterval((function(){W("/state/buzzer").then((t=>s(Q,c=t,c))),W("/state/scores").then((t=>s(R,l=t,l)))}),2e3);return[o,r,function(){!async function(t,n){await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})}("/command",{action:"AddPlayer",name:o}),s(U,r=3,r)},()=>s(U,r=2,r),()=>s(U,r=1,r),function(){o=this.value,V.set(o)}]}return new class extends M{constructor(t){super(),J(this,t,ft,at,c,{})}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map
