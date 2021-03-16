var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function r(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function l(e,n,o){e.$$.on_destroy.push(function(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}(n,o))}function u(t,e,n=e){return t.set(n),e}function s(t,e){t.appendChild(e)}function i(t,e,n){t.insertBefore(e,n||null)}function a(t){t.parentNode.removeChild(t)}function d(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function f(t){return document.createElement(t)}function m(t){return document.createTextNode(t)}function h(){return m(" ")}function p(){return m("")}function g(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function $(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function b(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function y(t,e){t.value=null==e?"":e}function v(t,e,n,o){t.style.setProperty(e,n,o?"important":"")}function k(t,e){for(let n=0;n<t.options.length;n+=1){const o=t.options[n];if(o.__value===e)return void(o.selected=!0)}}function w(t){const e=t.querySelector(":checked")||t.options[0];return e&&e.__value}let x;function z(t){x=t}const _=[],N=[],C=[],S=[],E=Promise.resolve();let T=!1;function O(t){C.push(t)}let L=!1;const I=new Set;function M(){if(!L){L=!0;do{for(let t=0;t<_.length;t+=1){const e=_[t];z(e),j(e.$$)}for(z(null),_.length=0;N.length;)N.pop()();for(let t=0;t<C.length;t+=1){const e=C[t];I.has(e)||(I.add(e),e())}C.length=0}while(_.length);for(;S.length;)S.pop()();T=!1,L=!1,I.clear()}}function j(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(O)}}const B=new Set;let K;function P(){K={r:0,c:[],p:K}}function A(){K.r||o(K.c),K=K.p}function H(t,e){t&&t.i&&(B.delete(t),t.i(e))}function R(t,e,n,o){if(t&&t.o){if(B.has(t))return;B.add(t),K.c.push((()=>{B.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}function q(t,e){R(t,1,1,(()=>{e.delete(t.key)}))}function U(t){t&&t.c()}function J(t,n,c){const{fragment:l,on_mount:u,on_destroy:s,after_update:i}=t.$$;l&&l.m(n,c),O((()=>{const n=u.map(e).filter(r);s?s.push(...n):o(n),t.$$.on_mount=[]})),i.forEach(O)}function W(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function D(t,e){-1===t.$$.dirty[0]&&(_.push(t),T||(T=!0,E.then(M)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function F(e,r,c,l,u,s,i=[-1]){const d=x;z(e);const f=r.props||{},m=e.$$={fragment:null,ctx:null,props:s,update:t,not_equal:u,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(d?d.$$.context:[]),callbacks:n(),dirty:i,skip_bound:!1};let h=!1;if(m.ctx=c?c(e,f,((t,n,...o)=>{const r=o.length?o[0]:n;return m.ctx&&u(m.ctx[t],m.ctx[t]=r)&&(!m.skip_bound&&m.bound[t]&&m.bound[t](r),h&&D(e,t)),n})):[],m.update(),h=!0,o(m.before_update),m.fragment=!!l&&l(m.ctx),r.target){if(r.hydrate){const t=function(t){return Array.from(t.childNodes)}(r.target);m.fragment&&m.fragment.l(t),t.forEach(a)}else m.fragment&&m.fragment.c();r.intro&&H(e.$$.fragment),J(e,r.target,r.anchor),M()}z(d)}class G{$destroy(){W(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const Q=[];function V(e,n=t){let o;const r=[];function l(t){if(c(e,t)&&(e=t,o)){const t=!Q.length;for(let t=0;t<r.length;t+=1){const n=r[t];n[1](),Q.push(n,e)}if(t){for(let t=0;t<Q.length;t+=2)Q[t][0](Q[t+1]);Q.length=0}}}return{set:l,update:function(t){l(t(e))},subscribe:function(c,u=t){const s=[c,u];return r.push(s),1===r.length&&(o=n(l)||t),c(e),()=>{const t=r.indexOf(s);-1!==t&&r.splice(t,1),0===r.length&&(o(),o=null)}}}}const X=V([{name:"",blocked:!1,buzzKey:"Space"}]),Y=V({state:"Closed",owner:null}),Z=V(!1),tt=V(!1),et=V(!1),nt=V(!0),ot=V(200),rt=V(0),ct=V([]),lt=V([]);function ut(t,e){fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}function st(t){t.blocked||fetch("/buzz",{method:"POST",headers:{"Content-Type":"text/plain"},body:t.name})}const it=[{code:"Space",name:"Space"},{code:"NumpadEnter",name:"Numpad Enter"},{code:"ControlLeft",name:"Left Control"},{code:"Numpad0",name:"Numpad 0"},{code:"ShiftLeft",name:"Left Shift"},{code:"ShiftRight",name:"Right Shift"},{code:"Enter",name:"Enter"},{code:"ControlRight",name:"Right Control"}];function at(t){let e;return{c(){e=m(t[1])},m(t,n){i(t,e,n)},p(t,n){2&n&&b(e,t[1])},d(t){t&&a(e)}}}function dt(t){let e,n,r,c,l;return{c(){e=f("input"),n=h(),r=f("button"),r.textContent="🞬",$(e,"class","hidden"),$(r,"class","x")},m(o,u){i(o,e,u),y(e,t[3]),i(o,n,u),i(o,r,u),c||(l=[g(e,"input",t[8]),g(e,"blur",t[5]),g(e,"keydown",t[7]),g(r,"mousedown",t[6])],c=!0)},p(t,n){8&n&&e.value!==t[3]&&y(e,t[3])},d(t){t&&a(e),t&&a(n),t&&a(r),c=!1,o(l)}}}function ft(e){let n,o,r,c,l,u,d,g,y=e[2][e[0]].time[0].toString().padStart(2,"0")+"",v=e[2][e[0]].time[1].toString().padStart(2,"0")+"",k=e[2][e[0]].name+"";function w(t,e){return t[4]?dt:at}let x=w(e),z=x(e);return{c(){n=f("span"),o=m(y),r=m(":"),c=m(v),l=h(),u=m(k),d=m(":\n"),z.c(),g=p(),$(n,"class","time svelte-mws1xc")},m(t,e){i(t,n,e),s(n,o),s(n,r),s(n,c),i(t,l,e),i(t,u,e),i(t,d,e),z.m(t,e),i(t,g,e)},p(t,[e]){5&e&&y!==(y=t[2][t[0]].time[0].toString().padStart(2,"0")+"")&&b(o,y),5&e&&v!==(v=t[2][t[0]].time[1].toString().padStart(2,"0")+"")&&b(c,v),5&e&&k!==(k=t[2][t[0]].name+"")&&b(u,k),x===(x=w(t))&&z?z.p(t,e):(z.d(1),z=x(t),z&&(z.c(),z.m(g.parentNode,g)))},i:t,o:t,d(t){t&&a(n),t&&a(l),t&&a(u),t&&a(d),z.d(t),t&&a(g)}}}function mt(t,e,n){let o,r,c,u;l(t,ct,(t=>n(2,c=t))),l(t,Z,(t=>n(4,u=t)));let{thisIndex:s}=e;function i(){ut("/command",{action:"EditHistory",index:s,score:parseInt(r)})}return t.$$set=t=>{"thisIndex"in t&&n(0,s=t.thisIndex)},t.$$.update=()=>{5&t.$$.dirty&&n(1,o=c[s].score),2&t.$$.dirty&&n(3,r=o.toString())},[s,o,c,r,u,i,function(){ut("/command",{action:"RemoveHistory",index:s})},function(t){"Enter"===t.code&&i()},function(){r=this.value,n(3,r),n(1,o),n(2,c),n(0,s)}]}class ht extends G{constructor(t){super(),F(this,t,mt,ft,c,{thisIndex:0})}}function pt(t,e,n){const o=t.slice();return o[6]=e[n],o}function gt(t){let e,n;return{c(){e=f("span"),e.textContent="score history",n=f("br"),$(e,"class","header")},m(t,o){i(t,e,o),i(t,n,o)},d(t){t&&a(e),t&&a(n)}}}function $t(t){let e,n;return{c(){e=f("span"),e.textContent="score history (click to edit)",n=f("br"),$(e,"class","header")},m(t,o){i(t,e,o),i(t,n,o)},d(t){t&&a(e),t&&a(n)}}}function bt(t){let e,n,o;return e=new ht({props:{thisIndex:t[6]}}),{c(){U(e.$$.fragment),n=f("br")},m(t,r){J(e,t,r),i(t,n,r),o=!0},p(t,n){const o={};8&n&&(o.thisIndex=t[6]),e.$set(o)},i(t){o||(H(e.$$.fragment,t),o=!0)},o(t){R(e.$$.fragment,t),o=!1},d(t){W(e,t),t&&a(n)}}}function yt(t){let e,n,o=""===t[0]||t[3][t[6]].name.startsWith(t[0]),r=o&&bt(t);return{c(){r&&r.c(),e=p()},m(t,o){r&&r.m(t,o),i(t,e,o),n=!0},p(t,n){9&n&&(o=""===t[0]||t[3][t[6]].name.startsWith(t[0])),o?r?(r.p(t,n),9&n&&H(r,1)):(r=bt(t),r.c(),H(r,1),r.m(e.parentNode,e)):r&&(P(),R(r,1,1,(()=>{r=null})),A())},i(t){n||(H(r),n=!0)},o(t){R(r),n=!1},d(t){r&&r.d(t),t&&a(e)}}}function vt(t){let e,n,r,c,l,u,s,m,p,b,k,w,x;function z(t,e){return t[2]?$t:gt}let _=z(t),N=_(t),C=kt(0,t[3].length-1),S=[];for(let e=0;e<C.length;e+=1)S[e]=yt(pt(t,C,e));const E=t=>R(S[t],1,1,(()=>{S[t]=null}));return{c(){e=f("hr"),n=h(),N.c(),r=h(),c=f("button"),c.innerHTML="← <u>b</u>ack to current scores\n",l=f("br"),u=h(),s=f("input"),m=f("br"),p=h(),b=f("div");for(let t=0;t<S.length;t+=1)S[t].c();$(s,"placeholder","filter by player name"),v(b,"text-align","right"),v(b,"display","inline-block")},m(o,a){i(o,e,a),i(o,n,a),N.m(o,a),i(o,r,a),i(o,c,a),i(o,l,a),i(o,u,a),i(o,s,a),y(s,t[0]),i(o,m,a),i(o,p,a),i(o,b,a);for(let t=0;t<S.length;t+=1)S[t].m(b,null);k=!0,w||(x=[g(c,"click",t[4]),g(s,"input",t[5])],w=!0)},p(t,[e]){if(_!==(_=z(t))&&(N.d(1),N=_(t),N&&(N.c(),N.m(r.parentNode,r))),1&e&&s.value!==t[0]&&y(s,t[0]),9&e){let n;for(C=kt(0,t[3].length-1),n=0;n<C.length;n+=1){const o=pt(t,C,n);S[n]?(S[n].p(o,e),H(S[n],1)):(S[n]=yt(o),S[n].c(),H(S[n],1),S[n].m(b,null))}for(P(),n=C.length;n<S.length;n+=1)E(n);A()}},i(t){if(!k){for(let t=0;t<C.length;t+=1)H(S[t]);k=!0}},o(t){S=S.filter(Boolean);for(let t=0;t<S.length;t+=1)R(S[t]);k=!1},d(t){t&&a(e),t&&a(n),N.d(t),t&&a(r),t&&a(c),t&&a(l),t&&a(u),t&&a(s),t&&a(m),t&&a(p),t&&a(b),d(S,t),w=!1,o(x)}}}function kt(t,e){return Array.from({length:e-t+1},((t,e)=>e))}function wt(t,e,n){let o,r,c;l(t,tt,(t=>n(1,o=t))),l(t,Z,(t=>n(2,r=t))),l(t,ct,(t=>n(3,c=t)));let s="";document.addEventListener("keydown",(function(t){"b"===t.key&&"INPUT"!==document.activeElement.nodeName&&u(tt,o=!1,o)}));return[s,o,r,c,()=>u(tt,o=!1,o),function(){s=this.value,n(0,s)}]}class xt extends G{constructor(t){super(),F(this,t,wt,vt,c,{})}}function zt(t,e,n){const o=t.slice();return o[5]=e[n],o}function _t(e){let n,o,r,c=e[5].name+"";return{c(){n=f("option"),o=m(c),r=h(),n.__value=e[5].code,n.value=n.__value},m(t,e){i(t,n,e),s(n,o),s(n,r)},p:t,d(t){t&&a(n)}}}function Nt(t){let e;return{c(){e=f("option"),e.textContent="Tap/Click",e.__value="Click",e.value=e.__value},m(t,n){i(t,e,n)},d(t){t&&a(e)}}}function Ct(e){let n,r,c,l,u=!e[1].some(e[3]),m=it,h=[];for(let t=0;t<m.length;t+=1)h[t]=_t(zt(e,m,t));let $=u&&Nt();return{c(){n=f("select");for(let t=0;t<h.length;t+=1)h[t].c();r=p(),$&&$.c(),void 0===e[0].buzzKey&&O((()=>e[4].call(n)))},m(t,o){i(t,n,o);for(let t=0;t<h.length;t+=1)h[t].m(n,null);s(n,r),$&&$.m(n,null),k(n,e[0].buzzKey),c||(l=[g(window,"mousedown",e[2]),g(n,"change",e[4]),g(n,"change",St)],c=!0)},p(t,[e]){if(0&e){let o;for(m=it,o=0;o<m.length;o+=1){const c=zt(t,m,o);h[o]?h[o].p(c,e):(h[o]=_t(c),h[o].c(),h[o].m(n,r))}for(;o<h.length;o+=1)h[o].d(1);h.length=m.length}3&e&&(u=!t[1].some(t[3])),u?$||($=Nt(),$.c(),$.m(n,null)):$&&($.d(1),$=null),1&e&&k(n,t[0].buzzKey)},i:t,o:t,d(t){t&&a(n),d(h,t),$&&$.d(),c=!1,o(l)}}}function St(){document.activeElement.blur()}function Et(t,e,n){let o;l(t,X,(t=>n(1,o=t)));let{contestant:r}=e;return t.$$set=t=>{"contestant"in t&&n(0,r=t.contestant)},[r,o,function(t){let e=t.target,n=t.srcElement,r=["INPUT","BUTTON","SELECT"];if(!r.includes(e.tagName)&&!r.includes(n.tagName))for(const t of o)"Click"===t.buzzKey&&st(t)},t=>t.name!==r.name&&"Click"===t.buzzKey,function(){r.buzzKey=w(this),n(0,r)}]}class Tt extends G{constructor(t){super(),F(this,t,Et,Ct,c,{contestant:0})}}function Ot(t,e,n){const o=t.slice();return o[4]=e[n],o[5]=e,o[6]=n,o}function Lt(t){let e,n,o,r;return{c(){e=f("hr"),n=h(),o=f("span"),o.textContent="buzz keys (click to change)",r=f("br"),$(o,"class","header")},m(t,c){i(t,e,c),i(t,n,c),i(t,o,c),i(t,r,c)},d(t){t&&a(e),t&&a(n),t&&a(o),t&&a(r)}}}function It(t){let e,n,o,r,c,l,u=t[4].name+"";function s(e){t[3].call(null,e,t[4],t[5],t[6])}let d={};return void 0!==t[4]&&(d.contestant=t[4]),o=new Tt({props:d}),N.push((()=>function(t,e,n){const o=t.$$.props[e];void 0!==o&&(t.$$.bound[o]=n,n(t.$$.ctx[o]))}(o,"contestant",s))),{c(){e=m(u),n=m(":\n    "),U(o.$$.fragment),c=f("br")},m(t,r){i(t,e,r),i(t,n,r),J(o,t,r),i(t,c,r),l=!0},p(n,c){t=n,(!l||1&c)&&u!==(u=t[4].name+"")&&b(e,u);const s={};var i;!r&&1&c&&(r=!0,s.contestant=t[4],i=()=>r=!1,S.push(i)),o.$set(s)},i(t){l||(H(o.$$.fragment,t),l=!0)},o(t){R(o.$$.fragment,t),l=!1},d(t){t&&a(e),t&&a(n),W(o,t),t&&a(c)}}}function Mt(t){let e,n;return{c(){e=f("strong"),e.textContent="some players have the same buzz key\n    ",n=f("br"),v(e,"color","#ebcb8b")},m(t,o){i(t,e,o),i(t,n,o)},d(t){t&&a(e),t&&a(n)}}}function jt(t){let e,n,o,r,c=0!==t[0].length&&Lt(),l=t[0],u=[];for(let e=0;e<l.length;e+=1)u[e]=It(Ot(t,l,e));const s=t=>R(u[t],1,1,(()=>{u[t]=null}));let f=t[1]&&Mt();return{c(){c&&c.c(),e=h();for(let t=0;t<u.length;t+=1)u[t].c();n=h(),f&&f.c(),o=p()},m(t,l){c&&c.m(t,l),i(t,e,l);for(let e=0;e<u.length;e+=1)u[e].m(t,l);i(t,n,l),f&&f.m(t,l),i(t,o,l),r=!0},p(t,[r]){if(0!==t[0].length?c||(c=Lt(),c.c(),c.m(e.parentNode,e)):c&&(c.d(1),c=null),1&r){let e;for(l=t[0],e=0;e<l.length;e+=1){const o=Ot(t,l,e);u[e]?(u[e].p(o,r),H(u[e],1)):(u[e]=It(o),u[e].c(),H(u[e],1),u[e].m(n.parentNode,n))}for(P(),e=l.length;e<u.length;e+=1)s(e);A()}t[1]?f||(f=Mt(),f.c(),f.m(o.parentNode,o)):f&&(f.d(1),f=null)},i(t){if(!r){for(let t=0;t<l.length;t+=1)H(u[t]);r=!0}},o(t){u=u.filter(Boolean);for(let t=0;t<u.length;t+=1)R(u[t]);r=!1},d(t){c&&c.d(t),t&&a(e),d(u,t),t&&a(n),f&&f.d(t),t&&a(o)}}}function Bt(t,e,n){let o,r,c;return l(t,X,(t=>n(0,c=t))),t.$$.update=()=>{1&t.$$.dirty&&n(2,o=c.map((t=>t.buzzKey))),4&t.$$.dirty&&n(1,r=o.length!==new Set(o).size)},[c,r,o,function(t,e,n,o){n[o]=t,X.set(c)}]}class Kt extends G{constructor(t){super(),F(this,t,Bt,jt,c,{})}}function Pt(t,e,n){const o=t.slice();return o[5]=e[n],o}function At(t,e,n){const o=t.slice();return o[5]=e[n],o}function Ht(t){let e,n,o=t[1],r=[];for(let e=0;e<o.length;e+=1)r[e]=qt(At(t,o,e));let c=t[1].filter(Wt),l=[];for(let e=0;e<c.length;e+=1)l[e]=Ut(Pt(t,c,e));return{c(){for(let t=0;t<r.length;t+=1)r[t].c();e=h();for(let t=0;t<l.length;t+=1)l[t].c();n=p()},m(t,o){for(let e=0;e<r.length;e+=1)r[e].m(t,o);i(t,e,o);for(let e=0;e<l.length;e+=1)l[e].m(t,o);i(t,n,o)},p(t,u){if(2&u){let n;for(o=t[1],n=0;n<o.length;n+=1){const c=At(t,o,n);r[n]?r[n].p(c,u):(r[n]=qt(c),r[n].c(),r[n].m(e.parentNode,e))}for(;n<r.length;n+=1)r[n].d(1);r.length=o.length}if(2&u){let e;for(c=t[1].filter(Wt),e=0;e<c.length;e+=1){const o=Pt(t,c,e);l[e]?l[e].p(o,u):(l[e]=Ut(o),l[e].c(),l[e].m(n.parentNode,n))}for(;e<l.length;e+=1)l[e].d(1);l.length=c.length}},d(t){d(r,t),t&&a(e),d(l,t),t&&a(n)}}}function Rt(t){let e,n,o,r,c=t[5].name+"";return{c(){e=f("div"),n=f("strong"),o=m(c),r=m("\n                    has already buzzed in"),v(n,"color","#ebcb8b"),v(e,"color","#ebcb8b")},m(t,c){i(t,e,c),s(e,n),s(n,o),s(e,r)},p(t,e){2&e&&c!==(c=t[5].name+"")&&b(o,c)},d(t){t&&a(e)}}}function qt(t){let e,n=t[5].blocked&&Rt(t);return{c(){n&&n.c(),e=p()},m(t,o){n&&n.m(t,o),i(t,e,o)},p(t,o){t[5].blocked?n?n.p(t,o):(n=Rt(t),n.c(),n.m(e.parentNode,e)):n&&(n.d(1),n=null)},d(t){n&&n.d(t),t&&a(e)}}}function Ut(t){let e,n,o,r,c=t[5].name+"";return{c(){e=f("strong"),n=m(c),o=m(",\n            "),r=f("span"),r.textContent="click or tap anywhere to buzz in",v(e,"color","#a3be8c"),v(r,"color","#a3be8c")},m(t,c){i(t,e,c),s(e,n),i(t,o,c),i(t,r,c)},p(t,e){2&e&&c!==(c=t[5].name+"")&&b(n,c)},d(t){t&&a(e),t&&a(o),t&&a(r)}}}function Jt(e){let n,o,r,c,l,u,d,p,g="Open"===e[0].state&&Ht(e);return{c(){n=f("span"),o=f("div"),c=h(),l=f("div"),u=m(e[3]),p=h(),g&&g.c(),$(o,"id","topbar"),$(o,"style",r=`background-color:#${e[2]}`),$(o,"class","svelte-ygcg7q"),$(l,"id","state"),$(l,"style",d=`color:#${e[2]}`),$(l,"class","svelte-ygcg7q"),$(n,"id","buzzer-container"),$(n,"class","svelte-ygcg7q")},m(t,e){i(t,n,e),s(n,o),s(n,c),s(n,l),s(l,u),s(n,p),g&&g.m(n,null)},p(t,[e]){4&e&&r!==(r=`background-color:#${t[2]}`)&&$(o,"style",r),8&e&&b(u,t[3]),4&e&&d!==(d=`color:#${t[2]}`)&&$(l,"style",d),"Open"===t[0].state?g?g.p(t,e):(g=Ht(t),g.c(),g.m(n,null)):g&&(g.d(1),g=null)},i:t,o:t,d(t){t&&a(n),g&&g.d()}}}const Wt=t=>"Click"===t.buzzKey&&!t.blocked;function Dt(t,e,n){let o,r,c,u,s;return l(t,et,(t=>n(4,o=t))),l(t,Y,(t=>n(0,r=t))),l(t,X,(t=>n(1,c=t))),t.$$.update=()=>{19&t.$$.dirty&&(o?(n(2,u="d08770"),n(3,s="couldn't reach server")):"Closed"==r.state?(n(2,u="bf616a"),n(3,s="the buzzer is closed")):"Open"==r.state?(n(2,u=c.every((t=>t.blocked))&&0!==c.length?"ebcb8b":"a3be8c"),n(3,s="the buzzer is open")):"TakenBy"==r.state&&(n(2,u=c.some((t=>t.name===r.owner))?"88c0d0":"bf616a"),n(3,s=`${r.owner} has buzzed in`)))},[r,c,u,s,o]}class Ft extends G{constructor(t){super(),F(this,t,Dt,Jt,c,{})}}function Gt(t){let e,n;return{c(){e=f("span"),n=m(t[1]),$(e,"style",t[3])},m(t,o){i(t,e,o),s(e,n)},p(t,o){2&o&&b(n,t[1]),8&o&&$(e,"style",t[3])},d(t){t&&a(e)}}}function Qt(t){let e,n,r,c,l;return{c(){e=f("input"),n=h(),r=f("button"),r.textContent="🞬",$(e,"class","hidden"),$(e,"style",t[3]),$(r,"class","x")},m(o,u){i(o,e,u),y(e,t[2]),i(o,n,u),i(o,r,u),c||(l=[g(e,"input",t[12]),g(e,"focusout",t[5]),g(e,"keydown",t[7]),g(r,"mousedown",t[6])],c=!0)},p(t,n){8&n&&$(e,"style",t[3]),4&n&&e.value!==t[2]&&y(e,t[2])},d(t){t&&a(e),t&&a(n),t&&a(r),c=!1,o(l)}}}function Vt(e){let n,o,r,c,l,u;function d(t,e){return t[4]?Qt:Gt}let p=d(e),g=p(e);return{c(){n=f("span"),o=m(e[0]),r=m(":"),c=h(),g.c(),l=h(),u=f("br"),$(n,"style",e[3])},m(t,e){i(t,n,e),s(n,o),s(n,r),i(t,c,e),g.m(t,e),i(t,l,e),i(t,u,e)},p(t,[e]){1&e&&b(o,t[0]),8&e&&$(n,"style",t[3]),p===(p=d(t))&&g?g.p(t,e):(g.d(1),g=p(t),g&&(g.c(),g.m(l.parentNode,l)))},i:t,o:t,d(t){t&&a(n),t&&a(c),g.d(t),t&&a(l),t&&a(u)}}}function Xt(t,e,n){let o,r,c,u,s,i;l(t,lt,(t=>n(9,u=t))),l(t,X,(t=>n(10,s=t))),l(t,Z,(t=>n(4,i=t)));let{thisName:a}=e,{thisScore:d}=e,f="eceff4";function m(){ut("/command",{action:"SetScore",name:a,score:parseInt(o)})}return t.$$set=t=>{"thisName"in t&&n(0,a=t.thisName),"thisScore"in t&&n(1,d=t.thisScore)},t.$$.update=()=>{2&t.$$.dirty&&n(2,o=d.toString()),1537&t.$$.dirty&&(Object.entries(u).some((t=>t[0]===a&&t[1].blocked))?n(8,f="ebcb8b"):s.some((t=>t.name===a))?n(8,f="88c0d0"):n(8,f="eceff4")),1025&t.$$.dirty&&n(11,r=s.some((t=>t.name===a))?"bold":"normal"),2304&t.$$.dirty&&n(3,c=`color:#${f};font-weight:${r}`)},[a,d,o,c,i,m,function(){ut("/command",{action:"RemovePlayer",name:a})},function(t){"Enter"==t.code&&m()},f,u,s,r,function(){o=this.value,n(2,o),n(1,d)}]}class Yt extends G{constructor(t){super(),F(this,t,Xt,Vt,c,{thisName:0,thisScore:1})}}function Zt(t,e,n){const o=t.slice();return o[4]=e[n],o}function te(t){let e,n;return{c(){e=f("span"),e.textContent="scores",n=f("br"),$(e,"class","header")},m(t,o){i(t,e,o),i(t,n,o)},d(t){t&&a(e),t&&a(n)}}}function ee(t){let e,n;return{c(){e=f("span"),e.textContent="scores (click to edit)",n=f("br"),$(e,"class","header")},m(t,o){i(t,e,o),i(t,n,o)},d(t){t&&a(e),t&&a(n)}}}function ne(t,e){let n,o,r;return o=new Yt({props:{thisName:e[4][0],thisScore:e[4][1].score}}),{key:t,first:null,c(){n=p(),U(o.$$.fragment),this.first=n},m(t,e){i(t,n,e),J(o,t,e),r=!0},p(t,n){e=t;const r={};4&n&&(r.thisName=e[4][0]),4&n&&(r.thisScore=e[4][1].score),o.$set(r)},i(t){r||(H(o.$$.fragment,t),r=!0)},o(t){R(o.$$.fragment,t),r=!1},d(t){t&&a(n),W(o,t)}}}function oe(t){let e,n,o,r,c,l,u,s,d,m,p,$=[],b=new Map;function y(t,e){return t[1]?ee:te}let k=y(t),w=k(t),x=Object.entries(t[2]).sort(re).reverse();const z=t=>t[4][0];for(let e=0;e<x.length;e+=1){let n=Zt(t,x,e),o=z(n);b.set(o,$[e]=ne(o,n))}return{c(){e=f("hr"),n=h(),w.c(),o=h(),r=f("button"),r.innerHTML="view score <u>h</u>istory",c=h(),l=f("br"),u=h(),s=f("div");for(let t=0;t<$.length;t+=1)$[t].c();v(s,"text-align","right"),v(s,"display","inline-block")},m(a,f){i(a,e,f),i(a,n,f),w.m(a,f),i(a,o,f),i(a,r,f),i(a,c,f),i(a,l,f),i(a,u,f),i(a,s,f);for(let t=0;t<$.length;t+=1)$[t].m(s,null);d=!0,m||(p=g(r,"click",t[3]),m=!0)},p(t,[e]){k!==(k=y(t))&&(w.d(1),w=k(t),w&&(w.c(),w.m(o.parentNode,o))),4&e&&(x=Object.entries(t[2]).sort(re).reverse(),P(),$=function(t,e,n,o,r,c,l,u,s,i,a,d){let f=t.length,m=c.length,h=f;const p={};for(;h--;)p[t[h].key]=h;const g=[],$=new Map,b=new Map;for(h=m;h--;){const t=d(r,c,h),u=n(t);let s=l.get(u);s?o&&s.p(t,e):(s=i(u,t),s.c()),$.set(u,g[h]=s),u in p&&b.set(u,Math.abs(h-p[u]))}const y=new Set,v=new Set;function k(t){H(t,1),t.m(u,a),l.set(t.key,t),a=t.first,m--}for(;f&&m;){const e=g[m-1],n=t[f-1],o=e.key,r=n.key;e===n?(a=e.first,f--,m--):$.has(r)?!l.has(o)||y.has(o)?k(e):v.has(r)?f--:b.get(o)>b.get(r)?(v.add(o),k(e)):(y.add(r),f--):(s(n,l),f--)}for(;f--;){const e=t[f];$.has(e.key)||s(e,l)}for(;m;)k(g[m-1]);return g}($,e,z,1,t,x,b,s,q,ne,null,Zt),A())},i(t){if(!d){for(let t=0;t<x.length;t+=1)H($[t]);d=!0}},o(t){for(let t=0;t<$.length;t+=1)R($[t]);d=!1},d(t){t&&a(e),t&&a(n),w.d(t),t&&a(o),t&&a(r),t&&a(c),t&&a(l),t&&a(u),t&&a(s);for(let t=0;t<$.length;t+=1)$[t].d();m=!1,p()}}}const re=(t,e)=>t[1].score-e[1].score;function ce(t,e,n){let o,r,c;l(t,tt,(t=>n(0,o=t))),l(t,Z,(t=>n(1,r=t))),l(t,lt,(t=>n(2,c=t))),document.addEventListener("keydown",(function(t){"h"===t.key&&u(tt,o=!0,o)}));return[o,r,c,()=>u(tt,o=!0,o)]}class le extends G{constructor(t){super(),F(this,t,ce,oe,c,{})}}function ue(t,e,n){const o=t.slice();return o[14]=e[n],o}function se(t){let e,n,r,c,l,u,d,p,$,y,v=t[3].owner+"";return{c(){e=m("is "),n=f("strong"),r=m(v),c=h(),l=f("button"),l.innerHTML="<u>c</u>orrect",u=m(" or\n    "),d=f("button"),d.innerHTML="<u>i</u>ncorrect",p=m("?")},m(o,a){i(o,e,a),i(o,n,a),s(n,r),i(o,c,a),i(o,l,a),i(o,u,a),i(o,d,a),i(o,p,a),$||(y=[g(l,"mousedown",t[9]),g(d,"mousedown",t[10])],$=!0)},p(t,e){8&e&&v!==(v=t[3].owner+"")&&b(r,v)},d(t){t&&a(e),t&&a(n),t&&a(c),t&&a(l),t&&a(u),t&&a(d),t&&a(p),$=!1,o(y)}}}function ie(t){let e,n,r,c,l,u,p,y,v,w,x,z,_,N,C,S,E,T,L,I,M,j,B,K,P=t[1]?"☑":"☐",A=t[1]?t[5]:t[4],H=[];for(let e=0;e<A.length;e+=1)H[e]=de(ue(t,A,e));return{c(){e=m("points worth:\n    "),n=f("select");for(let t=0;t<H.length;t+=1)H[t].c();r=h(),c=f("button"),l=f("u"),l.textContent="+",p=h(),y=f("button"),v=f("u"),v.textContent="-",x=h(),z=f("br"),_=h(),N=f("button"),C=m(P),S=h(),E=f("u"),E.textContent="d",T=m("ouble Jeopardy!"),L=h(),I=f("br"),M=h(),j=f("button"),j.innerHTML="<u>o</u>pen buzzer",$(n,"type","number"),void 0===t[2]&&O((()=>t[11].call(n))),c.disabled=u=t[0]>3,y.disabled=w=t[0]<1,$(j,"class","large")},m(o,u){i(o,e,u),i(o,n,u);for(let t=0;t<H.length;t+=1)H[t].m(n,null);k(n,t[2]),i(o,r,u),i(o,c,u),s(c,l),i(o,p,u),i(o,y,u),s(y,v),i(o,x,u),i(o,z,u),i(o,_,u),i(o,N,u),s(N,C),s(N,S),s(N,E),s(N,T),i(o,L,u),i(o,I,u),i(o,M,u),i(o,j,u),B||(K=[g(n,"change",t[11]),g(c,"mousedown",t[6]),g(y,"mousedown",t[7]),g(N,"mousedown",t[12]),g(j,"mousedown",t[10])],B=!0)},p(t,e){if(50&e){let o;for(A=t[1]?t[5]:t[4],o=0;o<A.length;o+=1){const r=ue(t,A,o);H[o]?H[o].p(r,e):(H[o]=de(r),H[o].c(),H[o].m(n,null))}for(;o<H.length;o+=1)H[o].d(1);H.length=A.length}54&e&&k(n,t[2]),1&e&&u!==(u=t[0]>3)&&(c.disabled=u),1&e&&w!==(w=t[0]<1)&&(y.disabled=w),2&e&&P!==(P=t[1]?"☑":"☐")&&b(C,P)},d(t){t&&a(e),t&&a(n),d(H,t),t&&a(r),t&&a(c),t&&a(p),t&&a(y),t&&a(x),t&&a(z),t&&a(_),t&&a(N),t&&a(L),t&&a(I),t&&a(M),t&&a(j),B=!1,o(K)}}}function ae(e){let n,o,r;return{c(){n=f("button"),n.innerHTML="<u>e</u>nd round early",$(n,"class","large")},m(t,c){i(t,n,c),o||(r=g(n,"mousedown",e[8]),o=!0)},p:t,d(t){t&&a(n),o=!1,r()}}}function de(t){let e,n,o,r=t[14]+"";return{c(){e=f("option"),n=m(r),e.__value=o=t[14],e.value=e.__value},m(t,o){i(t,e,o),s(e,n)},p(t,c){2&c&&r!==(r=t[14]+"")&&b(n,r),2&c&&o!==(o=t[14])&&(e.__value=o,e.value=e.__value)},d(t){t&&a(e)}}}function fe(e){let n,o,r,c,l,u;function s(t,e){return"Open"===t[3].state?ae:"Closed"===t[3].state?ie:"TakenBy"===t[3].state?se:void 0}let d=s(e),m=d&&d(e);return{c(){n=f("hr"),o=h(),r=f("span"),r.textContent="host commands",c=f("br"),l=h(),m&&m.c(),u=p(),$(r,"class","header")},m(t,e){i(t,n,e),i(t,o,e),i(t,r,e),i(t,c,e),i(t,l,e),m&&m.m(t,e),i(t,u,e)},p(t,[e]){d===(d=s(t))&&m?m.p(t,e):(m&&m.d(1),m=d&&d(t),m&&(m.c(),m.m(u.parentNode,u)))},i:t,o:t,d(t){t&&a(n),t&&a(o),t&&a(r),t&&a(c),t&&a(l),m&&m.d(t),t&&a(u)}}}function me(t,e,n){let o,r,c;l(t,ot,(t=>n(2,o=t))),l(t,Y,(t=>n(3,r=t))),l(t,lt,(t=>n(13,c=t)));const s=[200,400,600,800,1e3],i=[400,800,1200,1600,2e3];let a=0,d=!1;function f(){n(0,a++,a),n(0,a%=5)}function m(){n(0,a--,a)}function h(){ut("/command",{action:"EndRound"}),f()}function p(){ut("/command",{action:"AddScore",name:r.owner,score:o}),h()}function g(){Object.entries(c).every((t=>t[1].blocked))&&f(),ut("/command",{action:"OpenBuzzer"})}document.addEventListener("keydown",(function(t){"INPUT"!==document.activeElement.nodeName&&("Open"===r.state&&"e"===t.key?h():"Closed"===r.state&&"o"===t.key?g():"TakenBy"===r.state&&"c"===t.key?p():"TakenBy"===r.state&&"i"===t.key?g():"d"===t.key?n(1,d=!d):a<4&&"+"===t.key?f():a>0&&"-"===t.key&&m())}));return t.$$.update=()=>{3&t.$$.dirty&&u(ot,o=d?i[a]:s[a],o)},[a,d,o,r,s,i,f,m,h,p,g,function(){o=w(this),ot.set(o),n(1,d),n(5,i),n(4,s)},()=>n(1,d=!d)]}class he extends G{constructor(t){super(),F(this,t,me,fe,c,{})}}function pe(t,e,n){const o=t.slice();return o[11]=e[n],o[12]=e,o[13]=n,o}function ge(t){let e,n,o,r,c;function l(){t[7].call(e,t[12],t[13])}return{c(){e=f("input"),n=h(),o=f("br"),$(e,"placeholder","enter your name")},m(u,s){i(u,e,s),y(e,t[11].name),i(u,n,s),i(u,o,s),r||(c=g(e,"input",l),r=!0)},p(n,o){t=n,1&o&&e.value!==t[11].name&&y(e,t[11].name)},d(t){t&&a(e),t&&a(n),t&&a(o),r=!1,c()}}}function $e(t){let e,n;return{c(){e=f("br"),n=f("strong"),n.textContent="some of these names are taken",$(n,"id","dup"),$(n,"class","svelte-1ge8e94")},m(t,o){i(t,e,o),i(t,n,o)},d(t){t&&a(e),t&&a(n)}}}function be(e){let n,r,c,l,u,p,y,k,w,x,z,_,N,C,S,E,T,O,L,I,M,j,B,K,P,A,H,R,q,U=e[2]?"☑":"☐",J=e[0],W=[];for(let t=0;t<J.length;t+=1)W[t]=ge(pe(e,J,t));let D=e[1]&&$e();return{c(){n=m("contestant(s), enter your name(s)"),r=f("br"),c=h(),l=f("strong"),l.textContent="hosts do not need to enter their names",u=h(),p=f("hr"),y=h();for(let t=0;t<W.length;t+=1)W[t].c();k=h(),w=f("button"),w.textContent="add contestant",x=h(),z=f("button"),_=m("remove contestant"),C=h(),D&&D.c(),S=h(),E=f("hr"),T=m("\ndoes this device need host access?"),O=f("br"),L=h(),I=f("button"),M=m(U),j=m("\n    host access"),B=h(),K=f("hr"),P=h(),A=f("button"),H=m("play"),v(l,"color","#88c0d0"),z.disabled=N=0===e[0].length,$(A,"class","large"),A.disabled=e[1]},m(t,o){i(t,n,o),i(t,r,o),i(t,c,o),i(t,l,o),i(t,u,o),i(t,p,o),i(t,y,o);for(let e=0;e<W.length;e+=1)W[e].m(t,o);i(t,k,o),i(t,w,o),i(t,x,o),i(t,z,o),s(z,_),i(t,C,o),D&&D.m(t,o),i(t,S,o),i(t,E,o),i(t,T,o),i(t,O,o),i(t,L,o),i(t,I,o),s(I,M),s(I,j),i(t,B,o),i(t,K,o),i(t,P,o),i(t,A,o),s(A,H),R||(q=[g(w,"mousedown",e[3]),g(z,"mousedown",e[4]),g(I,"mousedown",e[8]),g(A,"mousedown",e[5])],R=!0)},p(t,[e]){if(1&e){let n;for(J=t[0],n=0;n<J.length;n+=1){const o=pe(t,J,n);W[n]?W[n].p(o,e):(W[n]=ge(o),W[n].c(),W[n].m(k.parentNode,k))}for(;n<W.length;n+=1)W[n].d(1);W.length=J.length}1&e&&N!==(N=0===t[0].length)&&(z.disabled=N),t[1]?D||(D=$e(),D.c(),D.m(S.parentNode,S)):D&&(D.d(1),D=null),4&e&&U!==(U=t[2]?"☑":"☐")&&b(M,U),2&e&&(A.disabled=t[1])},i:t,o:t,d(t){t&&a(n),t&&a(r),t&&a(c),t&&a(l),t&&a(u),t&&a(p),t&&a(y),d(W,t),t&&a(k),t&&a(w),t&&a(x),t&&a(z),t&&a(C),D&&D.d(t),t&&a(S),t&&a(E),t&&a(T),t&&a(O),t&&a(L),t&&a(I),t&&a(B),t&&a(K),t&&a(P),t&&a(A),R=!1,o(q)}}}function ye(t,e,n){let o,r,c,s,i;l(t,X,(t=>n(0,r=t))),l(t,nt,(t=>n(10,c=t))),l(t,lt,(t=>n(6,s=t))),l(t,Z,(t=>n(2,i=t)));let a=1;return t.$$.update=()=>{65&t.$$.dirty&&n(1,o=r.some((t=>Object.entries(s).some((e=>e[0]===t.name)))))},[r,o,i,function(){u(X,r=[...r,{name:"",blocked:!1,buzzKey:it[a].code}],r),a++},function(){r.pop(),X.set(r),a--},function(){for(const t in r)u(X,r[t].name=r[t].name.trim(),r);u(X,r=r.filter((t=>!!t.name)),r),r.map((t=>ut("/command",{action:"AddPlayer",name:t.name}))),u(nt,c=!1,c)},s,function(t,e){t[e].name=this.value,X.set(r)},()=>u(Z,i=!i,i)]}class ve extends G{constructor(t){super(),F(this,t,ye,be,c,{})}}function ke(t){let e,n,o,r,c,l,u,s,d;e=new Ft({}),o=new Kt({});let f=t[1]&&xe();const m=[_e,ze],g=[];function $(t,e){return t[2]?0:1}return l=$(t),u=g[l]=m[l](t),{c(){U(e.$$.fragment),n=h(),U(o.$$.fragment),r=h(),f&&f.c(),c=h(),u.c(),s=p()},m(t,u){J(e,t,u),i(t,n,u),J(o,t,u),i(t,r,u),f&&f.m(t,u),i(t,c,u),g[l].m(t,u),i(t,s,u),d=!0},p(t,e){t[1]?f?2&e&&H(f,1):(f=xe(),f.c(),H(f,1),f.m(c.parentNode,c)):f&&(P(),R(f,1,1,(()=>{f=null})),A());let n=l;l=$(t),l!==n&&(P(),R(g[n],1,1,(()=>{g[n]=null})),A(),u=g[l],u||(u=g[l]=m[l](t),u.c()),H(u,1),u.m(s.parentNode,s))},i(t){d||(H(e.$$.fragment,t),H(o.$$.fragment,t),H(f),H(u),d=!0)},o(t){R(e.$$.fragment,t),R(o.$$.fragment,t),R(f),R(u),d=!1},d(t){W(e,t),t&&a(n),W(o,t),t&&a(r),f&&f.d(t),t&&a(c),g[l].d(t),t&&a(s)}}}function we(e){let n,o;return n=new ve({}),{c(){U(n.$$.fragment)},m(t,e){J(n,t,e),o=!0},p:t,i(t){o||(H(n.$$.fragment,t),o=!0)},o(t){R(n.$$.fragment,t),o=!1},d(t){W(n,t)}}}function xe(t){let e,n;return e=new he({}),{c(){U(e.$$.fragment)},m(t,o){J(e,t,o),n=!0},i(t){n||(H(e.$$.fragment,t),n=!0)},o(t){R(e.$$.fragment,t),n=!1},d(t){W(e,t)}}}function ze(t){let e,n;return e=new le({}),{c(){U(e.$$.fragment)},m(t,o){J(e,t,o),n=!0},i(t){n||(H(e.$$.fragment,t),n=!0)},o(t){R(e.$$.fragment,t),n=!1},d(t){W(e,t)}}}function _e(t){let e,n;return e=new xt({}),{c(){U(e.$$.fragment)},m(t,o){J(e,t,o),n=!0},i(t){n||(H(e.$$.fragment,t),n=!0)},o(t){R(e.$$.fragment,t),n=!1},d(t){W(e,t)}}}function Ne(t){let e,n,o,r,c;const l=[we,ke],u=[];function s(t,e){return t[0]?0:1}return e=s(t),n=u[e]=l[e](t),{c(){n.c(),o=h(),r=f("div"),r.textContent="v2.5.1",$(r,"id","footer"),$(r,"class","svelte-zc7rqv")},m(t,n){u[e].m(t,n),i(t,o,n),i(t,r,n),c=!0},p(t,[r]){let c=e;e=s(t),e===c?u[e].p(t,r):(P(),R(u[c],1,1,(()=>{u[c]=null})),A(),n=u[e],n?n.p(t,r):(n=u[e]=l[e](t),n.c()),H(n,1),n.m(o.parentNode,o))},i(t){c||(H(n),c=!0)},o(t){R(n),c=!1},d(t){u[e].d(t),t&&a(o),t&&a(r)}}}function Ce(t,e,n){let o,r,c,s,i,a,d,f;l(t,Y,(t=>n(3,o=t))),l(t,lt,(t=>n(4,r=t))),l(t,ct,(t=>n(5,c=t))),l(t,et,(t=>n(6,s=t))),l(t,rt,(t=>n(7,i=t))),l(t,nt,(t=>n(0,a=t))),l(t,Z,(t=>n(1,d=t))),l(t,tt,(t=>n(2,f=t)));var m=this&&this.__awaiter||function(t,e,n,o){return new(n||(n=Promise))((function(r,c){function l(t){try{s(o.next(t))}catch(t){c(t)}}function u(t){try{s(o.throw(t))}catch(t){c(t)}}function s(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(l,u)}s((o=o.apply(t,e||[])).next())}))};function h(){return m(this,void 0,void 0,(function*(){yield async function(t){let e=await fetch(t);return await e.json()}("/state").then((t=>{u(Y,o=t.buzzer,o),u(lt,r=t.scores,r),u(ct,c=t.history,c)}))}))}return setInterval((function(){return m(this,void 0,void 0,(function*(){let t;yield fetch("/marker").then((t=>t.arrayBuffer())).then((t=>new Uint8Array(t))).then((e=>{t=e[0],u(et,s=!1,s)})).catch((()=>u(et,s=!0,s))),t!==i&&(h(),u(rt,i=t,i))}))}),50),[a,d,f]}return new class extends G{constructor(t){super(),F(this,t,Ce,Ne,c,{})}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map
