var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function r(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function u(e,n,o){e.$$.on_destroy.push(function(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}(n,o))}function s(t,e,n=e){return t.set(n),e}function l(t,e){t.appendChild(e)}function i(t,e,n){t.insertBefore(e,n||null)}function a(t){t.parentNode.removeChild(t)}function d(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function f(t){return document.createElement(t)}function m(t){return document.createTextNode(t)}function h(){return m(" ")}function p(){return m("")}function g(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function $(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function b(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function y(t,e){t.value=null==e?"":e}function v(t,e,n,o){t.style.setProperty(e,n,o?"important":"")}function k(t,e){for(let n=0;n<t.options.length;n+=1){const o=t.options[n];if(o.__value===e)return void(o.selected=!0)}}function w(t){const e=t.querySelector(":checked")||t.options[0];return e&&e.__value}let x;function z(t){x=t}const _=[],S=[],N=[],C=[],E=Promise.resolve();let O=!1;function T(t){N.push(t)}let L=!1;const M=new Set;function K(){if(!L){L=!0;do{for(let t=0;t<_.length;t+=1){const e=_[t];z(e),B(e.$$)}for(z(null),_.length=0;S.length;)S.pop()();for(let t=0;t<N.length;t+=1){const e=N[t];M.has(e)||(M.add(e),e())}N.length=0}while(_.length);for(;C.length;)C.pop()();O=!1,L=!1,M.clear()}}function B(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(T)}}const P=new Set;let q;function A(){q={r:0,c:[],p:q}}function j(){q.r||o(q.c),q=q.p}function H(t,e){t&&t.i&&(P.delete(t),t.i(e))}function R(t,e,n,o){if(t&&t.o){if(P.has(t))return;P.add(t),q.c.push((()=>{P.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}function I(t,e){R(t,1,1,(()=>{e.delete(t.key)}))}function J(t){t&&t.c()}function D(t,n,c){const{fragment:u,on_mount:s,on_destroy:l,after_update:i}=t.$$;u&&u.m(n,c),T((()=>{const n=s.map(e).filter(r);l?l.push(...n):o(n),t.$$.on_mount=[]})),i.forEach(T)}function F(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function G(t,e){-1===t.$$.dirty[0]&&(_.push(t),O||(O=!0,E.then(K)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Q(e,r,c,u,s,l,i=[-1]){const d=x;z(e);const f=r.props||{},m=e.$$={fragment:null,ctx:null,props:l,update:t,not_equal:s,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(d?d.$$.context:[]),callbacks:n(),dirty:i,skip_bound:!1};let h=!1;if(m.ctx=c?c(e,f,((t,n,...o)=>{const r=o.length?o[0]:n;return m.ctx&&s(m.ctx[t],m.ctx[t]=r)&&(!m.skip_bound&&m.bound[t]&&m.bound[t](r),h&&G(e,t)),n})):[],m.update(),h=!0,o(m.before_update),m.fragment=!!u&&u(m.ctx),r.target){if(r.hydrate){const t=function(t){return Array.from(t.childNodes)}(r.target);m.fragment&&m.fragment.l(t),t.forEach(a)}else m.fragment&&m.fragment.c();r.intro&&H(e.$$.fragment),D(e,r.target,r.anchor),K()}z(d)}class U{$destroy(){F(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const V=[];function W(e,n=t){let o;const r=[];function u(t){if(c(e,t)&&(e=t,o)){const t=!V.length;for(let t=0;t<r.length;t+=1){const n=r[t];n[1](),V.push(n,e)}if(t){for(let t=0;t<V.length;t+=2)V[t][0](V[t+1]);V.length=0}}}return{set:u,update:function(t){u(t(e))},subscribe:function(c,s=t){const l=[c,s];return r.push(l),1===r.length&&(o=n(u)||t),c(e),()=>{const t=r.indexOf(l);-1!==t&&r.splice(t,1),0===r.length&&(o(),o=null)}}}}const X=W([{name:"",blocked:!1,buzzKey:"Space"}]),Y=W({state:"Closed",owner:null}),Z=W(""),tt=W(!1),et=W(!0),nt=W([]),ot=W(200),rt=W(!1);async function ct(t){let e=await fetch(t);return await e.json()}function ut(t,e){fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}function st(t){fetch("/buzz",{method:"POST",headers:{"Content-Type":"text/plain"},body:t})}const lt=[{code:"Space",name:"Space"},{code:"NumpadEnter",name:"Numpad Enter"},{code:"Numpad0",name:"Numpad 0"},{code:"ShiftRight",name:"Right Shift"},{code:"Enter",name:"Enter"},{code:"ShiftLeft",name:"Left Shift"}];function it(t,e,n){const o=t.slice();return o[2]=e[n],o}function at(e){let n,o,r=e[2].name+"";return{c(){n=f("option"),o=m(r),n.__value=e[2].code,n.value=n.__value},m(t,e){i(t,n,e),l(n,o)},p:t,d(t){t&&a(n)}}}function dt(e){let n,o,r,c=lt,u=[];for(let t=0;t<c.length;t+=1)u[t]=at(it(e,c,t));return{c(){n=f("select");for(let t=0;t<u.length;t+=1)u[t].c();void 0===e[0].buzzKey&&T((()=>e[1].call(n)))},m(t,c){i(t,n,c);for(let t=0;t<u.length;t+=1)u[t].m(n,null);k(n,e[0].buzzKey),o||(r=g(n,"change",e[1]),o=!0)},p(t,[e]){if(0&e){let o;for(c=lt,o=0;o<c.length;o+=1){const r=it(t,c,o);u[o]?u[o].p(r,e):(u[o]=at(r),u[o].c(),u[o].m(n,null))}for(;o<u.length;o+=1)u[o].d(1);u.length=c.length}1&e&&k(n,t[0].buzzKey)},i:t,o:t,d(t){t&&a(n),d(u,t),o=!1,r()}}}function ft(t,e,n){let{contestant:o}=e;return document.addEventListener("keydown",(function(t){t.code!==o.buzzKey||o.blocked||st(o.name)})),t.$$set=t=>{"contestant"in t&&n(0,o=t.contestant)},[o,function(){o.buzzKey=w(this),n(0,o)}]}class mt extends U{constructor(t){super(),Q(this,t,ft,dt,c,{contestant:0})}}function ht(t,e,n){const o=t.slice();return o[4]=e[n],o[5]=e,o[6]=n,o}function pt(t){let e,n,o,r;return{c(){e=f("hr"),n=h(),o=f("span"),o.textContent="buzz keys (click to change)",r=f("br"),$(o,"class","header")},m(t,c){i(t,e,c),i(t,n,c),i(t,o,c),i(t,r,c)},d(t){t&&a(e),t&&a(n),t&&a(o),t&&a(r)}}}function gt(t){let e,n,o,r,c,u,s=t[4].name+"";function l(e){t[3].call(null,e,t[4],t[5],t[6])}let d={};return void 0!==t[4]&&(d.contestant=t[4]),o=new mt({props:d}),S.push((()=>function(t,e,n){const o=t.$$.props[e];void 0!==o&&(t.$$.bound[o]=n,n(t.$$.ctx[o]))}(o,"contestant",l))),{c(){e=m(s),n=m(":\n    "),J(o.$$.fragment),c=f("br")},m(t,r){i(t,e,r),i(t,n,r),D(o,t,r),i(t,c,r),u=!0},p(n,c){t=n,(!u||1&c)&&s!==(s=t[4].name+"")&&b(e,s);const l={};var i;!r&&1&c&&(r=!0,l.contestant=t[4],i=()=>r=!1,C.push(i)),o.$set(l)},i(t){u||(H(o.$$.fragment,t),u=!0)},o(t){R(o.$$.fragment,t),u=!1},d(t){t&&a(e),t&&a(n),F(o,t),t&&a(c)}}}function $t(t){let e,n;return{c(){e=f("strong"),e.textContent="some players have the same buzz key\n    ",n=f("br"),v(e,"color","#ebcb8b")},m(t,o){i(t,e,o),i(t,n,o)},d(t){t&&a(e),t&&a(n)}}}function bt(t){let e,n,o,r,c=0!==t[0].length&&pt(),u=t[0],s=[];for(let e=0;e<u.length;e+=1)s[e]=gt(ht(t,u,e));const l=t=>R(s[t],1,1,(()=>{s[t]=null}));let f=t[1]&&$t();return{c(){c&&c.c(),e=h();for(let t=0;t<s.length;t+=1)s[t].c();n=h(),f&&f.c(),o=p()},m(t,u){c&&c.m(t,u),i(t,e,u);for(let e=0;e<s.length;e+=1)s[e].m(t,u);i(t,n,u),f&&f.m(t,u),i(t,o,u),r=!0},p(t,[r]){if(0!==t[0].length?c||(c=pt(),c.c(),c.m(e.parentNode,e)):c&&(c.d(1),c=null),1&r){let e;for(u=t[0],e=0;e<u.length;e+=1){const o=ht(t,u,e);s[e]?(s[e].p(o,r),H(s[e],1)):(s[e]=gt(o),s[e].c(),H(s[e],1),s[e].m(n.parentNode,n))}for(A(),e=u.length;e<s.length;e+=1)l(e);j()}t[1]?f||(f=$t(),f.c(),f.m(o.parentNode,o)):f&&(f.d(1),f=null)},i(t){if(!r){for(let t=0;t<u.length;t+=1)H(s[t]);r=!0}},o(t){s=s.filter(Boolean);for(let t=0;t<s.length;t+=1)R(s[t]);r=!1},d(t){c&&c.d(t),t&&a(e),d(s,t),t&&a(n),f&&f.d(t),t&&a(o)}}}function yt(t,e,n){let o,r,c;return u(t,X,(t=>n(0,c=t))),t.$$.update=()=>{1&t.$$.dirty&&n(2,o=c.map((t=>t.buzzKey))),4&t.$$.dirty&&n(1,r=o.length!==new Set(o).size)},[c,r,o,function(t,e,n,o){n[o]=t,X.set(c)}]}class vt extends U{constructor(t){super(),Q(this,t,yt,bt,c,{})}}function kt(t,e,n){const o=t.slice();return o[6]=e[n],o}function wt(t){let e,n=t[1],o=[];for(let e=0;e<n.length;e+=1)o[e]=zt(kt(t,n,e));return{c(){for(let t=0;t<o.length;t+=1)o[t].c();e=p()},m(t,n){for(let e=0;e<o.length;e+=1)o[e].m(t,n);i(t,e,n)},p(t,r){if(2&r){let c;for(n=t[1],c=0;c<n.length;c+=1){const u=kt(t,n,c);o[c]?o[c].p(u,r):(o[c]=zt(u),o[c].c(),o[c].m(e.parentNode,e))}for(;c<o.length;c+=1)o[c].d(1);o.length=n.length}},d(t){d(o,t),t&&a(e)}}}function xt(t){let e,n,o,r,c=t[6].name+"";return{c(){e=f("div"),n=f("strong"),o=m(c),r=m("\n                    has already buzzed in\n                "),v(n,"color","#ebcb8b"),v(e,"color","#ebcb8b")},m(t,c){i(t,e,c),l(e,n),l(n,o),l(e,r)},p(t,e){2&e&&c!==(c=t[6].name+"")&&b(o,c)},d(t){t&&a(e)}}}function zt(t){let e,n=t[6].blocked&&xt(t);return{c(){n&&n.c(),e=p()},m(t,o){n&&n.m(t,o),i(t,e,o)},p(t,o){t[6].blocked?n?n.p(t,o):(n=xt(t),n.c(),n.m(e.parentNode,e)):n&&(n.d(1),n=null)},d(t){n&&n.d(t),t&&a(e)}}}function _t(e){let n,o,r,c,u,s,d,p,y,v,k="Open"===e[0].state&&wt(e);return{c(){n=f("span"),o=f("div"),c=h(),u=f("div"),s=m(e[3]),p=h(),k&&k.c(),$(o,"id","topbar"),$(o,"style",r=`background-color:#${e[2]}`),$(o,"class","svelte-ygcg7q"),$(u,"id","state"),$(u,"style",d=`color:#${e[2]}`),$(u,"class","svelte-ygcg7q"),$(n,"id","buzzer-container"),$(n,"class","svelte-ygcg7q")},m(t,r){i(t,n,r),l(n,o),l(n,c),l(n,u),l(u,s),l(n,p),k&&k.m(n,null),y||(v=g(n,"click",e[4]),y=!0)},p(t,[e]){4&e&&r!==(r=`background-color:#${t[2]}`)&&$(o,"style",r),8&e&&b(s,t[3]),4&e&&d!==(d=`color:#${t[2]}`)&&$(u,"style",d),"Open"===t[0].state?k?k.p(t,e):(k=wt(t),k.c(),k.m(n,null)):k&&(k.d(1),k=null)},i:t,o:t,d(t){t&&a(n),k&&k.d(),y=!1,v()}}}function St(t,e,n){let o,r,c,s,l;return u(t,tt,(t=>n(5,o=t))),u(t,Y,(t=>n(0,r=t))),u(t,X,(t=>n(1,c=t))),t.$$.update=()=>{35&t.$$.dirty&&(o?(n(2,s="d08770"),n(3,l="couldn't reach server")):"Closed"==r.state?(n(2,s="bf616a"),n(3,l="the buzzer is closed")):"Open"==r.state?(n(2,s=c.every((t=>t.blocked))?"ebcb8b":"a3be8c"),n(3,l="the buzzer is open")):"TakenBy"==r.state&&(n(2,s=c.some((t=>t.name===r.owner))?"88c0d0":"bf616a"),n(3,l=`${r.owner} has buzzed in`)))},[r,c,s,l,function(t){let e=c[0];"Open"!=r.state||e.blocked||st(e.name)},o]}class Nt extends U{constructor(t){super(),Q(this,t,St,_t,c,{})}}function Ct(t){let e,n;return{c(){e=m(t[1]),n=h()},m(t,o){i(t,e,o),i(t,n,o)},p(t,n){2&n&&b(e,t[1])},d(t){t&&a(e),t&&a(n)}}}function Et(t){let e,n,r,c,u,s;return{c(){e=f("input"),n=h(),r=f("button"),r.textContent="🞬",c=h(),$(e,"class","hidden"),$(r,"class","hidden")},m(o,l){i(o,e,l),y(e,t[2]),i(o,n,l),i(o,r,l),i(o,c,l),u||(s=[g(e,"input",t[7]),g(e,"focusout",t[4]),g(e,"keydown",t[6]),g(r,"mousedown",t[5])],u=!0)},p(t,n){4&n&&e.value!==t[2]&&y(e,t[2])},d(t){t&&a(e),t&&a(n),t&&a(r),t&&a(c),u=!1,o(s)}}}function Ot(e){let n,o,r;function c(t,e){return t[3]?Et:Ct}let u=c(e),s=u(e);return{c(){n=m(e[0]),o=m(":\n"),s.c(),r=f("br")},m(t,e){i(t,n,e),i(t,o,e),s.m(t,e),i(t,r,e)},p(t,[e]){1&e&&b(n,t[0]),u===(u=c(t))&&s?s.p(t,e):(s.d(1),s=u(t),s&&(s.c(),s.m(r.parentNode,r)))},i:t,o:t,d(t){t&&a(n),t&&a(o),s.d(t),t&&a(r)}}}function Tt(t,e,n){let o,r,c;u(t,nt,(t=>n(8,r=t))),u(t,rt,(t=>n(3,c=t)));let{thisName:l}=e,{thisScore:i}=e;function a(){ut("/command",{action:"SetScore",name:l,score:parseInt(o)})}return t.$$set=t=>{"thisName"in t&&n(0,l=t.thisName),"thisScore"in t&&n(1,i=t.thisScore)},t.$$.update=()=>{2&t.$$.dirty&&n(2,o=i.toString())},[l,i,o,c,a,function(){s(nt,r=r.filter((t=>t.name!==l)),r),ut("/command",{action:"RemovePlayer",name:l})},function(t){console.trace(t.code),"Enter"==t.code&&a()},function(){o=this.value,n(2,o),n(1,i)}]}class Lt extends U{constructor(t){super(),Q(this,t,Tt,Ot,c,{thisName:0,thisScore:1})}}function Mt(t,e,n){const o=t.slice();return o[2]=e[n],o}function Kt(t){let e,n,o;return{c(){e=f("span"),e.textContent="scores",n=f("br"),o=h(),$(e,"class","header")},m(t,r){i(t,e,r),i(t,n,r),i(t,o,r)},d(t){t&&a(e),t&&a(n),t&&a(o)}}}function Bt(t){let e,n,o;return{c(){e=f("span"),e.textContent="scores (click to edit)",n=f("br"),o=h(),$(e,"class","header")},m(t,r){i(t,e,r),i(t,n,r),i(t,o,r)},d(t){t&&a(e),t&&a(n),t&&a(o)}}}function Pt(t,e){let n,o,r;return o=new Lt({props:{thisName:e[2].name,thisScore:e[2].score}}),{key:t,first:null,c(){n=p(),J(o.$$.fragment),this.first=n},m(t,e){i(t,n,e),D(o,t,e),r=!0},p(t,n){e=t;const r={};2&n&&(r.thisName=e[2].name),2&n&&(r.thisScore=e[2].score),o.$set(r)},i(t){r||(H(o.$$.fragment,t),r=!0)},o(t){R(o.$$.fragment,t),r=!1},d(t){t&&a(n),F(o,t)}}}function qt(t){let e,n,o,r,c,u,s=[],l=new Map;function d(t,e){return t[0]?Bt:Kt}let m=d(t),p=m(t),g=t[1];const $=t=>t[2].name;for(let e=0;e<g.length;e+=1){let n=Mt(t,g,e),o=$(n);l.set(o,s[e]=Pt(o,n))}return{c(){e=f("hr"),n=h(),p.c(),o=f("br"),r=h(),c=f("div");for(let t=0;t<s.length;t+=1)s[t].c();v(c,"text-align","right"),v(c,"display","inline-block")},m(t,l){i(t,e,l),i(t,n,l),p.m(t,l),i(t,o,l),i(t,r,l),i(t,c,l);for(let t=0;t<s.length;t+=1)s[t].m(c,null);u=!0},p(t,[e]){m!==(m=d(t))&&(p.d(1),p=m(t),p&&(p.c(),p.m(o.parentNode,o))),2&e&&(g=t[1],A(),s=function(t,e,n,o,r,c,u,s,l,i,a,d){let f=t.length,m=c.length,h=f;const p={};for(;h--;)p[t[h].key]=h;const g=[],$=new Map,b=new Map;for(h=m;h--;){const t=d(r,c,h),s=n(t);let l=u.get(s);l?o&&l.p(t,e):(l=i(s,t),l.c()),$.set(s,g[h]=l),s in p&&b.set(s,Math.abs(h-p[s]))}const y=new Set,v=new Set;function k(t){H(t,1),t.m(s,a),u.set(t.key,t),a=t.first,m--}for(;f&&m;){const e=g[m-1],n=t[f-1],o=e.key,r=n.key;e===n?(a=e.first,f--,m--):$.has(r)?!u.has(o)||y.has(o)?k(e):v.has(r)?f--:b.get(o)>b.get(r)?(v.add(o),k(e)):(y.add(r),f--):(l(n,u),f--)}for(;f--;){const e=t[f];$.has(e.key)||l(e,u)}for(;m;)k(g[m-1]);return g}(s,e,$,1,t,g,l,c,I,Pt,null,Mt),j())},i(t){if(!u){for(let t=0;t<g.length;t+=1)H(s[t]);u=!0}},o(t){for(let t=0;t<s.length;t+=1)R(s[t]);u=!1},d(t){t&&a(e),t&&a(n),p.d(t),t&&a(o),t&&a(r),t&&a(c);for(let t=0;t<s.length;t+=1)s[t].d()}}}function At(t,e,n){let o,r;return u(t,rt,(t=>n(0,o=t))),u(t,nt,(t=>n(1,r=t))),[o,r]}class jt extends U{constructor(t){super(),Q(this,t,At,qt,c,{})}}function Ht(t,e,n){const o=t.slice();return o[18]=e[n],o}function Rt(t){let e,n,r,c,u,s,d,p,$,y,v=t[4].owner+"";return{c(){e=m("is "),n=f("strong"),r=m(v),c=h(),u=f("button"),u.innerHTML="<u>c</u>orrect",s=m(" or\n    "),d=f("button"),d.innerHTML="<u>i</u>ncorrect",p=m("?")},m(o,a){i(o,e,a),i(o,n,a),l(n,r),i(o,c,a),i(o,u,a),i(o,s,a),i(o,d,a),i(o,p,a),$||(y=[g(u,"mousedown",t[9]),g(d,"mousedown",t[10])],$=!0)},p(t,e){16&e&&v!==(v=t[4].owner+"")&&b(r,v)},d(t){t&&a(e),t&&a(n),t&&a(c),t&&a(u),t&&a(s),t&&a(d),t&&a(p),$=!1,o(y)}}}function It(t){let e,n,r,c,u,s,p,y,v,w,x,z,_,S,N,C,E,O,L,M,K,B,P,q,A=t[0]?"☑":"☐",j=t[5],H=[];for(let e=0;e<j.length;e+=1)H[e]=Dt(Ht(t,j,e));return{c(){e=m("points worth:\n    "),n=f("select");for(let t=0;t<H.length;t+=1)H[t].c();r=h(),c=f("button"),u=f("u"),u.textContent="+",p=h(),y=f("button"),v=f("u"),v.textContent="-",x=h(),z=f("br"),_=h(),S=f("button"),N=m(A),C=h(),E=f("u"),E.textContent="d",O=m("ouble Jeopardy!"),L=h(),M=f("br"),K=h(),B=f("button"),B.innerHTML="<u>o</u>pen buzzer",$(n,"type","number"),void 0===t[1]&&T((()=>t[14].call(n))),c.disabled=s=!t[3],y.disabled=w=!t[2],$(B,"class","large")},m(o,s){i(o,e,s),i(o,n,s);for(let t=0;t<H.length;t+=1)H[t].m(n,null);k(n,t[1]),i(o,r,s),i(o,c,s),l(c,u),i(o,p,s),i(o,y,s),l(y,v),i(o,x,s),i(o,z,s),i(o,_,s),i(o,S,s),l(S,N),l(S,C),l(S,E),l(S,O),i(o,L,s),i(o,M,s),i(o,K,s),i(o,B,s),P||(q=[g(n,"change",t[14]),g(c,"mousedown",t[6]),g(y,"mousedown",t[7]),g(S,"mousedown",t[15]),g(B,"mousedown",t[10])],P=!0)},p(t,e){if(32&e){let o;for(j=t[5],o=0;o<j.length;o+=1){const r=Ht(t,j,o);H[o]?H[o].p(r,e):(H[o]=Dt(r),H[o].c(),H[o].m(n,null))}for(;o<H.length;o+=1)H[o].d(1);H.length=j.length}34&e&&k(n,t[1]),8&e&&s!==(s=!t[3])&&(c.disabled=s),4&e&&w!==(w=!t[2])&&(y.disabled=w),1&e&&A!==(A=t[0]?"☑":"☐")&&b(N,A)},d(t){t&&a(e),t&&a(n),d(H,t),t&&a(r),t&&a(c),t&&a(p),t&&a(y),t&&a(x),t&&a(z),t&&a(_),t&&a(S),t&&a(L),t&&a(M),t&&a(K),t&&a(B),P=!1,o(q)}}}function Jt(e){let n,o,r;return{c(){n=f("button"),n.innerHTML="<u>e</u>nd round early",$(n,"class","large")},m(t,c){i(t,n,c),o||(r=g(n,"mousedown",e[8]),o=!0)},p:t,d(t){t&&a(n),o=!1,r()}}}function Dt(e){let n,o,r=e[18]+"";return{c(){n=f("option"),o=m(r),n.__value=e[18],n.value=n.__value},m(t,e){i(t,n,e),l(n,o)},p:t,d(t){t&&a(n)}}}function Ft(e){let n,o,r,c,u,s;function l(t,e){return"Open"===t[4].state?Jt:"Closed"===t[4].state?It:"TakenBy"===t[4].state?Rt:void 0}let d=l(e),m=d&&d(e);return{c(){n=f("hr"),o=h(),r=f("span"),r.textContent="host commands",c=f("br"),u=h(),m&&m.c(),s=p(),$(r,"class","header")},m(t,e){i(t,n,e),i(t,o,e),i(t,r,e),i(t,c,e),i(t,u,e),m&&m.m(t,e),i(t,s,e)},p(t,[e]){d===(d=l(t))&&m?m.p(t,e):(m&&m.d(1),m=d&&d(t),m&&(m.c(),m.m(s.parentNode,s)))},i:t,o:t,d(t){t&&a(n),t&&a(o),t&&a(r),t&&a(c),t&&a(u),m&&m.d(t),t&&a(s)}}}function Gt(t,e,n){let o,r,c,l,i;u(t,ot,(t=>n(1,l=t))),u(t,Y,(t=>n(4,i=t)));const a=[200,400,600,800,1e3,1200,1600,2e3],d=[1,3,5,6,7],f=[0,1,2,3,4];let m=0,h=0,p=!1;function g(){p?n(11,m=(m+1)%5):n(12,h=(h+1)%5)}function $(){p?n(11,m-=1):n(12,h-=1)}function b(){ut("/command",{action:"EndRound"}),g()}function y(){ut("/command",{action:"AddScore",name:i.owner,score:l}),b()}function v(){ut("/command",{action:"OpenBuzzer"})}document.addEventListener("keydown",(function(t){"Open"===i.state&&"e"===t.key?b():"Closed"===i.state&&"o"===t.key?v():"TakenBy"===i.state&&"c"===t.key?y():"TakenBy"===i.state&&"i"===t.key?v():"d"===t.key?n(0,p=!p):c&&"+"===t.key?g():r&&"-"===t.key&&$()}));return t.$$.update=()=>{6145&t.$$.dirty&&n(13,o=p?d[m]:f[h]),8192&t.$$.dirty&&s(ot,l=a[o],l),6145&t.$$.dirty&&n(2,r=p?m>0:h>0),6145&t.$$.dirty&&n(3,c=p?m<4:h<4)},[p,l,r,c,i,a,g,$,b,y,v,m,h,o,function(){l=w(this),ot.set(l),n(5,a)},()=>n(0,p=!p)]}class Qt extends U{constructor(t){super(),Q(this,t,Gt,Ft,c,{})}}function Ut(t,e,n){const o=t.slice();return o[10]=e[n],o[11]=e,o[12]=n,o}function Vt(t){let e,n,o,r,c;function u(){t[7].call(e,t[11],t[12])}return{c(){e=f("input"),n=h(),o=f("br"),$(e,"placeholder","enter your name")},m(s,l){i(s,e,l),y(e,t[10].name),i(s,n,l),i(s,o,l),r||(c=g(e,"input",u),r=!0)},p(n,o){t=n,1&o&&e.value!==t[10].name&&y(e,t[10].name)},d(t){t&&a(e),t&&a(n),t&&a(o),r=!1,c()}}}function Wt(t){let e,n;return{c(){e=f("br"),n=f("strong"),n.textContent="some of these names are taken",$(n,"id","dup"),$(n,"class","svelte-1ge8e94")},m(t,o){i(t,e,o),i(t,n,o)},d(t){t&&a(e),t&&a(n)}}}function Xt(e){let n,r,c,u,s,p,y,k,w,x,z,_,S,N,C,E,O,T,L,M,K,B,P,q,A,j,H,R,I,J=e[2]?"☑":"☐",D=e[0],F=[];for(let t=0;t<D.length;t+=1)F[t]=Vt(Ut(e,D,t));let G=e[1]&&Wt();return{c(){n=m("contestant(s), enter your name(s)"),r=f("br"),c=h(),u=f("strong"),u.textContent="hosts do not need to enter their names",s=h(),p=f("hr"),y=h();for(let t=0;t<F.length;t+=1)F[t].c();k=h(),w=f("button"),w.textContent="add contestant",x=h(),z=f("button"),_=m("remove contestant"),N=h(),G&&G.c(),C=h(),E=f("hr"),O=m("\ndoes this device need host access?"),T=f("br"),L=h(),M=f("button"),K=m(J),B=m("\n    host access"),P=h(),q=f("hr"),A=h(),j=f("button"),H=m("play"),v(u,"color","#88c0d0"),z.disabled=S=0===e[0].length,$(j,"class","large"),j.disabled=e[1]},m(t,o){i(t,n,o),i(t,r,o),i(t,c,o),i(t,u,o),i(t,s,o),i(t,p,o),i(t,y,o);for(let e=0;e<F.length;e+=1)F[e].m(t,o);i(t,k,o),i(t,w,o),i(t,x,o),i(t,z,o),l(z,_),i(t,N,o),G&&G.m(t,o),i(t,C,o),i(t,E,o),i(t,O,o),i(t,T,o),i(t,L,o),i(t,M,o),l(M,K),l(M,B),i(t,P,o),i(t,q,o),i(t,A,o),i(t,j,o),l(j,H),R||(I=[g(w,"mousedown",e[3]),g(z,"mousedown",e[4]),g(M,"mousedown",e[8]),g(j,"mousedown",e[5])],R=!0)},p(t,[e]){if(1&e){let n;for(D=t[0],n=0;n<D.length;n+=1){const o=Ut(t,D,n);F[n]?F[n].p(o,e):(F[n]=Vt(o),F[n].c(),F[n].m(k.parentNode,k))}for(;n<F.length;n+=1)F[n].d(1);F.length=D.length}1&e&&S!==(S=0===t[0].length)&&(z.disabled=S),t[1]?G||(G=Wt(),G.c(),G.m(C.parentNode,C)):G&&(G.d(1),G=null),4&e&&J!==(J=t[2]?"☑":"☐")&&b(K,J),2&e&&(j.disabled=t[1])},i:t,o:t,d(t){t&&a(n),t&&a(r),t&&a(c),t&&a(u),t&&a(s),t&&a(p),t&&a(y),d(F,t),t&&a(k),t&&a(w),t&&a(x),t&&a(z),t&&a(N),G&&G.d(t),t&&a(C),t&&a(E),t&&a(O),t&&a(T),t&&a(L),t&&a(M),t&&a(P),t&&a(q),t&&a(A),t&&a(j),R=!1,o(I)}}}function Yt(t,e,n){let o,r,c,l,i;u(t,X,(t=>n(0,r=t))),u(t,et,(t=>n(9,c=t))),u(t,nt,(t=>n(6,l=t))),u(t,rt,(t=>n(2,i=t)));return t.$$.update=()=>{65&t.$$.dirty&&n(1,o=r.some((t=>l.some((e=>e.name===t.name)))))},[r,o,i,function(){s(X,r=[...r,{name:"",blocked:!1,buzzKey:"Space"}],r)},function(){r.pop(),X.set(r)},function(){s(X,r=r.filter((t=>!!t.name)),r),r.map((t=>ut("/command",{action:"AddPlayer",name:t.name}))),s(et,c=!1,c)},l,function(t,e){t[e].name=this.value,X.set(r)},()=>s(rt,i=!i,i)]}class Zt extends U{constructor(t){super(),Q(this,t,Yt,Xt,c,{})}}function te(t){let e,n,o,r,c,u,s;e=new Nt({}),o=new vt({});let l=t[1]&&ne();return u=new jt({}),{c(){J(e.$$.fragment),n=h(),J(o.$$.fragment),r=h(),l&&l.c(),c=h(),J(u.$$.fragment)},m(t,a){D(e,t,a),i(t,n,a),D(o,t,a),i(t,r,a),l&&l.m(t,a),i(t,c,a),D(u,t,a),s=!0},p(t,e){t[1]?l?2&e&&H(l,1):(l=ne(),l.c(),H(l,1),l.m(c.parentNode,c)):l&&(A(),R(l,1,1,(()=>{l=null})),j())},i(t){s||(H(e.$$.fragment,t),H(o.$$.fragment,t),H(l),H(u.$$.fragment,t),s=!0)},o(t){R(e.$$.fragment,t),R(o.$$.fragment,t),R(l),R(u.$$.fragment,t),s=!1},d(t){F(e,t),t&&a(n),F(o,t),t&&a(r),l&&l.d(t),t&&a(c),F(u,t)}}}function ee(e){let n,o;return n=new Zt({}),{c(){J(n.$$.fragment)},m(t,e){D(n,t,e),o=!0},p:t,i(t){o||(H(n.$$.fragment,t),o=!0)},o(t){R(n.$$.fragment,t),o=!1},d(t){F(n,t)}}}function ne(t){let e,n;return e=new Qt({}),{c(){J(e.$$.fragment)},m(t,o){D(e,t,o),n=!0},i(t){n||(H(e.$$.fragment,t),n=!0)},o(t){R(e.$$.fragment,t),n=!1},d(t){F(e,t)}}}function oe(t){let e,n,o,r,c;const u=[ee,te],s=[];function l(t,e){return t[0]?0:1}return e=l(t),n=s[e]=u[e](t),{c(){n.c(),o=h(),r=f("div"),r.textContent="v1.0.0",$(r,"id","footer"),$(r,"class","svelte-zc7rqv")},m(t,n){s[e].m(t,n),i(t,o,n),i(t,r,n),c=!0},p(t,[r]){let c=e;e=l(t),e===c?s[e].p(t,r):(A(),R(s[c],1,1,(()=>{s[c]=null})),j(),n=s[e],n?n.p(t,r):(n=s[e]=u[e](t),n.c()),H(n,1),n.m(o.parentNode,o))},i(t){c||(H(n),c=!0)},o(t){R(n),c=!1},d(t){s[e].d(t),t&&a(o),t&&a(r)}}}function re(t,e,n){let o,r,c,l,i,a,d;u(t,Y,(t=>n(2,o=t))),u(t,X,(t=>n(3,r=t))),u(t,nt,(t=>n(4,c=t))),u(t,tt,(t=>n(5,l=t))),u(t,Z,(t=>n(6,i=t))),u(t,et,(t=>n(0,a=t))),u(t,rt,(t=>n(1,d=t)));var f=this&&this.__awaiter||function(t,e,n,o){return new(n||(n=Promise))((function(r,c){function u(t){try{l(o.next(t))}catch(t){c(t)}}function s(t){try{l(o.throw(t))}catch(t){c(t)}}function l(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(u,s)}l((o=o.apply(t,e||[])).next())}))};return setInterval((function(){return f(this,void 0,void 0,(function*(){let t;yield fetch("/marker").then((t=>t.text())).then((e=>{t=e,s(tt,l=!1,l)})).catch((t=>s(tt,l=!0,l))),t!==i&&(!function(){f(this,void 0,void 0,(function*(){let t;yield ct("/state/buzzer").then((e=>t=e)),t.state!==o.state&&(r.map((t=>{fetch(`/blocked/${t.name}`).then((t=>t.text())).then((e=>t.blocked="!"===e))})),X.set(r),s(Y,o=t,o)),yield ct("/state/scores").then((t=>s(nt,c=t,c)))}))}(),s(Z,i=t,i))}))}),50),[a,d]}return new class extends U{constructor(t){super(),Q(this,t,re,oe,c,{})}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map
