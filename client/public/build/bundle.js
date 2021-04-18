var app=function(){"use strict";function e(){}function t(e){return e()}function n(){return Object.create(null)}function o(e){e.forEach(t)}function r(e){return"function"==typeof e}function c(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function s(t,n,o){t.$$.on_destroy.push(function(t,...n){if(null==t)return e;const o=t.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}(n,o))}function l(e){return null==e?"":e}function i(e,t,n=t){return e.set(n),t}function u(e,t){e.appendChild(t)}function a(e,t,n){e.insertBefore(t,n||null)}function d(e){e.parentNode.removeChild(e)}function f(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function m(e){return document.createElement(e)}function h(e){return document.createTextNode(e)}function p(){return h(" ")}function g(){return h("")}function b(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function $(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function y(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function z(e,t){e.value=null==t?"":t}function v(e,t,n,o){e.style.setProperty(t,n,o?"important":"")}function w(e,t){for(let n=0;n<e.options.length;n+=1){const o=e.options[n];if(o.__value===t)return void(o.selected=!0)}}function k(e){const t=e.querySelector(":checked")||e.options[0];return t&&t.__value}function x(e,t,n){e.classList[n?"add":"remove"](t)}let N;function S(e){N=e}const C=[],_=[],O=[],E=[],T=Promise.resolve();let L=!1;function j(e){O.push(e)}let H=!1;const J=new Set;function B(){if(!H){H=!0;do{for(let e=0;e<C.length;e+=1){const t=C[e];S(t),M(t.$$)}for(S(null),C.length=0;_.length;)_.pop()();for(let e=0;e<O.length;e+=1){const t=O[e];J.has(t)||(J.add(t),t())}O.length=0}while(C.length);for(;E.length;)E.pop()();L=!1,H=!1,J.clear()}}function M(e){if(null!==e.fragment){e.update(),o(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(j)}}const P=new Set;let I;function K(){I={r:0,c:[],p:I}}function R(){I.r||o(I.c),I=I.p}function A(e,t){e&&e.i&&(P.delete(e),e.i(t))}function D(e,t,n,o){if(e&&e.o){if(P.has(e))return;P.add(e),I.c.push((()=>{P.delete(e),o&&(n&&e.d(1),o())})),e.o(t)}}const U="undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:global;function W(e,t){D(e,1,1,(()=>{t.delete(e.key)}))}function q(e){e&&e.c()}function F(e,n,c){const{fragment:s,on_mount:l,on_destroy:i,after_update:u}=e.$$;s&&s.m(n,c),j((()=>{const n=l.map(t).filter(r);i?i.push(...n):o(n),e.$$.on_mount=[]})),u.forEach(j)}function G(e,t){const n=e.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function Q(e,t){-1===e.$$.dirty[0]&&(C.push(e),L||(L=!0,T.then(B)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function V(t,r,c,s,l,i,u=[-1]){const a=N;S(t);const f=r.props||{},m=t.$$={fragment:null,ctx:null,props:i,update:e,not_equal:l,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(a?a.$$.context:[]),callbacks:n(),dirty:u,skip_bound:!1};let h=!1;if(m.ctx=c?c(t,f,((e,n,...o)=>{const r=o.length?o[0]:n;return m.ctx&&l(m.ctx[e],m.ctx[e]=r)&&(!m.skip_bound&&m.bound[e]&&m.bound[e](r),h&&Q(t,e)),n})):[],m.update(),h=!0,o(m.before_update),m.fragment=!!s&&s(m.ctx),r.target){if(r.hydrate){const e=function(e){return Array.from(e.childNodes)}(r.target);m.fragment&&m.fragment.l(e),e.forEach(d)}else m.fragment&&m.fragment.c();r.intro&&A(t.$$.fragment),F(t,r.target,r.anchor),B()}S(a)}class X{$destroy(){G(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const Y=[];function Z(t,n=e){let o;const r=[];function s(e){if(c(t,e)&&(t=e,o)){const e=!Y.length;for(let e=0;e<r.length;e+=1){const n=r[e];n[1](),Y.push(n,t)}if(e){for(let e=0;e<Y.length;e+=2)Y[e][0](Y[e+1]);Y.length=0}}}return{set:s,update:function(e){s(e(t))},subscribe:function(c,l=e){const i=[c,l];return r.push(i),1===r.length&&(o=n(s)||e),c(t),()=>{const e=r.indexOf(i);-1!==e&&r.splice(e,1),0===r.length&&(o(),o=null)}}}}const ee=Z([{name:"",buzzKey:"Space",added:!1}]),te=Z(!1),ne=Z(!1),oe=Z(!0),re=Z(!1),ce=Z(""),se=Z(0),le=Z(0),ie=Z({buzzer:{state:"Closed",owner:null},scores:{},history:[],ptsworth:200});function ue(e,t){return Array.from({length:t-e+1},((e,t)=>t))}const ae=new WebSocket(`ws://${window.location.host}/ws`),de=[{code:"Space",name:"Space"},{code:"NumpadEnter",name:"Numpad Enter"},{code:"ControlLeft",name:"Left Control"},{code:"Numpad0",name:"Numpad 0"},{code:"ShiftLeft",name:"Left Shift"},{code:"ShiftRight",name:"Right Shift"},{code:"Enter",name:"Enter"},{code:"ControlRight",name:"Right Control"}];function fe(e){let t,n=(e[1]<0?"":"+")+e[1];return{c(){t=h(n)},m(e,n){a(e,t,n)},p(e,o){2&o&&n!==(n=(e[1]<0?"":"+")+e[1])&&y(t,n)},d(e){e&&d(t)}}}function me(e){let t,n,r,c,s;return{c(){t=m("input"),n=p(),r=m("button"),r.textContent="🞬",$(t,"class","hidden svelte-k85431"),$(r,"class","remove svelte-k85431")},m(o,l){a(o,t,l),z(t,e[3]),a(o,n,l),a(o,r,l),c||(s=[b(t,"input",e[8]),b(t,"blur",e[5]),b(t,"keydown",e[7]),b(r,"mousedown",e[6])],c=!0)},p(e,n){8&n&&t.value!==e[3]&&z(t,e[3])},d(e){e&&d(t),e&&d(n),e&&d(r),c=!1,o(s)}}}function he(t){let n,o,r,c,s,l,i,f,b=t[2].history[t[0]].time[0].toString().padStart(2,"0")+"",z=t[2].history[t[0]].time[1].toString().padStart(2,"0")+"",v=t[2].history[t[0]].name+"";function w(e,t){return e[4]?me:fe}let k=w(t),x=k(t);return{c(){n=m("span"),o=h(b),r=h(":"),c=h(z),s=p(),l=h(v),i=p(),x.c(),f=g(),$(n,"class","time svelte-k85431")},m(e,t){a(e,n,t),u(n,o),u(n,r),u(n,c),a(e,s,t),a(e,l,t),a(e,i,t),x.m(e,t),a(e,f,t)},p(e,[t]){5&t&&b!==(b=e[2].history[e[0]].time[0].toString().padStart(2,"0")+"")&&y(o,b),5&t&&z!==(z=e[2].history[e[0]].time[1].toString().padStart(2,"0")+"")&&y(c,z),5&t&&v!==(v=e[2].history[e[0]].name+"")&&y(l,v),k===(k=w(e))&&x?x.p(e,t):(x.d(1),x=k(e),x&&(x.c(),x.m(f.parentNode,f)))},i:e,o:e,d(e){e&&d(n),e&&d(s),e&&d(l),e&&d(i),x.d(e),e&&d(f)}}}function pe(e,t,n){let o,r,c,l;s(e,ie,(e=>n(2,c=e))),s(e,te,(e=>n(4,l=e)));let{thisIndex:i}=t;function u(){ae.send(JSON.stringify({action:"EditHistory",index:i,delta:parseInt(r)}))}return e.$$set=e=>{"thisIndex"in e&&n(0,i=e.thisIndex)},e.$$.update=()=>{5&e.$$.dirty&&n(1,o=c.history[i].delta),2&e.$$.dirty&&n(3,r=(o<0?"":"+")+o.toString())},[i,o,c,r,l,u,function(){ae.send(JSON.stringify({action:"RemoveHistory",index:i}))},function(e){"Enter"===e.code&&u()},function(){r=this.value,n(3,r),n(1,o),n(2,c),n(0,i)}]}class ge extends X{constructor(e){super(),V(this,e,pe,he,c,{thisIndex:0})}}function be(e,t,n){const o=e.slice();return o[6]=t[n],o}function $e(e){let t,n;return{c(){t=m("span"),t.textContent="score history",n=m("br"),$(t,"class","header")},m(e,o){a(e,t,o),a(e,n,o)},d(e){e&&d(t),e&&d(n)}}}function ye(e){let t,n;return{c(){t=m("span"),t.textContent="score history (click to edit)",n=m("br"),$(t,"class","header")},m(e,o){a(e,t,o),a(e,n,o)},d(e){e&&d(t),e&&d(n)}}}function ze(e){let t,n,o;return t=new ge({props:{thisIndex:e[6]}}),{c(){q(t.$$.fragment),n=m("br")},m(e,r){F(t,e,r),a(e,n,r),o=!0},p(e,n){const o={};8&n&&(o.thisIndex=e[6]),t.$set(o)},i(e){o||(A(t.$$.fragment,e),o=!0)},o(e){D(t.$$.fragment,e),o=!1},d(e){G(t,e),e&&d(n)}}}function ve(e){let t,n,o=""===e[0]||e[3].history[e[6]].name.startsWith(e[0]),r=o&&ze(e);return{c(){r&&r.c(),t=g()},m(e,o){r&&r.m(e,o),a(e,t,o),n=!0},p(e,n){9&n&&(o=""===e[0]||e[3].history[e[6]].name.startsWith(e[0])),o?r?(r.p(e,n),9&n&&A(r,1)):(r=ze(e),r.c(),A(r,1),r.m(t.parentNode,t)):r&&(K(),D(r,1,1,(()=>{r=null})),R())},i(e){n||(A(r),n=!0)},o(e){D(r),n=!1},d(e){r&&r.d(e),e&&d(t)}}}function we(e){let t,n,r,c,s,l,i,u,h,g,y,w,k;function x(e,t){return e[2]?ye:$e}let N=x(e),S=N(e),C=ue(0,e[3].history.length-1),_=[];for(let t=0;t<C.length;t+=1)_[t]=ve(be(e,C,t));const O=e=>D(_[e],1,1,(()=>{_[e]=null}));return{c(){t=m("hr"),n=p(),S.c(),r=p(),c=m("button"),c.innerHTML="← <u>b</u>ack to current scores\n",s=m("br"),l=p(),i=m("input"),u=m("br"),h=p(),g=m("div");for(let e=0;e<_.length;e+=1)_[e].c();$(i,"placeholder","filter by player name"),v(g,"text-align","right"),v(g,"display","inline-block")},m(o,d){a(o,t,d),a(o,n,d),S.m(o,d),a(o,r,d),a(o,c,d),a(o,s,d),a(o,l,d),a(o,i,d),z(i,e[0]),a(o,u,d),a(o,h,d),a(o,g,d);for(let e=0;e<_.length;e+=1)_[e].m(g,null);y=!0,w||(k=[b(c,"click",e[4]),b(i,"input",e[5])],w=!0)},p(e,[t]){if(N!==(N=x(e))&&(S.d(1),S=N(e),S&&(S.c(),S.m(r.parentNode,r))),1&t&&i.value!==e[0]&&z(i,e[0]),9&t){let n;for(C=ue(0,e[3].history.length-1),n=0;n<C.length;n+=1){const o=be(e,C,n);_[n]?(_[n].p(o,t),A(_[n],1)):(_[n]=ve(o),_[n].c(),A(_[n],1),_[n].m(g,null))}for(K(),n=C.length;n<_.length;n+=1)O(n);R()}},i(e){if(!y){for(let e=0;e<C.length;e+=1)A(_[e]);y=!0}},o(e){_=_.filter(Boolean);for(let e=0;e<_.length;e+=1)D(_[e]);y=!1},d(e){e&&d(t),e&&d(n),S.d(e),e&&d(r),e&&d(c),e&&d(s),e&&d(l),e&&d(i),e&&d(u),e&&d(h),e&&d(g),f(_,e),w=!1,o(k)}}}function ke(e,t,n){let o,r,c;s(e,ne,(e=>n(1,o=e))),s(e,te,(e=>n(2,r=e))),s(e,ie,(e=>n(3,c=e)));let l="";document.addEventListener("keydown",(function(e){"b"===e.key&&"INPUT"!==document.activeElement.nodeName&&i(ne,o=!1,o)}));return[l,o,r,c,()=>i(ne,o=!1,o),function(){l=this.value,n(0,l)}]}class xe extends X{constructor(e){super(),V(this,e,ke,we,c,{})}}function Ne(e,t,n){const o=e.slice();return o[4]=t[n],o}function Se(t){let n,o,r,c=t[4].name+"";return{c(){n=m("option"),o=h(c),r=p(),n.__value=t[4].code,n.value=n.__value},m(e,t){a(e,n,t),u(n,o),u(n,r)},p:e,d(e){e&&d(n)}}}function Ce(e){let t;return{c(){t=m("option"),t.textContent="Tap/Click",t.__value="Click",t.value=t.__value},m(e,n){a(e,t,n)},d(e){e&&d(t)}}}function _e(t){let n,r,c,s,l=!t[1].some(t[2]),i=de,h=[];for(let e=0;e<i.length;e+=1)h[e]=Se(Ne(t,i,e));let p=l&&Ce();return{c(){n=m("select");for(let e=0;e<h.length;e+=1)h[e].c();r=g(),p&&p.c(),void 0===t[0].buzzKey&&j((()=>t[3].call(n)))},m(e,o){a(e,n,o);for(let e=0;e<h.length;e+=1)h[e].m(n,null);u(n,r),p&&p.m(n,null),w(n,t[0].buzzKey),c||(s=[b(n,"change",t[3]),b(n,"change",Oe)],c=!0)},p(e,[t]){if(0&t){let o;for(i=de,o=0;o<i.length;o+=1){const c=Ne(e,i,o);h[o]?h[o].p(c,t):(h[o]=Se(c),h[o].c(),h[o].m(n,r))}for(;o<h.length;o+=1)h[o].d(1);h.length=i.length}3&t&&(l=!e[1].some(e[2])),l?p||(p=Ce(),p.c(),p.m(n,null)):p&&(p.d(1),p=null),1&t&&w(n,e[0].buzzKey)},i:e,o:e,d(e){e&&d(n),f(h,e),p&&p.d(),c=!1,o(s)}}}function Oe(){document.activeElement.blur()}function Ee(e,t,n){let o;s(e,ee,(e=>n(1,o=e)));let{contestant:r}=t;return e.$$set=e=>{"contestant"in e&&n(0,r=e.contestant)},[r,o,e=>e.name!==r.name&&"Click"===e.buzzKey,function(){r.buzzKey=k(this),n(0,r)}]}class Te extends X{constructor(e){super(),V(this,e,Ee,_e,c,{contestant:0})}}function Le(e,t,n){const o=e.slice();return o[4]=t[n],o[5]=t,o[6]=n,o}function je(e){let t,n,o,r;return{c(){t=m("hr"),n=p(),o=m("span"),o.textContent="buzz keys (click to change)",r=m("br"),$(o,"class","header")},m(e,c){a(e,t,c),a(e,n,c),a(e,o,c),a(e,r,c)},d(e){e&&d(t),e&&d(n),e&&d(o),e&&d(r)}}}function He(e){let t,n,o,r,c,s,l=e[4].name+"";function i(t){e[3].call(null,t,e[4],e[5],e[6])}let u={};return void 0!==e[4]&&(u.contestant=e[4]),o=new Te({props:u}),_.push((()=>function(e,t,n){const o=e.$$.props[t];void 0!==o&&(e.$$.bound[o]=n,n(e.$$.ctx[o]))}(o,"contestant",i))),{c(){t=h(l),n=h(":\n    "),q(o.$$.fragment),c=m("br")},m(e,r){a(e,t,r),a(e,n,r),F(o,e,r),a(e,c,r),s=!0},p(n,c){e=n,(!s||1&c)&&l!==(l=e[4].name+"")&&y(t,l);const i={};var u;!r&&1&c&&(r=!0,i.contestant=e[4],u=()=>r=!1,E.push(u)),o.$set(i)},i(e){s||(A(o.$$.fragment,e),s=!0)},o(e){D(o.$$.fragment,e),s=!1},d(e){e&&d(t),e&&d(n),G(o,e),e&&d(c)}}}function Je(e){let t,n;return{c(){t=m("strong"),t.textContent="some players have the same buzz key\n    ",n=m("br"),v(t,"color","#ebcb8b")},m(e,o){a(e,t,o),a(e,n,o)},d(e){e&&d(t),e&&d(n)}}}function Be(e){let t,n,o,r,c=0!==e[0].length&&je(),s=e[0],l=[];for(let t=0;t<s.length;t+=1)l[t]=He(Le(e,s,t));const i=e=>D(l[e],1,1,(()=>{l[e]=null}));let u=e[1]&&Je();return{c(){c&&c.c(),t=p();for(let e=0;e<l.length;e+=1)l[e].c();n=p(),u&&u.c(),o=g()},m(e,s){c&&c.m(e,s),a(e,t,s);for(let t=0;t<l.length;t+=1)l[t].m(e,s);a(e,n,s),u&&u.m(e,s),a(e,o,s),r=!0},p(e,[r]){if(0!==e[0].length?c||(c=je(),c.c(),c.m(t.parentNode,t)):c&&(c.d(1),c=null),1&r){let t;for(s=e[0],t=0;t<s.length;t+=1){const o=Le(e,s,t);l[t]?(l[t].p(o,r),A(l[t],1)):(l[t]=He(o),l[t].c(),A(l[t],1),l[t].m(n.parentNode,n))}for(K(),t=s.length;t<l.length;t+=1)i(t);R()}e[1]?u||(u=Je(),u.c(),u.m(o.parentNode,o)):u&&(u.d(1),u=null)},i(e){if(!r){for(let e=0;e<s.length;e+=1)A(l[e]);r=!0}},o(e){l=l.filter(Boolean);for(let e=0;e<l.length;e+=1)D(l[e]);r=!1},d(e){c&&c.d(e),e&&d(t),f(l,e),e&&d(n),u&&u.d(e),e&&d(o)}}}function Me(e,t,n){let o,r,c;return s(e,ee,(e=>n(0,c=e))),e.$$.update=()=>{1&e.$$.dirty&&n(2,o=c.map((e=>e.buzzKey))),4&e.$$.dirty&&n(1,r=o.length!==new Set(o).size)},[c,r,o,function(e,t,n,o){n[o]=e,ee.set(c)}]}class Pe extends X{constructor(e){super(),V(this,e,Me,Be,c,{})}}function Ie(e,t,n){const o=e.slice();return o[8]=t[n],o}function Ke(e,t,n){const o=e.slice();return o[8]=t[n],o}function Re(e){let t,n,o=e[1].buzzer.owner+"";return{c(){t=h(o),n=h(" has buzzed in")},m(e,o){a(e,t,o),a(e,n,o)},p(e,n){2&n&&o!==(o=e[1].buzzer.owner+"")&&y(t,o)},d(e){e&&d(t),e&&d(n)}}}function Ae(t){let n;return{c(){n=h("the buzzer is open")},m(e,t){a(e,n,t)},p:e,d(e){e&&d(n)}}}function De(t){let n;return{c(){n=h("the buzzer is closed")},m(e,t){a(e,n,t)},p:e,d(e){e&&d(n)}}}function Ue(e){let t,n,o,r,c,s,l=Xe(e[4])+"";return{c(){t=h("the server has closed the connection\n        ("),n=h(l),o=h(")"),r=m("br"),c=p(),s=h(e[5])},m(e,l){a(e,t,l),a(e,n,l),a(e,o,l),a(e,r,l),a(e,c,l),a(e,s,l)},p(e,t){16&t&&l!==(l=Xe(e[4])+"")&&y(n,l),32&t&&y(s,e[5])},d(e){e&&d(t),e&&d(n),e&&d(o),e&&d(r),e&&d(c),e&&d(s)}}}function We(e){let t,n,o=e[0],r=[];for(let t=0;t<o.length;t+=1)r[t]=Fe(Ke(e,o,t));let c=e[0].filter(e[7]),s=[];for(let t=0;t<c.length;t+=1)s[t]=Ge(Ie(e,c,t));return{c(){for(let e=0;e<r.length;e+=1)r[e].c();t=p();for(let e=0;e<s.length;e+=1)s[e].c();n=g()},m(e,o){for(let t=0;t<r.length;t+=1)r[t].m(e,o);a(e,t,o);for(let t=0;t<s.length;t+=1)s[t].m(e,o);a(e,n,o)},p(e,l){if(3&l){let n;for(o=e[0],n=0;n<o.length;n+=1){const c=Ke(e,o,n);r[n]?r[n].p(c,l):(r[n]=Fe(c),r[n].c(),r[n].m(t.parentNode,t))}for(;n<r.length;n+=1)r[n].d(1);r.length=o.length}if(3&l){let t;for(c=e[0].filter(e[7]),t=0;t<c.length;t+=1){const o=Ie(e,c,t);s[t]?s[t].p(o,l):(s[t]=Ge(o),s[t].c(),s[t].m(n.parentNode,n))}for(;t<s.length;t+=1)s[t].d(1);s.length=c.length}},d(e){f(r,e),e&&d(t),f(s,e),e&&d(n)}}}function qe(e){let t,n,o,r,c=e[8].name+"";return{c(){t=m("div"),n=m("strong"),o=h(c),r=h("\n                has already buzzed in"),v(n,"color","#ebcb8b"),v(t,"color","#ebcb8b")},m(e,c){a(e,t,c),u(t,n),u(n,o),u(t,r)},p(e,t){1&t&&c!==(c=e[8].name+"")&&y(o,c)},d(e){e&&d(t)}}}function Fe(e){let t,n=e[1].scores[e[8].name].blocked&&qe(e);return{c(){n&&n.c(),t=g()},m(e,o){n&&n.m(e,o),a(e,t,o)},p(e,o){e[1].scores[e[8].name].blocked?n?n.p(e,o):(n=qe(e),n.c(),n.m(t.parentNode,t)):n&&(n.d(1),n=null)},d(e){n&&n.d(e),e&&d(t)}}}function Ge(e){let t,n,o,r,c,s=e[8].name+"";return{c(){t=m("strong"),n=h(s),o=h(","),r=p(),c=m("span"),c.textContent="click or tap anywhere to buzz in",v(t,"color","#a3be8c"),v(c,"color","#a3be8c")},m(e,s){a(e,t,s),u(t,n),u(t,o),a(e,r,s),a(e,c,s)},p(e,t){3&t&&s!==(s=e[8].name+"")&&y(n,s)},d(e){e&&d(t),e&&d(r),e&&d(c)}}}function Qe(e){let t,n,o,r,c,s,l,i=e[1].ptsworth+"";return{c(){t=m("br"),n=p(),o=m("span"),r=h("for "),c=m("strong"),s=h(i),l=h(" points"),$(o,"id","ptsworth")},m(e,i){a(e,t,i),a(e,n,i),a(e,o,i),u(o,r),u(o,c),u(c,s),u(o,l)},p(e,t){2&t&&i!==(i=e[1].ptsworth+"")&&y(s,i)},d(e){e&&d(t),e&&d(n),e&&d(o)}}}function Ve(t){let n,o,r,c,s,i,u,f;function h(e,t){return e[3]?Ue:"Closed"===e[1].buzzer.state?De:"Open"===e[1].buzzer.state?Ae:Re}let b=h(t),y=b(t),z="Open"===t[1].buzzer.state&&We(t),v=!t[6]&&Qe(t);return{c(){n=m("div"),r=p(),c=m("div"),y.c(),i=p(),z&&z.c(),u=p(),v&&v.c(),f=g(),$(n,"id","topbar"),$(n,"class",o=l(t[1].buzzer.state)+" svelte-1v9422j"),x(n,"ownerHere",t[2]),x(n,"serverDown",t[3]),$(c,"id","state"),$(c,"class",s=l(t[1].buzzer.state)+" svelte-1v9422j"),x(c,"ownerHere",t[2]),x(c,"serverDown",t[3])},m(e,t){a(e,n,t),a(e,r,t),a(e,c,t),y.m(c,null),a(e,i,t),z&&z.m(e,t),a(e,u,t),v&&v.m(e,t),a(e,f,t)},p(e,[t]){2&t&&o!==(o=l(e[1].buzzer.state)+" svelte-1v9422j")&&$(n,"class",o),6&t&&x(n,"ownerHere",e[2]),10&t&&x(n,"serverDown",e[3]),b===(b=h(e))&&y?y.p(e,t):(y.d(1),y=b(e),y&&(y.c(),y.m(c,null))),2&t&&s!==(s=l(e[1].buzzer.state)+" svelte-1v9422j")&&$(c,"class",s),6&t&&x(c,"ownerHere",e[2]),10&t&&x(c,"serverDown",e[3]),"Open"===e[1].buzzer.state?z?z.p(e,t):(z=We(e),z.c(),z.m(u.parentNode,u)):z&&(z.d(1),z=null),e[6]?v&&(v.d(1),v=null):v?v.p(e,t):(v=Qe(e),v.c(),v.m(f.parentNode,f))},i:e,o:e,d(e){e&&d(n),e&&d(r),e&&d(c),y.d(),e&&d(i),z&&z.d(e),e&&d(u),v&&v.d(e),e&&d(f)}}}function Xe(e){return 1e3===e?"normal":1001===e?"away":1002===e?"protocol":1003===e?"unsuppourted data":1006===e?"abnormal":1008===e?"policy":1009===e?"size":e.toString()}function Ye(e,t,n){let o,r,c,l,i,u,a;s(e,ee,(e=>n(0,r=e))),s(e,ie,(e=>n(1,c=e))),s(e,re,(e=>n(3,l=e))),s(e,se,(e=>n(4,i=e))),s(e,ce,(e=>n(5,u=e))),s(e,te,(e=>n(6,a=e)));return e.$$.update=()=>{3&e.$$.dirty&&n(2,o=r.some((e=>e.name===c.buzzer.owner)))},[r,c,o,l,i,u,a,e=>"Click"===e.buzzKey&&!c.scores[e.name].blocked]}class Ze extends X{constructor(e){super(),V(this,e,Ye,Ve,c,{})}}function et(e){let t,n;return{c(){t=m("span"),n=h(e[1]),$(t,"style",e[3])},m(e,o){a(e,t,o),u(t,n)},p(e,o){2&o&&y(n,e[1]),8&o&&$(t,"style",e[3])},d(e){e&&d(t)}}}function tt(e){let t,n,r,c,s;return{c(){t=m("input"),n=p(),r=m("button"),r.textContent="🞬",$(t,"class","hidden"),$(t,"style",e[3]),$(r,"class","remove svelte-ccv93p"),$(r,"title","remove player")},m(o,l){a(o,t,l),z(t,e[2]),a(o,n,l),a(o,r,l),c||(s=[b(t,"input",e[12]),b(t,"focusout",e[5]),b(t,"keydown",e[7]),b(r,"mousedown",e[6])],c=!0)},p(e,n){8&n&&$(t,"style",e[3]),4&n&&t.value!==e[2]&&z(t,e[2])},d(e){e&&d(t),e&&d(n),e&&d(r),c=!1,o(s)}}}function nt(t){let n,o,r,c,s,l;function i(e,t){return e[4]?tt:et}let f=i(t),g=f(t);return{c(){n=m("span"),o=h(t[0]),r=h(":"),c=p(),g.c(),s=p(),l=m("br"),$(n,"style",t[3])},m(e,t){a(e,n,t),u(n,o),u(n,r),a(e,c,t),g.m(e,t),a(e,s,t),a(e,l,t)},p(e,[t]){1&t&&y(o,e[0]),8&t&&$(n,"style",e[3]),f===(f=i(e))&&g?g.p(e,t):(g.d(1),g=f(e),g&&(g.c(),g.m(s.parentNode,s)))},i:e,o:e,d(e){e&&d(n),e&&d(c),g.d(e),e&&d(s),e&&d(l)}}}function ot(e,t,n){let o,r,c,l,i,u;s(e,ie,(e=>n(9,l=e))),s(e,ee,(e=>n(10,i=e))),s(e,te,(e=>n(4,u=e)));let{thisName:a}=t,{thisScore:d}=t,f="eceff4";function m(){let e=parseInt(o);isNaN(e)||ae.send(JSON.stringify({action:"SetScore",name:a,score:e}))}return e.$$set=e=>{"thisName"in e&&n(0,a=e.thisName),"thisScore"in e&&n(1,d=e.thisScore)},e.$$.update=()=>{2&e.$$.dirty&&n(2,o=d.toString()),1537&e.$$.dirty&&(l.scores[a].blocked?n(8,f="ebcb8b"):i.some((e=>e.name===a))?n(8,f="88c0d0"):n(8,f="eceff4")),1025&e.$$.dirty&&n(11,r=i.some((e=>e.name===a))?"bold":"normal"),2304&e.$$.dirty&&n(3,c=`color:#${f};font-weight:${r}`)},[a,d,o,c,u,m,function(){ae.send(JSON.stringify({action:"RemovePlayer",name:a}))},function(e){"Enter"==e.code&&m()},f,l,i,r,function(){o=this.value,n(2,o),n(1,d)}]}class rt extends X{constructor(e){super(),V(this,e,ot,nt,c,{thisName:0,thisScore:1})}}function ct(e,t,n){const o=e.slice();return o[4]=t[n],o}function st(e){let t,n;return{c(){t=m("span"),t.textContent="scores",n=m("br"),$(t,"class","header")},m(e,o){a(e,t,o),a(e,n,o)},d(e){e&&d(t),e&&d(n)}}}function lt(e){let t,n;return{c(){t=m("span"),t.textContent="scores (click to edit)",n=m("br"),$(t,"class","header")},m(e,o){a(e,t,o),a(e,n,o)},d(e){e&&d(t),e&&d(n)}}}function it(e,t){let n,o,r;return o=new rt({props:{thisName:t[4][0],thisScore:t[4][1].score}}),{key:e,first:null,c(){n=g(),q(o.$$.fragment),this.first=n},m(e,t){a(e,n,t),F(o,e,t),r=!0},p(e,n){t=e;const r={};4&n&&(r.thisName=t[4][0]),4&n&&(r.thisScore=t[4][1].score),o.$set(r)},i(e){r||(A(o.$$.fragment,e),r=!0)},o(e){D(o.$$.fragment,e),r=!1},d(e){e&&d(n),G(o,e)}}}function ut(e){let t,n,o,r,c,s,l,i,u,f,h,g=[],$=new Map;function y(e,t){return e[1]?lt:st}let z=y(e),w=z(e),k=Object.entries(e[2].scores).sort(at).reverse();const x=e=>e[4][0];for(let t=0;t<k.length;t+=1){let n=ct(e,k,t),o=x(n);$.set(o,g[t]=it(o,n))}return{c(){t=m("hr"),n=p(),w.c(),o=p(),r=m("button"),r.innerHTML="view score <u>h</u>istory",c=p(),s=m("br"),l=p(),i=m("div");for(let e=0;e<g.length;e+=1)g[e].c();v(i,"text-align","right"),v(i,"display","inline-block")},m(d,m){a(d,t,m),a(d,n,m),w.m(d,m),a(d,o,m),a(d,r,m),a(d,c,m),a(d,s,m),a(d,l,m),a(d,i,m);for(let e=0;e<g.length;e+=1)g[e].m(i,null);u=!0,f||(h=b(r,"click",e[3]),f=!0)},p(e,[t]){z!==(z=y(e))&&(w.d(1),w=z(e),w&&(w.c(),w.m(o.parentNode,o))),4&t&&(k=Object.entries(e[2].scores).sort(at).reverse(),K(),g=function(e,t,n,o,r,c,s,l,i,u,a,d){let f=e.length,m=c.length,h=f;const p={};for(;h--;)p[e[h].key]=h;const g=[],b=new Map,$=new Map;for(h=m;h--;){const e=d(r,c,h),l=n(e);let i=s.get(l);i?o&&i.p(e,t):(i=u(l,e),i.c()),b.set(l,g[h]=i),l in p&&$.set(l,Math.abs(h-p[l]))}const y=new Set,z=new Set;function v(e){A(e,1),e.m(l,a),s.set(e.key,e),a=e.first,m--}for(;f&&m;){const t=g[m-1],n=e[f-1],o=t.key,r=n.key;t===n?(a=t.first,f--,m--):b.has(r)?!s.has(o)||y.has(o)?v(t):z.has(r)?f--:$.get(o)>$.get(r)?(z.add(o),v(t)):(y.add(r),f--):(i(n,s),f--)}for(;f--;){const t=e[f];b.has(t.key)||i(t,s)}for(;m;)v(g[m-1]);return g}(g,t,x,1,e,k,$,i,W,it,null,ct),R())},i(e){if(!u){for(let e=0;e<k.length;e+=1)A(g[e]);u=!0}},o(e){for(let e=0;e<g.length;e+=1)D(g[e]);u=!1},d(e){e&&d(t),e&&d(n),w.d(e),e&&d(o),e&&d(r),e&&d(c),e&&d(s),e&&d(l),e&&d(i);for(let e=0;e<g.length;e+=1)g[e].d();f=!1,h()}}}const at=(e,t)=>e[1].score-t[1].score;function dt(e,t,n){let o,r,c;s(e,ne,(e=>n(0,o=e))),s(e,te,(e=>n(1,r=e))),s(e,ie,(e=>n(2,c=e))),document.addEventListener("keydown",(function(e){"h"===e.key&&i(ne,o=!0,o)}));return[o,r,c,()=>i(ne,o=!0,o)]}class ft extends X{constructor(e){super(),V(this,e,dt,ut,c,{})}}function mt(e,t,n){const o=e.slice();return o[13]=t[n],o}function ht(e){let t,n,o,r=e[13]+"";return{c(){t=m("option"),n=h(r),t.__value=o=e[13],t.value=t.__value},m(e,o){a(e,t,o),u(t,n)},p(e,c){1&c&&r!==(r=e[13]+"")&&y(n,r),1&c&&o!==(o=e[13])&&(t.__value=o,t.value=t.__value)},d(e){e&&d(t)}}}function pt(e){let t,n,r,c,s,l,i,f,g,$,z=e[3].buzzer.owner+"";return{c(){t=h("is "),n=m("strong"),r=h(z),c=p(),s=m("button"),s.innerHTML="<u>c</u>orrect",l=h(" or\n    "),i=m("button"),i.innerHTML="<u>i</u>ncorrect",f=h("?")},m(o,d){a(o,t,d),a(o,n,d),u(n,r),a(o,c,d),a(o,s,d),a(o,l,d),a(o,i,d),a(o,f,d),g||($=[b(s,"mousedown",e[9]),b(i,"mousedown",e[10])],g=!0)},p(e,t){8&t&&z!==(z=e[3].buzzer.owner+"")&&y(r,z)},d(e){e&&d(t),e&&d(n),e&&d(c),e&&d(s),e&&d(l),e&&d(i),e&&d(f),g=!1,o($)}}}function gt(t){let n,o,r;return{c(){n=m("button"),n.innerHTML="<u>o</u>pen buzzer",$(n,"class","large")},m(e,c){a(e,n,c),o||(r=b(n,"mousedown",t[10]),o=!0)},p:e,d(e){e&&d(n),o=!1,r()}}}function bt(t){let n,o,r;return{c(){n=m("button"),n.innerHTML="<u>e</u>nd round early",$(n,"class","large")},m(e,c){a(e,n,c),o||(r=b(n,"mousedown",t[8]),o=!0)},p:e,d(e){e&&d(n),o=!1,r()}}}function $t(t){let n,r,c,s,l,i,z,v,k,x,N,S,C,_,O,E,T,L,H,J,B,M,P,I,K,R,A,D,U=t[0]?"☑":"☐",W=t[0]?t[5]:t[4],q=[];for(let e=0;e<W.length;e+=1)q[e]=ht(mt(t,W,e));function F(e,t){return"Open"===e[3].buzzer.state?bt:"Closed"===e[3].buzzer.state?gt:"TakenBy"===e[3].buzzer.state?pt:void 0}let G=F(t),Q=G&&G(t);return{c(){n=m("hr"),r=p(),c=m("span"),c.textContent="host commands",s=m("br"),l=h("\n\npoints worth:\n\n"),i=m("select");for(let e=0;e<q.length;e+=1)q[e].c();z=p(),v=m("button"),k=m("u"),k.textContent="+",N=p(),S=m("button"),C=m("u"),C.textContent="-",O=p(),E=m("br"),T=p(),L=m("button"),H=h(U),J=p(),B=m("u"),B.textContent="d",M=h("ouble Jeopardy!"),P=p(),I=m("br"),K=p(),Q&&Q.c(),R=g(),$(c,"class","header"),$(i,"type","number"),void 0===t[1]&&j((()=>t[11].call(i))),v.disabled=x=t[2]>3,S.disabled=_=t[2]<1},m(e,o){a(e,n,o),a(e,r,o),a(e,c,o),a(e,s,o),a(e,l,o),a(e,i,o);for(let e=0;e<q.length;e+=1)q[e].m(i,null);w(i,t[1]),a(e,z,o),a(e,v,o),u(v,k),a(e,N,o),a(e,S,o),u(S,C),a(e,O,o),a(e,E,o),a(e,T,o),a(e,L,o),u(L,H),u(L,J),u(L,B),u(L,M),a(e,P,o),a(e,I,o),a(e,K,o),Q&&Q.m(e,o),a(e,R,o),A||(D=[b(i,"change",t[11]),b(v,"mousedown",t[6]),b(S,"mousedown",t[7]),b(L,"mousedown",t[12])],A=!0)},p(e,[t]){if(49&t){let n;for(W=e[0]?e[5]:e[4],n=0;n<W.length;n+=1){const o=mt(e,W,n);q[n]?q[n].p(o,t):(q[n]=ht(o),q[n].c(),q[n].m(i,null))}for(;n<q.length;n+=1)q[n].d(1);q.length=W.length}51&t&&w(i,e[1]),4&t&&x!==(x=e[2]>3)&&(v.disabled=x),4&t&&_!==(_=e[2]<1)&&(S.disabled=_),1&t&&U!==(U=e[0]?"☑":"☐")&&y(H,U),G===(G=F(e))&&Q?Q.p(e,t):(Q&&Q.d(1),Q=G&&G(e),Q&&(Q.c(),Q.m(R.parentNode,R)))},i:e,o:e,d(e){e&&d(n),e&&d(r),e&&d(c),e&&d(s),e&&d(l),e&&d(i),f(q,e),e&&d(z),e&&d(v),e&&d(N),e&&d(S),e&&d(O),e&&d(E),e&&d(T),e&&d(L),e&&d(P),e&&d(I),e&&d(K),Q&&Q.d(e),e&&d(R),A=!1,o(D)}}}function yt(e,t,n){let o,r,c;s(e,le,(e=>n(2,r=e))),s(e,ie,(e=>n(3,c=e)));const l=[200,400,600,800,1e3],u=[400,800,1200,1600,2e3];let a=!1;function d(){i(le,r++,r),i(le,r%=5,r)}function f(){i(le,r--,r)}function m(){ae.send(JSON.stringify({action:"EndRound"})),d()}function h(){ae.send(JSON.stringify({action:"OwnerCorrect"})),d()}function p(){ae.send(JSON.stringify({action:"OpenBuzzer"}))}document.addEventListener("keydown",(function(e){"INPUT"!==document.activeElement.nodeName&&("Open"===c.buzzer.state&&"e"===e.key?m():"Closed"===c.buzzer.state&&"o"===e.key?p():"TakenBy"===c.buzzer.state&&"c"===e.key?h():"TakenBy"===c.buzzer.state&&"i"===e.key?p():"d"===e.key?(n(0,a=!a),i(le,r=0,r)):"+"===e.key&&r<4?d():"-"===e.key&&r>0&&f())}));return e.$$.update=()=>{5&e.$$.dirty&&n(1,o=a?u[r]:l[r]),2&e.$$.dirty&&ae.send(JSON.stringify({action:"SetPtsWorth",pts:o}))},[a,o,r,c,l,u,d,f,m,h,p,function(){o=k(this),n(1,o),n(0,a),n(2,r),n(0,a),n(5,u),n(4,l)},()=>{n(0,a=!a),i(le,r=0,r)}]}class zt extends X{constructor(e){super(),V(this,e,yt,$t,c,{})}}function vt(e,t,n){const o=e.slice();return o[12]=t[n],o}function wt(e,t,n){const o=e.slice();return o[15]=t[n],o[16]=t,o[17]=n,o}function kt(e){let t,n,r,c,s,l,i,u;function f(){e[7].call(t,e[16],e[17])}function h(){return e[8](e[15])}return{c(){t=m("input"),r=p(),c=m("button"),c.textContent="🞬",s=p(),l=m("br"),t.disabled=n=e[15].added,$(t,"placeholder","enter your name"),$(t,"maxlength","30"),$(c,"class","remove svelte-4wxkwn"),$(c,"title","remove contestant")},m(n,o){a(n,t,o),z(t,e[15].name),a(n,r,o),a(n,c,o),a(n,s,o),a(n,l,o),i||(u=[b(t,"input",f),b(c,"mousedown",h)],i=!0)},p(o,r){e=o,1&r&&n!==(n=e[15].added)&&(t.disabled=n),1&r&&t.value!==e[15].name&&z(t,e[15].name)},d(e){e&&d(t),e&&d(r),e&&d(c),e&&d(s),e&&d(l),i=!1,o(u)}}}function xt(e){let t,n,o,r,c=e[12].name+"";return{c(){t=m("span"),n=h('someone else is already named "'),o=h(c),r=h('"'),$(t,"class","dup svelte-4wxkwn")},m(e,c){a(e,t,c),u(t,n),u(t,o),u(t,r)},p(e,t){2&t&&c!==(c=e[12].name+"")&&y(o,c)},d(e){e&&d(t)}}}function Nt(t){let n,r,c,s,l,i,g,z,w,k,x,N,S,C,_,O,E,T,L,j,H,J,B,M,P,I,K,R,A=t[2]?"☑":"☐",D=t[0],U=[];for(let e=0;e<D.length;e+=1)U[e]=kt(wt(t,D,e));let W=t[1],q=[];for(let e=0;e<W.length;e+=1)q[e]=xt(vt(t,W,e));return{c(){n=h("contestant(s), enter your name(s)"),r=m("br"),c=p(),s=m("strong"),s.textContent="hosts do not need to enter their names",l=p(),i=m("hr"),g=p();for(let e=0;e<U.length;e+=1)U[e].c();z=p(),w=m("button"),w.textContent="add contestant",k=p(),x=m("br"),N=p();for(let e=0;e<q.length;e+=1)q[e].c();S=p(),C=m("hr"),_=h("\ndoes this device need host access?"),O=m("br"),E=p(),T=m("button"),L=h(A),j=h("\n    host access"),H=p(),J=m("hr"),B=p(),M=m("button"),P=h("play"),v(s,"color","#88c0d0"),$(M,"class","large"),M.disabled=I=t[1].length>0},m(e,o){a(e,n,o),a(e,r,o),a(e,c,o),a(e,s,o),a(e,l,o),a(e,i,o),a(e,g,o);for(let t=0;t<U.length;t+=1)U[t].m(e,o);a(e,z,o),a(e,w,o),a(e,k,o),a(e,x,o),a(e,N,o);for(let t=0;t<q.length;t+=1)q[t].m(e,o);a(e,S,o),a(e,C,o),a(e,_,o),a(e,O,o),a(e,E,o),a(e,T,o),u(T,L),u(T,j),a(e,H,o),a(e,J,o),a(e,B,o),a(e,M,o),u(M,P),K||(R=[b(w,"mousedown",t[3]),b(T,"mousedown",t[9]),b(M,"mousedown",t[5])],K=!0)},p(e,[t]){if(17&t){let n;for(D=e[0],n=0;n<D.length;n+=1){const o=wt(e,D,n);U[n]?U[n].p(o,t):(U[n]=kt(o),U[n].c(),U[n].m(z.parentNode,z))}for(;n<U.length;n+=1)U[n].d(1);U.length=D.length}if(2&t){let n;for(W=e[1],n=0;n<W.length;n+=1){const o=vt(e,W,n);q[n]?q[n].p(o,t):(q[n]=xt(o),q[n].c(),q[n].m(S.parentNode,S))}for(;n<q.length;n+=1)q[n].d(1);q.length=W.length}4&t&&A!==(A=e[2]?"☑":"☐")&&y(L,A),2&t&&I!==(I=e[1].length>0)&&(M.disabled=I)},i:e,o:e,d(e){e&&d(n),e&&d(r),e&&d(c),e&&d(s),e&&d(l),e&&d(i),e&&d(g),f(U,e),e&&d(z),e&&d(w),e&&d(k),e&&d(x),e&&d(N),f(q,e),e&&d(S),e&&d(C),e&&d(_),e&&d(O),e&&d(E),e&&d(T),e&&d(H),e&&d(J),e&&d(B),e&&d(M),K=!1,o(R)}}}function St(e,t,n){let o,r,c,l,u;s(e,ee,(e=>n(0,r=e))),s(e,oe,(e=>n(11,c=e))),s(e,ie,(e=>n(6,l=e))),s(e,te,(e=>n(2,u=e)));let a=r.length;function d(e){for(let t=0;t<r.length;t++)if(r[t].name===e){r.splice(t,1),ee.set(r),a--,r[t].added&&ae.send(JSON.stringify({action:"RemovePlayer",name:r[t].name}));break}}return e.$$.update=()=>{65&e.$$.dirty&&n(1,o=r.filter((e=>Object.entries(l.scores).some((t=>t[0]===e.name))&&!e.added)))},[r,o,u,function(){i(ee,r=[...r,{name:"",buzzKey:de[a].code,added:!1}],r),a++},d,function(){for(var e of r)e.name=e.name.trim();i(ee,r=r.filter((e=>e.name.length>0)),r);for(const e of r)e.added||(ae.send(JSON.stringify({action:"AddPlayer",name:e.name})),e.added=!0);i(oe,c=!1,c)},l,function(e,t){e[t].name=this.value,ee.set(r)},e=>d(e.name),()=>i(te,u=!u,u)]}class Ct extends X{constructor(e){super(),V(this,e,St,Nt,c,{})}}const{window:_t}=U;function Ot(e){let t,n,o,r,c,s,l,i,u,f,h,y,z;o=new Ze({}),c=new Pe({});let v=e[1]&&Tt();const w=[jt,Lt],k=[];function x(e,t){return e[2]?0:1}return i=x(e),u=k[i]=w[i](e),{c(){t=m("button"),t.textContent="← setup",n=p(),q(o.$$.fragment),r=p(),q(c.$$.fragment),s=p(),v&&v.c(),l=p(),u.c(),f=g(),$(t,"id","setup"),$(t,"class","svelte-1kqudbe")},m(u,d){a(u,t,d),a(u,n,d),F(o,u,d),a(u,r,d),F(c,u,d),a(u,s,d),v&&v.m(u,d),a(u,l,d),k[i].m(u,d),a(u,f,d),h=!0,y||(z=b(t,"click",e[5]),y=!0)},p(e,t){e[1]?v?2&t&&A(v,1):(v=Tt(),v.c(),A(v,1),v.m(l.parentNode,l)):v&&(K(),D(v,1,1,(()=>{v=null})),R());let n=i;i=x(e),i!==n&&(K(),D(k[n],1,1,(()=>{k[n]=null})),R(),u=k[i],u||(u=k[i]=w[i](e),u.c()),A(u,1),u.m(f.parentNode,f))},i(e){h||(A(o.$$.fragment,e),A(c.$$.fragment,e),A(v),A(u),h=!0)},o(e){D(o.$$.fragment,e),D(c.$$.fragment,e),D(v),D(u),h=!1},d(e){e&&d(t),e&&d(n),G(o,e),e&&d(r),G(c,e),e&&d(s),v&&v.d(e),e&&d(l),k[i].d(e),e&&d(f),y=!1,z()}}}function Et(t){let n,o;return n=new Ct({}),{c(){q(n.$$.fragment)},m(e,t){F(n,e,t),o=!0},p:e,i(e){o||(A(n.$$.fragment,e),o=!0)},o(e){D(n.$$.fragment,e),o=!1},d(e){G(n,e)}}}function Tt(e){let t,n;return t=new zt({}),{c(){q(t.$$.fragment)},m(e,o){F(t,e,o),n=!0},i(e){n||(A(t.$$.fragment,e),n=!0)},o(e){D(t.$$.fragment,e),n=!1},d(e){G(t,e)}}}function Lt(e){let t,n;return t=new ft({}),{c(){q(t.$$.fragment)},m(e,o){F(t,e,o),n=!0},i(e){n||(A(t.$$.fragment,e),n=!0)},o(e){D(t.$$.fragment,e),n=!1},d(e){G(t,e)}}}function jt(e){let t,n;return t=new xe({}),{c(){q(t.$$.fragment)},m(e,o){F(t,e,o),n=!0},i(e){n||(A(t.$$.fragment,e),n=!0)},o(e){D(t.$$.fragment,e),n=!1},d(e){G(t,e)}}}function Ht(e){let t,n,r,c,s,l,i;const u=[Et,Ot],f=[];function h(e,t){return e[0]?0:1}return t=h(e),n=f[t]=u[t](e),{c(){n.c(),r=p(),c=m("div"),c.textContent="v5.3.0-dev.3",$(c,"id","footer"),$(c,"class","svelte-1kqudbe")},m(n,o){f[t].m(n,o),a(n,r,o),a(n,c,o),s=!0,l||(i=[b(_t,"mousedown",e[3]),b(_t,"keydown",e[4]),b(_t,"touchstart",e[3])],l=!0)},p(e,[o]){let c=t;t=h(e),t===c?f[t].p(e,o):(K(),D(f[c],1,1,(()=>{f[c]=null})),R(),n=f[t],n?n.p(e,o):(n=f[t]=u[t](e),n.c()),A(n,1),n.m(r.parentNode,r))},i(e){s||(A(n),s=!0)},o(e){D(n),s=!1},d(e){f[t].d(e),e&&d(r),e&&d(c),l=!1,o(i)}}}function Jt(e,t,n){let o,r,c,l,u,a,d,f,m,h;function p(e,t){const n=new Date;i(ie,o.history=[{time:[n.getHours(),n.getMinutes()],name:e,delta:t},...o.history],o)}function g(e){o.scores[e.name].blocked||ae.send(JSON.stringify({action:"Buzz",name:e.name}))}s(e,ie,(e=>n(8,o=e))),s(e,le,(e=>n(9,r=e))),s(e,ee,(e=>n(10,c=e))),s(e,re,(e=>n(11,l=e))),s(e,ce,(e=>n(12,u=e))),s(e,se,(e=>n(13,a=e))),s(e,oe,(e=>n(0,d=e))),s(e,te,(e=>n(1,f=e))),s(e,ne,(e=>n(2,m=e))),ae.onmessage=function(e){let t=JSON.parse(e.data),n=t.action;if("SetScore"===n){let e=o.scores[t.name];p(t.name,t.score-e.score),e.score=t.score}else if("EndRound"===n){for(var s of Object.entries(o.scores))s[1].blocked=!1;i(ie,o.buzzer.state="Closed",o),window.clearTimeout(h)}else if("OpenBuzzer"===n)Object.values(o.scores).every((e=>e.blocked))?(i(ie,o.buzzer.state="Closed",o),Object.values(o.scores).map((e=>e.blocked=!1))):i(ie,o.buzzer.state="Open",o),h=window.setTimeout((function(){for(var e of Object.entries(o.scores))e[1].blocked=!1;i(ie,o.buzzer.state="Closed",o),i(le,r++,r),i(le,r%=5,r)}),5e3);else if("AddPlayer"===n)i(ie,o.scores[t.name]={score:0,blocked:!1},o);else if("RemovePlayer"===n)delete o.scores[t.name],ie.set(o),i(ee,c=c.filter((e=>e.name!==t.name)),c);else if("Unblock"===n)i(ie,o.scores[t.name].blocked=!1,o);else if("EditHistory"===n){let e=o.history[t.index],n=t.delta-e.delta;e.delta=t.delta,i(ie,o.scores[e.name].score+=n,o)}else if("RemoveHistory"===n){let e=o.history[t.index];i(ie,o.scores[e.name].score-=e.delta,o),o.history.splice(t.index,1),ie.set(o)}else if("SetPtsWorth"===n)i(ie,o.ptsworth=t.pts,o);else if("OwnerCorrect"===n){o.scores[o.buzzer.owner].score+=o.ptsworth,p(o.buzzer.owner,o.ptsworth),Object.values(o.scores).map((e=>e.blocked=!1)),i(ie,o.buzzer.state="Closed",o)}else if("SetState"===n){i(ie,o=t.state,o);const e=(new Date).getTimezoneOffset()/60;for(let t of o.history)t.time[0]+=e,t.time[0]%=24}else"Buzz"===n&&(i(ie,o.scores[t.name].blocked=!0,o),i(ie,o.buzzer={state:"TakenBy",owner:t.name},o),window.clearTimeout(h))},ae.onclose=function(e){i(re,l=!0,l),i(ce,u=e.reason,u),i(se,a=e.code,a)};return[d,f,m,function(e){let t=e.target,n=e.srcElement,o=["INPUT","BUTTON","SELECT"];if(!o.includes(t.tagName)&&!o.includes(n.tagName))for(const e of c)"Click"===e.buzzKey&&g(e)},function(e){for(const t of c)t.buzzKey===e.code&&g(t)},()=>i(oe,d=!0,d)]}return new class extends X{constructor(e){super(),V(this,e,Jt,Ht,c,{})}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map
