var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function r(t){return"function"==typeof t}function c(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function s(e,n,o){e.$$.on_destroy.push(function(e,...n){if(null==e)return t;const o=e.subscribe(...n);return o.unsubscribe?()=>o.unsubscribe():o}(n,o))}function u(t,e,n=e){return t.set(n),e}function l(t,e){t.appendChild(e)}function i(t,e,n){t.insertBefore(e,n||null)}function a(t){t.parentNode.removeChild(t)}function d(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function f(t){return document.createElement(t)}function m(t){return document.createTextNode(t)}function h(){return m(" ")}function p(){return m("")}function g(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function b(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function $(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function y(t,e){t.value=null==e?"":e}function z(t,e,n,o){t.style.setProperty(e,n,o?"important":"")}function v(t,e){for(let n=0;n<t.options.length;n+=1){const o=t.options[n];if(o.__value===e)return void(o.selected=!0)}}function w(t){const e=t.querySelector(":checked")||t.options[0];return e&&e.__value}let k;function x(t){k=t}const N=[],_=[],S=[],C=[],E=Promise.resolve();let T=!1;function O(t){S.push(t)}let L=!1;const I=new Set;function K(){if(!L){L=!0;do{for(let t=0;t<N.length;t+=1){const e=N[t];x(e),M(e.$$)}for(x(null),N.length=0;_.length;)_.pop()();for(let t=0;t<S.length;t+=1){const e=S[t];I.has(e)||(I.add(e),e())}S.length=0}while(N.length);for(;C.length;)C.pop()();T=!1,L=!1,I.clear()}}function M(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(O)}}const P=new Set;let j;function B(){j={r:0,c:[],p:j}}function A(){j.r||o(j.c),j=j.p}function H(t,e){t&&t.i&&(P.delete(t),t.i(e))}function R(t,e,n,o){if(t&&t.o){if(P.has(t))return;P.add(t),j.c.push((()=>{P.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}function U(t,e){R(t,1,1,(()=>{e.delete(t.key)}))}function q(t){t&&t.c()}function W(t,n,c){const{fragment:s,on_mount:u,on_destroy:l,after_update:i}=t.$$;s&&s.m(n,c),O((()=>{const n=u.map(e).filter(r);l?l.push(...n):o(n),t.$$.on_mount=[]})),i.forEach(O)}function J(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function D(t,e){-1===t.$$.dirty[0]&&(N.push(t),T||(T=!0,E.then(K)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function F(e,r,c,s,u,l,i=[-1]){const d=k;x(e);const f=r.props||{},m=e.$$={fragment:null,ctx:null,props:l,update:t,not_equal:u,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(d?d.$$.context:[]),callbacks:n(),dirty:i,skip_bound:!1};let h=!1;if(m.ctx=c?c(e,f,((t,n,...o)=>{const r=o.length?o[0]:n;return m.ctx&&u(m.ctx[t],m.ctx[t]=r)&&(!m.skip_bound&&m.bound[t]&&m.bound[t](r),h&&D(e,t)),n})):[],m.update(),h=!0,o(m.before_update),m.fragment=!!s&&s(m.ctx),r.target){if(r.hydrate){const t=function(t){return Array.from(t.childNodes)}(r.target);m.fragment&&m.fragment.l(t),t.forEach(a)}else m.fragment&&m.fragment.c();r.intro&&H(e.$$.fragment),W(e,r.target,r.anchor),K()}x(d)}class G{$destroy(){J(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const Q=[];function V(e,n=t){let o;const r=[];function s(t){if(c(e,t)&&(e=t,o)){const t=!Q.length;for(let t=0;t<r.length;t+=1){const n=r[t];n[1](),Q.push(n,e)}if(t){for(let t=0;t<Q.length;t+=2)Q[t][0](Q[t+1]);Q.length=0}}}return{set:s,update:function(t){s(t(e))},subscribe:function(c,u=t){const l=[c,u];return r.push(l),1===r.length&&(o=n(s)||t),c(e),()=>{const t=r.indexOf(l);-1!==t&&r.splice(t,1),0===r.length&&(o(),o=null)}}}}const X=V([{name:"",buzzKey:"Space"}]),Y=V(!1),Z=V(!1),tt=V(!1),et=V(!0),nt=V(0),ot=V({buzzer:{state:"Closed",owner:null},scores:{},history:[],ptsworth:200});function rt(t,e){fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}const ct=[{code:"Space",name:"Space"},{code:"NumpadEnter",name:"Numpad Enter"},{code:"ControlLeft",name:"Left Control"},{code:"Numpad0",name:"Numpad 0"},{code:"ShiftLeft",name:"Left Shift"},{code:"ShiftRight",name:"Right Shift"},{code:"Enter",name:"Enter"},{code:"ControlRight",name:"Right Control"}];function st(t){let e;return{c(){e=m(t[1])},m(t,n){i(t,e,n)},p(t,n){2&n&&$(e,t[1])},d(t){t&&a(e)}}}function ut(t){let e,n,r,c,s;return{c(){e=f("input"),n=h(),r=f("button"),r.textContent="🞬",b(e,"class","hidden"),b(r,"class","x")},m(o,u){i(o,e,u),y(e,t[3]),i(o,n,u),i(o,r,u),c||(s=[g(e,"input",t[8]),g(e,"blur",t[5]),g(e,"keydown",t[7]),g(r,"mousedown",t[6])],c=!0)},p(t,n){8&n&&e.value!==t[3]&&y(e,t[3])},d(t){t&&a(e),t&&a(n),t&&a(r),c=!1,o(s)}}}function lt(e){let n,o,r,c,s,u,d,g,y=e[2].history[e[0]].time[0].toString().padStart(2,"0")+"",z=e[2].history[e[0]].time[1].toString().padStart(2,"0")+"",v=e[2].history[e[0]].name+"";function w(t,e){return t[4]?ut:st}let k=w(e),x=k(e);return{c(){n=f("span"),o=m(y),r=m(":"),c=m(z),s=h(),u=m(v),d=m(":\n"),x.c(),g=p(),b(n,"class","time svelte-mws1xc")},m(t,e){i(t,n,e),l(n,o),l(n,r),l(n,c),i(t,s,e),i(t,u,e),i(t,d,e),x.m(t,e),i(t,g,e)},p(t,[e]){5&e&&y!==(y=t[2].history[t[0]].time[0].toString().padStart(2,"0")+"")&&$(o,y),5&e&&z!==(z=t[2].history[t[0]].time[1].toString().padStart(2,"0")+"")&&$(c,z),5&e&&v!==(v=t[2].history[t[0]].name+"")&&$(u,v),k===(k=w(t))&&x?x.p(t,e):(x.d(1),x=k(t),x&&(x.c(),x.m(g.parentNode,g)))},i:t,o:t,d(t){t&&a(n),t&&a(s),t&&a(u),t&&a(d),x.d(t),t&&a(g)}}}function it(t,e,n){let o,r,c,u;s(t,ot,(t=>n(2,c=t))),s(t,Y,(t=>n(4,u=t)));let{thisIndex:l}=e;function i(){rt("/command",{action:"EditHistory",index:l,score:parseInt(r)})}return t.$$set=t=>{"thisIndex"in t&&n(0,l=t.thisIndex)},t.$$.update=()=>{5&t.$$.dirty&&n(1,o=c.history[l].score),2&t.$$.dirty&&n(3,r=o.toString())},[l,o,c,r,u,i,function(){rt("/command",{action:"RemoveHistory",index:l})},function(t){"Enter"===t.code&&i()},function(){r=this.value,n(3,r),n(1,o),n(2,c),n(0,l)}]}class at extends G{constructor(t){super(),F(this,t,it,lt,c,{thisIndex:0})}}function dt(t,e,n){const o=t.slice();return o[6]=e[n],o}function ft(t){let e,n;return{c(){e=f("span"),e.textContent="score history",n=f("br"),b(e,"class","header")},m(t,o){i(t,e,o),i(t,n,o)},d(t){t&&a(e),t&&a(n)}}}function mt(t){let e,n;return{c(){e=f("span"),e.textContent="score history (click to edit)",n=f("br"),b(e,"class","header")},m(t,o){i(t,e,o),i(t,n,o)},d(t){t&&a(e),t&&a(n)}}}function ht(t){let e,n,o;return e=new at({props:{thisIndex:t[6]}}),{c(){q(e.$$.fragment),n=f("br")},m(t,r){W(e,t,r),i(t,n,r),o=!0},p(t,n){const o={};8&n&&(o.thisIndex=t[6]),e.$set(o)},i(t){o||(H(e.$$.fragment,t),o=!0)},o(t){R(e.$$.fragment,t),o=!1},d(t){J(e,t),t&&a(n)}}}function pt(t){let e,n,o=""===t[0]||t[3].history[t[6]].name.startsWith(t[0]),r=o&&ht(t);return{c(){r&&r.c(),e=p()},m(t,o){r&&r.m(t,o),i(t,e,o),n=!0},p(t,n){9&n&&(o=""===t[0]||t[3].history[t[6]].name.startsWith(t[0])),o?r?(r.p(t,n),9&n&&H(r,1)):(r=ht(t),r.c(),H(r,1),r.m(e.parentNode,e)):r&&(B(),R(r,1,1,(()=>{r=null})),A())},i(t){n||(H(r),n=!0)},o(t){R(r),n=!1},d(t){r&&r.d(t),t&&a(e)}}}function gt(t){let e,n,r,c,s,u,l,m,p,$,v,w,k;function x(t,e){return t[2]?mt:ft}let N=x(t),_=N(t),S=bt(0,t[3].history.length-1),C=[];for(let e=0;e<S.length;e+=1)C[e]=pt(dt(t,S,e));const E=t=>R(C[t],1,1,(()=>{C[t]=null}));return{c(){e=f("hr"),n=h(),_.c(),r=h(),c=f("button"),c.innerHTML="← <u>b</u>ack to current scores\n",s=f("br"),u=h(),l=f("input"),m=f("br"),p=h(),$=f("div");for(let t=0;t<C.length;t+=1)C[t].c();b(l,"placeholder","filter by player name"),z($,"text-align","right"),z($,"display","inline-block")},m(o,a){i(o,e,a),i(o,n,a),_.m(o,a),i(o,r,a),i(o,c,a),i(o,s,a),i(o,u,a),i(o,l,a),y(l,t[0]),i(o,m,a),i(o,p,a),i(o,$,a);for(let t=0;t<C.length;t+=1)C[t].m($,null);v=!0,w||(k=[g(c,"click",t[4]),g(l,"input",t[5])],w=!0)},p(t,[e]){if(N!==(N=x(t))&&(_.d(1),_=N(t),_&&(_.c(),_.m(r.parentNode,r))),1&e&&l.value!==t[0]&&y(l,t[0]),9&e){let n;for(S=bt(0,t[3].history.length-1),n=0;n<S.length;n+=1){const o=dt(t,S,n);C[n]?(C[n].p(o,e),H(C[n],1)):(C[n]=pt(o),C[n].c(),H(C[n],1),C[n].m($,null))}for(B(),n=S.length;n<C.length;n+=1)E(n);A()}},i(t){if(!v){for(let t=0;t<S.length;t+=1)H(C[t]);v=!0}},o(t){C=C.filter(Boolean);for(let t=0;t<C.length;t+=1)R(C[t]);v=!1},d(t){t&&a(e),t&&a(n),_.d(t),t&&a(r),t&&a(c),t&&a(s),t&&a(u),t&&a(l),t&&a(m),t&&a(p),t&&a($),d(C,t),w=!1,o(k)}}}function bt(t,e){return Array.from({length:e-t+1},((t,e)=>e))}function $t(t,e,n){let o,r,c;s(t,Z,(t=>n(1,o=t))),s(t,Y,(t=>n(2,r=t))),s(t,ot,(t=>n(3,c=t)));let l="";document.addEventListener("keydown",(function(t){"b"===t.key&&"INPUT"!==document.activeElement.nodeName&&u(Z,o=!1,o)}));return[l,o,r,c,()=>u(Z,o=!1,o),function(){l=this.value,n(0,l)}]}class yt extends G{constructor(t){super(),F(this,t,$t,gt,c,{})}}function zt(t,e,n){const o=t.slice();return o[4]=e[n],o}function vt(e){let n,o,r,c=e[4].name+"";return{c(){n=f("option"),o=m(c),r=h(),n.__value=e[4].code,n.value=n.__value},m(t,e){i(t,n,e),l(n,o),l(n,r)},p:t,d(t){t&&a(n)}}}function wt(t){let e;return{c(){e=f("option"),e.textContent="Tap/Click",e.__value="Click",e.value=e.__value},m(t,n){i(t,e,n)},d(t){t&&a(e)}}}function kt(e){let n,r,c,s,u=!e[1].some(e[2]),m=ct,h=[];for(let t=0;t<m.length;t+=1)h[t]=vt(zt(e,m,t));let b=u&&wt();return{c(){n=f("select");for(let t=0;t<h.length;t+=1)h[t].c();r=p(),b&&b.c(),void 0===e[0].buzzKey&&O((()=>e[3].call(n)))},m(t,o){i(t,n,o);for(let t=0;t<h.length;t+=1)h[t].m(n,null);l(n,r),b&&b.m(n,null),v(n,e[0].buzzKey),c||(s=[g(n,"change",e[3]),g(n,"change",xt)],c=!0)},p(t,[e]){if(0&e){let o;for(m=ct,o=0;o<m.length;o+=1){const c=zt(t,m,o);h[o]?h[o].p(c,e):(h[o]=vt(c),h[o].c(),h[o].m(n,r))}for(;o<h.length;o+=1)h[o].d(1);h.length=m.length}3&e&&(u=!t[1].some(t[2])),u?b||(b=wt(),b.c(),b.m(n,null)):b&&(b.d(1),b=null),1&e&&v(n,t[0].buzzKey)},i:t,o:t,d(t){t&&a(n),d(h,t),b&&b.d(),c=!1,o(s)}}}function xt(){document.activeElement.blur()}function Nt(t,e,n){let o;s(t,X,(t=>n(1,o=t)));let{contestant:r}=e;return t.$$set=t=>{"contestant"in t&&n(0,r=t.contestant)},[r,o,t=>t.name!==r.name&&"Click"===t.buzzKey,function(){r.buzzKey=w(this),n(0,r)}]}class _t extends G{constructor(t){super(),F(this,t,Nt,kt,c,{contestant:0})}}function St(t,e,n){const o=t.slice();return o[4]=e[n],o[5]=e,o[6]=n,o}function Ct(t){let e,n,o,r;return{c(){e=f("hr"),n=h(),o=f("span"),o.textContent="buzz keys (click to change)",r=f("br"),b(o,"class","header")},m(t,c){i(t,e,c),i(t,n,c),i(t,o,c),i(t,r,c)},d(t){t&&a(e),t&&a(n),t&&a(o),t&&a(r)}}}function Et(t){let e,n,o,r,c,s,u=t[4].name+"";function l(e){t[3].call(null,e,t[4],t[5],t[6])}let d={};return void 0!==t[4]&&(d.contestant=t[4]),o=new _t({props:d}),_.push((()=>function(t,e,n){const o=t.$$.props[e];void 0!==o&&(t.$$.bound[o]=n,n(t.$$.ctx[o]))}(o,"contestant",l))),{c(){e=m(u),n=m(":\n    "),q(o.$$.fragment),c=f("br")},m(t,r){i(t,e,r),i(t,n,r),W(o,t,r),i(t,c,r),s=!0},p(n,c){t=n,(!s||1&c)&&u!==(u=t[4].name+"")&&$(e,u);const l={};var i;!r&&1&c&&(r=!0,l.contestant=t[4],i=()=>r=!1,C.push(i)),o.$set(l)},i(t){s||(H(o.$$.fragment,t),s=!0)},o(t){R(o.$$.fragment,t),s=!1},d(t){t&&a(e),t&&a(n),J(o,t),t&&a(c)}}}function Tt(t){let e,n;return{c(){e=f("strong"),e.textContent="some players have the same buzz key\n    ",n=f("br"),z(e,"color","#ebcb8b")},m(t,o){i(t,e,o),i(t,n,o)},d(t){t&&a(e),t&&a(n)}}}function Ot(t){let e,n,o,r,c=0!==t[0].length&&Ct(),s=t[0],u=[];for(let e=0;e<s.length;e+=1)u[e]=Et(St(t,s,e));const l=t=>R(u[t],1,1,(()=>{u[t]=null}));let f=t[1]&&Tt();return{c(){c&&c.c(),e=h();for(let t=0;t<u.length;t+=1)u[t].c();n=h(),f&&f.c(),o=p()},m(t,s){c&&c.m(t,s),i(t,e,s);for(let e=0;e<u.length;e+=1)u[e].m(t,s);i(t,n,s),f&&f.m(t,s),i(t,o,s),r=!0},p(t,[r]){if(0!==t[0].length?c||(c=Ct(),c.c(),c.m(e.parentNode,e)):c&&(c.d(1),c=null),1&r){let e;for(s=t[0],e=0;e<s.length;e+=1){const o=St(t,s,e);u[e]?(u[e].p(o,r),H(u[e],1)):(u[e]=Et(o),u[e].c(),H(u[e],1),u[e].m(n.parentNode,n))}for(B(),e=s.length;e<u.length;e+=1)l(e);A()}t[1]?f||(f=Tt(),f.c(),f.m(o.parentNode,o)):f&&(f.d(1),f=null)},i(t){if(!r){for(let t=0;t<s.length;t+=1)H(u[t]);r=!0}},o(t){u=u.filter(Boolean);for(let t=0;t<u.length;t+=1)R(u[t]);r=!1},d(t){c&&c.d(t),t&&a(e),d(u,t),t&&a(n),f&&f.d(t),t&&a(o)}}}function Lt(t,e,n){let o,r,c;return s(t,X,(t=>n(0,c=t))),t.$$.update=()=>{1&t.$$.dirty&&n(2,o=c.map((t=>t.buzzKey))),4&t.$$.dirty&&n(1,r=o.length!==new Set(o).size)},[c,r,o,function(t,e,n,o){n[o]=t,X.set(c)}]}class It extends G{constructor(t){super(),F(this,t,Lt,Ot,c,{})}}function Kt(t,e,n){const o=t.slice();return o[7]=e[n],o}function Mt(t,e,n){const o=t.slice();return o[7]=e[n],o}function Pt(t){let e,n,o=t[1],r=[];for(let e=0;e<o.length;e+=1)r[e]=Bt(Mt(t,o,e));let c=t[1].filter(t[6]),s=[];for(let e=0;e<c.length;e+=1)s[e]=At(Kt(t,c,e));return{c(){for(let t=0;t<r.length;t+=1)r[t].c();e=h();for(let t=0;t<s.length;t+=1)s[t].c();n=p()},m(t,o){for(let e=0;e<r.length;e+=1)r[e].m(t,o);i(t,e,o);for(let e=0;e<s.length;e+=1)s[e].m(t,o);i(t,n,o)},p(t,u){if(3&u){let n;for(o=t[1],n=0;n<o.length;n+=1){const c=Mt(t,o,n);r[n]?r[n].p(c,u):(r[n]=Bt(c),r[n].c(),r[n].m(e.parentNode,e))}for(;n<r.length;n+=1)r[n].d(1);r.length=o.length}if(3&u){let e;for(c=t[1].filter(t[6]),e=0;e<c.length;e+=1){const o=Kt(t,c,e);s[e]?s[e].p(o,u):(s[e]=At(o),s[e].c(),s[e].m(n.parentNode,n))}for(;e<s.length;e+=1)s[e].d(1);s.length=c.length}},d(t){d(r,t),t&&a(e),d(s,t),t&&a(n)}}}function jt(t){let e,n,o,r,c=t[7].name+"";return{c(){e=f("div"),n=f("strong"),o=m(c),r=m("\n                has already buzzed in"),z(n,"color","#ebcb8b"),z(e,"color","#ebcb8b")},m(t,c){i(t,e,c),l(e,n),l(n,o),l(e,r)},p(t,e){2&e&&c!==(c=t[7].name+"")&&$(o,c)},d(t){t&&a(e)}}}function Bt(t){let e,n=t[0].scores[t[7].name].blocked&&jt(t);return{c(){n&&n.c(),e=p()},m(t,o){n&&n.m(t,o),i(t,e,o)},p(t,o){t[0].scores[t[7].name].blocked?n?n.p(t,o):(n=jt(t),n.c(),n.m(e.parentNode,e)):n&&(n.d(1),n=null)},d(t){n&&n.d(t),t&&a(e)}}}function At(t){let e,n,o,r,c,s=t[7].name+"";return{c(){e=f("strong"),n=m(s),o=m(","),r=h(),c=f("span"),c.textContent="click or tap anywhere to buzz in",z(e,"color","#a3be8c"),z(c,"color","#a3be8c")},m(t,s){i(t,e,s),l(e,n),l(e,o),i(t,r,s),i(t,c,s)},p(t,e){3&e&&s!==(s=t[7].name+"")&&$(n,s)},d(t){t&&a(e),t&&a(r),t&&a(c)}}}function Ht(t){let e,n,o,r,c,s,u,d=t[0].ptsworth+"";return{c(){e=f("br"),n=h(),o=f("span"),r=m("for "),c=f("strong"),s=m(d),u=m(" points"),b(o,"id","ptsworth")},m(t,a){i(t,e,a),i(t,n,a),i(t,o,a),l(o,r),l(o,c),l(c,s),l(o,u)},p(t,e){1&e&&d!==(d=t[0].ptsworth+"")&&$(s,d)},d(t){t&&a(e),t&&a(n),t&&a(o)}}}function Rt(e){let n,o,r,c,s,u,d,g,y,z="Open"===e[0].buzzer.state&&Pt(e),v=!e[4]&&Ht(e);return{c(){n=f("div"),r=h(),c=f("div"),s=m(e[3]),d=h(),z&&z.c(),g=h(),v&&v.c(),y=p(),b(n,"id","topbar"),b(n,"style",o=`background-color:#${e[2]}`),b(n,"class","svelte-1ouoi4x"),b(c,"id","state"),b(c,"style",u=`color:#${e[2]}`),b(c,"class","svelte-1ouoi4x")},m(t,e){i(t,n,e),i(t,r,e),i(t,c,e),l(c,s),i(t,d,e),z&&z.m(t,e),i(t,g,e),v&&v.m(t,e),i(t,y,e)},p(t,[e]){4&e&&o!==(o=`background-color:#${t[2]}`)&&b(n,"style",o),8&e&&$(s,t[3]),4&e&&u!==(u=`color:#${t[2]}`)&&b(c,"style",u),"Open"===t[0].buzzer.state?z?z.p(t,e):(z=Pt(t),z.c(),z.m(g.parentNode,g)):z&&(z.d(1),z=null),t[4]?v&&(v.d(1),v=null):v?v.p(t,e):(v=Ht(t),v.c(),v.m(y.parentNode,y))},i:t,o:t,d(t){t&&a(n),t&&a(r),t&&a(c),t&&a(d),z&&z.d(t),t&&a(g),v&&v.d(t),t&&a(y)}}}function Ut(t,e,n){let o,r,c,u,l,i;s(t,tt,(t=>n(5,o=t))),s(t,ot,(t=>n(0,r=t))),s(t,X,(t=>n(1,c=t))),s(t,Y,(t=>n(4,u=t)));return t.$$.update=()=>{35&t.$$.dirty&&(o?(n(2,l="d08770"),n(3,i="couldn't reach server")):"Closed"==r.buzzer.state?(n(2,l="bf616a"),n(3,i="the buzzer is closed")):"Open"==r.buzzer.state?(n(2,l=c.every((t=>r.scores[t.name].blocked))&&0!==c.length?"ebcb8b":"a3be8c"),n(3,i="the buzzer is open")):"TakenBy"==r.buzzer.state&&(n(2,l=c.some((t=>t.name===r.buzzer.owner))?"88c0d0":"bf616a"),n(3,i=`${r.buzzer.owner} has buzzed in`)))},[r,c,l,i,u,o,t=>"Click"===t.buzzKey&&!r.scores[t.name].blocked]}class qt extends G{constructor(t){super(),F(this,t,Ut,Rt,c,{})}}function Wt(t){let e,n;return{c(){e=f("span"),n=m(t[1]),b(e,"style",t[3])},m(t,o){i(t,e,o),l(e,n)},p(t,o){2&o&&$(n,t[1]),8&o&&b(e,"style",t[3])},d(t){t&&a(e)}}}function Jt(t){let e,n,r,c,s;return{c(){e=f("input"),n=h(),r=f("button"),r.textContent="🞬",b(e,"class","hidden"),b(e,"style",t[3]),b(r,"class","x")},m(o,u){i(o,e,u),y(e,t[2]),i(o,n,u),i(o,r,u),c||(s=[g(e,"input",t[12]),g(e,"focusout",t[5]),g(e,"keydown",t[7]),g(r,"mousedown",t[6])],c=!0)},p(t,n){8&n&&b(e,"style",t[3]),4&n&&e.value!==t[2]&&y(e,t[2])},d(t){t&&a(e),t&&a(n),t&&a(r),c=!1,o(s)}}}function Dt(e){let n,o,r,c,s,u;function d(t,e){return t[4]?Jt:Wt}let p=d(e),g=p(e);return{c(){n=f("span"),o=m(e[0]),r=m(":"),c=h(),g.c(),s=h(),u=f("br"),b(n,"style",e[3])},m(t,e){i(t,n,e),l(n,o),l(n,r),i(t,c,e),g.m(t,e),i(t,s,e),i(t,u,e)},p(t,[e]){1&e&&$(o,t[0]),8&e&&b(n,"style",t[3]),p===(p=d(t))&&g?g.p(t,e):(g.d(1),g=p(t),g&&(g.c(),g.m(s.parentNode,s)))},i:t,o:t,d(t){t&&a(n),t&&a(c),g.d(t),t&&a(s),t&&a(u)}}}function Ft(t,e,n){let o,r,c,u,l,i;s(t,ot,(t=>n(9,u=t))),s(t,X,(t=>n(10,l=t))),s(t,Y,(t=>n(4,i=t)));let{thisName:a}=e,{thisScore:d}=e,f="eceff4";function m(){rt("/command",{action:"SetScore",name:a,score:parseInt(o)})}return t.$$set=t=>{"thisName"in t&&n(0,a=t.thisName),"thisScore"in t&&n(1,d=t.thisScore)},t.$$.update=()=>{2&t.$$.dirty&&n(2,o=d.toString()),1537&t.$$.dirty&&(Object.entries(u.scores).some((t=>t[0]===a&&t[1].blocked))?n(8,f="ebcb8b"):l.some((t=>t.name===a))?n(8,f="88c0d0"):n(8,f="eceff4")),1025&t.$$.dirty&&n(11,r=l.some((t=>t.name===a))?"bold":"normal"),2304&t.$$.dirty&&n(3,c=`color:#${f};font-weight:${r}`)},[a,d,o,c,i,m,function(){rt("/command",{action:"RemovePlayer",name:a})},function(t){"Enter"==t.code&&m()},f,u,l,r,function(){o=this.value,n(2,o),n(1,d)}]}class Gt extends G{constructor(t){super(),F(this,t,Ft,Dt,c,{thisName:0,thisScore:1})}}function Qt(t,e,n){const o=t.slice();return o[4]=e[n],o}function Vt(t){let e,n;return{c(){e=f("span"),e.textContent="scores",n=f("br"),b(e,"class","header")},m(t,o){i(t,e,o),i(t,n,o)},d(t){t&&a(e),t&&a(n)}}}function Xt(t){let e,n;return{c(){e=f("span"),e.textContent="scores (click to edit)",n=f("br"),b(e,"class","header")},m(t,o){i(t,e,o),i(t,n,o)},d(t){t&&a(e),t&&a(n)}}}function Yt(t,e){let n,o,r;return o=new Gt({props:{thisName:e[4][0],thisScore:e[4][1].score}}),{key:t,first:null,c(){n=p(),q(o.$$.fragment),this.first=n},m(t,e){i(t,n,e),W(o,t,e),r=!0},p(t,n){e=t;const r={};4&n&&(r.thisName=e[4][0]),4&n&&(r.thisScore=e[4][1].score),o.$set(r)},i(t){r||(H(o.$$.fragment,t),r=!0)},o(t){R(o.$$.fragment,t),r=!1},d(t){t&&a(n),J(o,t)}}}function Zt(t){let e,n,o,r,c,s,u,l,d,m,p,b=[],$=new Map;function y(t,e){return t[1]?Xt:Vt}let v=y(t),w=v(t),k=Object.entries(t[2].scores).sort(te).reverse();const x=t=>t[4][0];for(let e=0;e<k.length;e+=1){let n=Qt(t,k,e),o=x(n);$.set(o,b[e]=Yt(o,n))}return{c(){e=f("hr"),n=h(),w.c(),o=h(),r=f("button"),r.innerHTML="view score <u>h</u>istory",c=h(),s=f("br"),u=h(),l=f("div");for(let t=0;t<b.length;t+=1)b[t].c();z(l,"text-align","right"),z(l,"display","inline-block")},m(a,f){i(a,e,f),i(a,n,f),w.m(a,f),i(a,o,f),i(a,r,f),i(a,c,f),i(a,s,f),i(a,u,f),i(a,l,f);for(let t=0;t<b.length;t+=1)b[t].m(l,null);d=!0,m||(p=g(r,"click",t[3]),m=!0)},p(t,[e]){v!==(v=y(t))&&(w.d(1),w=v(t),w&&(w.c(),w.m(o.parentNode,o))),4&e&&(k=Object.entries(t[2].scores).sort(te).reverse(),B(),b=function(t,e,n,o,r,c,s,u,l,i,a,d){let f=t.length,m=c.length,h=f;const p={};for(;h--;)p[t[h].key]=h;const g=[],b=new Map,$=new Map;for(h=m;h--;){const t=d(r,c,h),u=n(t);let l=s.get(u);l?o&&l.p(t,e):(l=i(u,t),l.c()),b.set(u,g[h]=l),u in p&&$.set(u,Math.abs(h-p[u]))}const y=new Set,z=new Set;function v(t){H(t,1),t.m(u,a),s.set(t.key,t),a=t.first,m--}for(;f&&m;){const e=g[m-1],n=t[f-1],o=e.key,r=n.key;e===n?(a=e.first,f--,m--):b.has(r)?!s.has(o)||y.has(o)?v(e):z.has(r)?f--:$.get(o)>$.get(r)?(z.add(o),v(e)):(y.add(r),f--):(l(n,s),f--)}for(;f--;){const e=t[f];b.has(e.key)||l(e,s)}for(;m;)v(g[m-1]);return g}(b,e,x,1,t,k,$,l,U,Yt,null,Qt),A())},i(t){if(!d){for(let t=0;t<k.length;t+=1)H(b[t]);d=!0}},o(t){for(let t=0;t<b.length;t+=1)R(b[t]);d=!1},d(t){t&&a(e),t&&a(n),w.d(t),t&&a(o),t&&a(r),t&&a(c),t&&a(s),t&&a(u),t&&a(l);for(let t=0;t<b.length;t+=1)b[t].d();m=!1,p()}}}const te=(t,e)=>t[1].score-e[1].score;function ee(t,e,n){let o,r,c;s(t,Z,(t=>n(0,o=t))),s(t,Y,(t=>n(1,r=t))),s(t,ot,(t=>n(2,c=t))),document.addEventListener("keydown",(function(t){"h"===t.key&&u(Z,o=!0,o)}));return[o,r,c,()=>u(Z,o=!0,o)]}class ne extends G{constructor(t){super(),F(this,t,ee,Zt,c,{})}}function oe(t,e,n){const o=t.slice();return o[13]=e[n],o}function re(t){let e,n,o,r=t[13]+"";return{c(){e=f("option"),n=m(r),e.__value=o=t[13],e.value=e.__value},m(t,o){i(t,e,o),l(e,n)},p(t,c){2&c&&r!==(r=t[13]+"")&&$(n,r),2&c&&o!==(o=t[13])&&(e.__value=o,e.value=e.__value)},d(t){t&&a(e)}}}function ce(t){let e,n,r,c,s,u,d,p,b,y,z=t[3].buzzer.owner+"";return{c(){e=m("is "),n=f("strong"),r=m(z),c=h(),s=f("button"),s.innerHTML="<u>c</u>orrect",u=m(" or\n    "),d=f("button"),d.innerHTML="<u>i</u>ncorrect",p=m("?")},m(o,a){i(o,e,a),i(o,n,a),l(n,r),i(o,c,a),i(o,s,a),i(o,u,a),i(o,d,a),i(o,p,a),b||(y=[g(s,"mousedown",t[9]),g(d,"mousedown",t[10])],b=!0)},p(t,e){8&e&&z!==(z=t[3].buzzer.owner+"")&&$(r,z)},d(t){t&&a(e),t&&a(n),t&&a(c),t&&a(s),t&&a(u),t&&a(d),t&&a(p),b=!1,o(y)}}}function se(e){let n,o,r;return{c(){n=f("button"),n.innerHTML="<u>o</u>pen buzzer",b(n,"class","large")},m(t,c){i(t,n,c),o||(r=g(n,"mousedown",e[10]),o=!0)},p:t,d(t){t&&a(n),o=!1,r()}}}function ue(e){let n,o,r;return{c(){n=f("button"),n.innerHTML="<u>e</u>nd round early",b(n,"class","large")},m(t,c){i(t,n,c),o||(r=g(n,"mousedown",e[8]),o=!0)},p:t,d(t){t&&a(n),o=!1,r()}}}function le(e){let n,r,c,s,u,y,z,w,k,x,N,_,S,C,E,T,L,I,K,M,P,j,B,A,H,R,U,q,W=e[1]?"☑":"☐",J=e[1]?e[5]:e[4],D=[];for(let t=0;t<J.length;t+=1)D[t]=re(oe(e,J,t));function F(t,e){return"Open"===t[3].buzzer.state?ue:"Closed"===t[3].buzzer.state?se:"TakenBy"===t[3].buzzer.state?ce:void 0}let G=F(e),Q=G&&G(e);return{c(){n=f("hr"),r=h(),c=f("span"),c.textContent="host commands",s=f("br"),u=m("\n\npoints worth:\n\n"),y=f("select");for(let t=0;t<D.length;t+=1)D[t].c();z=h(),w=f("button"),k=f("u"),k.textContent="+",N=h(),_=f("button"),S=f("u"),S.textContent="-",E=h(),T=f("br"),L=h(),I=f("button"),K=m(W),M=h(),P=f("u"),P.textContent="d",j=m("ouble Jeopardy!"),B=h(),A=f("br"),H=h(),Q&&Q.c(),R=p(),b(c,"class","header"),b(y,"type","number"),void 0===e[2]&&O((()=>e[11].call(y))),w.disabled=x=e[0]>3,_.disabled=C=e[0]<1},m(t,o){i(t,n,o),i(t,r,o),i(t,c,o),i(t,s,o),i(t,u,o),i(t,y,o);for(let t=0;t<D.length;t+=1)D[t].m(y,null);v(y,e[2]),i(t,z,o),i(t,w,o),l(w,k),i(t,N,o),i(t,_,o),l(_,S),i(t,E,o),i(t,T,o),i(t,L,o),i(t,I,o),l(I,K),l(I,M),l(I,P),l(I,j),i(t,B,o),i(t,A,o),i(t,H,o),Q&&Q.m(t,o),i(t,R,o),U||(q=[g(y,"change",e[11]),g(w,"mousedown",e[6]),g(_,"mousedown",e[7]),g(I,"mousedown",e[12])],U=!0)},p(t,[e]){if(50&e){let n;for(J=t[1]?t[5]:t[4],n=0;n<J.length;n+=1){const o=oe(t,J,n);D[n]?D[n].p(o,e):(D[n]=re(o),D[n].c(),D[n].m(y,null))}for(;n<D.length;n+=1)D[n].d(1);D.length=J.length}54&e&&v(y,t[2]),1&e&&x!==(x=t[0]>3)&&(w.disabled=x),1&e&&C!==(C=t[0]<1)&&(_.disabled=C),2&e&&W!==(W=t[1]?"☑":"☐")&&$(K,W),G===(G=F(t))&&Q?Q.p(t,e):(Q&&Q.d(1),Q=G&&G(t),Q&&(Q.c(),Q.m(R.parentNode,R)))},i:t,o:t,d(t){t&&a(n),t&&a(r),t&&a(c),t&&a(s),t&&a(u),t&&a(y),d(D,t),t&&a(z),t&&a(w),t&&a(N),t&&a(_),t&&a(E),t&&a(T),t&&a(L),t&&a(I),t&&a(B),t&&a(A),t&&a(H),Q&&Q.d(t),t&&a(R),U=!1,o(q)}}}function ie(t,e,n){let o,r;s(t,ot,(t=>n(3,r=t)));const c=[200,400,600,800,1e3],u=[400,800,1200,1600,2e3];let l=0,i=!1;function a(){n(0,l++,l),n(0,l%=5)}function d(){n(0,l--,l)}function f(){rt("/command",{action:"EndRound"}),a()}function m(){rt("/command",{action:"AddScore",name:r.buzzer.owner,score:o}),f()}function h(){Object.entries(r.scores).every((t=>t[1].blocked))&&a(),rt("/command",{action:"OpenBuzzer"})}document.addEventListener("keydown",(function(t){"INPUT"!==document.activeElement.nodeName&&("Open"===r.buzzer.state&&"e"===t.key?f():"Closed"===r.buzzer.state&&"o"===t.key?h():"TakenBy"===r.buzzer.state&&"c"===t.key?m():"TakenBy"===r.buzzer.state&&"i"===t.key?h():"d"===t.key?(n(1,i=!i),n(0,l=0)):"+"===t.key&&l<4?a():"-"===t.key&&l>0&&d())}));return t.$$.update=()=>{3&t.$$.dirty&&n(2,o=i?u[l]:c[l]),4&t.$$.dirty&&rt("/command",{action:"SetPtsWorth",pts:o})},[l,i,o,r,c,u,a,d,f,m,h,function(){o=w(this),n(2,o),n(1,i),n(0,l),n(1,i),n(5,u),n(4,c)},()=>{n(1,i=!i),n(0,l=0)}]}class ae extends G{constructor(t){super(),F(this,t,ie,le,c,{})}}function de(t,e,n){const o=t.slice();return o[11]=e[n],o[12]=e,o[13]=n,o}function fe(t){let e,n,o,r,c;function s(){t[7].call(e,t[12],t[13])}return{c(){e=f("input"),n=h(),o=f("br"),b(e,"placeholder","enter your name")},m(u,l){i(u,e,l),y(e,t[11].name),i(u,n,l),i(u,o,l),r||(c=g(e,"input",s),r=!0)},p(n,o){t=n,1&o&&e.value!==t[11].name&&y(e,t[11].name)},d(t){t&&a(e),t&&a(n),t&&a(o),r=!1,c()}}}function me(t){let e,n;return{c(){e=f("br"),n=f("strong"),n.textContent="some of these names are taken",b(n,"id","dup"),b(n,"class","svelte-1ge8e94")},m(t,o){i(t,e,o),i(t,n,o)},d(t){t&&a(e),t&&a(n)}}}function he(e){let n,r,c,s,u,p,y,v,w,k,x,N,_,S,C,E,T,O,L,I,K,M,P,j,B,A,H,R,U,q=e[2]?"☑":"☐",W=e[0],J=[];for(let t=0;t<W.length;t+=1)J[t]=fe(de(e,W,t));let D=e[1]&&me();return{c(){n=m("contestant(s), enter your name(s)"),r=f("br"),c=h(),s=f("strong"),s.textContent="hosts do not need to enter their names",u=h(),p=f("hr"),y=h();for(let t=0;t<J.length;t+=1)J[t].c();v=h(),w=f("button"),w.textContent="add contestant",k=h(),x=f("button"),N=m("remove contestant"),S=h(),D&&D.c(),C=h(),E=f("hr"),T=m("\ndoes this device need host access?"),O=f("br"),L=h(),I=f("button"),K=m(q),M=m("\n    host access"),P=h(),j=f("hr"),B=h(),A=f("button"),H=m("play"),z(s,"color","#88c0d0"),x.disabled=_=0===e[0].length,b(A,"class","large"),A.disabled=e[1]},m(t,o){i(t,n,o),i(t,r,o),i(t,c,o),i(t,s,o),i(t,u,o),i(t,p,o),i(t,y,o);for(let e=0;e<J.length;e+=1)J[e].m(t,o);i(t,v,o),i(t,w,o),i(t,k,o),i(t,x,o),l(x,N),i(t,S,o),D&&D.m(t,o),i(t,C,o),i(t,E,o),i(t,T,o),i(t,O,o),i(t,L,o),i(t,I,o),l(I,K),l(I,M),i(t,P,o),i(t,j,o),i(t,B,o),i(t,A,o),l(A,H),R||(U=[g(w,"mousedown",e[3]),g(x,"mousedown",e[4]),g(I,"mousedown",e[8]),g(A,"mousedown",e[5])],R=!0)},p(t,[e]){if(1&e){let n;for(W=t[0],n=0;n<W.length;n+=1){const o=de(t,W,n);J[n]?J[n].p(o,e):(J[n]=fe(o),J[n].c(),J[n].m(v.parentNode,v))}for(;n<J.length;n+=1)J[n].d(1);J.length=W.length}1&e&&_!==(_=0===t[0].length)&&(x.disabled=_),t[1]?D||(D=me(),D.c(),D.m(C.parentNode,C)):D&&(D.d(1),D=null),4&e&&q!==(q=t[2]?"☑":"☐")&&$(K,q),2&e&&(A.disabled=t[1])},i:t,o:t,d(t){t&&a(n),t&&a(r),t&&a(c),t&&a(s),t&&a(u),t&&a(p),t&&a(y),d(J,t),t&&a(v),t&&a(w),t&&a(k),t&&a(x),t&&a(S),D&&D.d(t),t&&a(C),t&&a(E),t&&a(T),t&&a(O),t&&a(L),t&&a(I),t&&a(P),t&&a(j),t&&a(B),t&&a(A),R=!1,o(U)}}}function pe(t,e,n){let o,r,c,l,i;s(t,X,(t=>n(0,r=t))),s(t,et,(t=>n(10,c=t))),s(t,ot,(t=>n(6,l=t))),s(t,Y,(t=>n(2,i=t)));let a=r.length;return t.$$.update=()=>{65&t.$$.dirty&&n(1,o=r.some((t=>Object.entries(l.scores).some((e=>e[0]===t.name)))))},[r,o,i,function(){u(X,r=[...r,{name:"",buzzKey:ct[a].code}],r),a++},function(){r.pop(),X.set(r),a--},function(){for(var t of r)t.name=t.name.trim();u(X,r=r.filter((t=>!!t.name)),r);for(const t of r)rt("/command",{action:"AddPlayer",name:t.name});u(et,c=!1,c)},l,function(t,e){t[e].name=this.value,X.set(r)},()=>u(Y,i=!i,i)]}class ge extends G{constructor(t){super(),F(this,t,pe,he,c,{})}}function be(t){let e,n,o,r,c,s,u,l,d;e=new qt({}),o=new It({});let f=t[1]&&ye();const m=[ve,ze],g=[];function b(t,e){return t[2]?0:1}return s=b(t),u=g[s]=m[s](t),{c(){q(e.$$.fragment),n=h(),q(o.$$.fragment),r=h(),f&&f.c(),c=h(),u.c(),l=p()},m(t,u){W(e,t,u),i(t,n,u),W(o,t,u),i(t,r,u),f&&f.m(t,u),i(t,c,u),g[s].m(t,u),i(t,l,u),d=!0},p(t,e){t[1]?f?2&e&&H(f,1):(f=ye(),f.c(),H(f,1),f.m(c.parentNode,c)):f&&(B(),R(f,1,1,(()=>{f=null})),A());let n=s;s=b(t),s!==n&&(B(),R(g[n],1,1,(()=>{g[n]=null})),A(),u=g[s],u||(u=g[s]=m[s](t),u.c()),H(u,1),u.m(l.parentNode,l))},i(t){d||(H(e.$$.fragment,t),H(o.$$.fragment,t),H(f),H(u),d=!0)},o(t){R(e.$$.fragment,t),R(o.$$.fragment,t),R(f),R(u),d=!1},d(t){J(e,t),t&&a(n),J(o,t),t&&a(r),f&&f.d(t),t&&a(c),g[s].d(t),t&&a(l)}}}function $e(e){let n,o;return n=new ge({}),{c(){q(n.$$.fragment)},m(t,e){W(n,t,e),o=!0},p:t,i(t){o||(H(n.$$.fragment,t),o=!0)},o(t){R(n.$$.fragment,t),o=!1},d(t){J(n,t)}}}function ye(t){let e,n;return e=new ae({}),{c(){q(e.$$.fragment)},m(t,o){W(e,t,o),n=!0},i(t){n||(H(e.$$.fragment,t),n=!0)},o(t){R(e.$$.fragment,t),n=!1},d(t){J(e,t)}}}function ze(t){let e,n;return e=new ne({}),{c(){q(e.$$.fragment)},m(t,o){W(e,t,o),n=!0},i(t){n||(H(e.$$.fragment,t),n=!0)},o(t){R(e.$$.fragment,t),n=!1},d(t){J(e,t)}}}function ve(t){let e,n;return e=new yt({}),{c(){q(e.$$.fragment)},m(t,o){W(e,t,o),n=!0},i(t){n||(H(e.$$.fragment,t),n=!0)},o(t){R(e.$$.fragment,t),n=!1},d(t){J(e,t)}}}function we(t){let e,n,r,c,s,u,l;const d=[$e,be],m=[];function p(t,e){return t[0]?0:1}return e=p(t),n=m[e]=d[e](t),{c(){n.c(),r=h(),c=f("div"),c.textContent="v3.1.2",b(c,"id","footer"),b(c,"class","svelte-1uqki10")},m(n,o){m[e].m(n,o),i(n,r,o),i(n,c,o),s=!0,u||(l=[g(window,"mousedown",t[3]),g(window,"keydown",t[4])],u=!0)},p(t,[o]){let c=e;e=p(t),e===c?m[e].p(t,o):(B(),R(m[c],1,1,(()=>{m[c]=null})),A(),n=m[e],n?n.p(t,o):(n=m[e]=d[e](t),n.c()),H(n,1),n.m(r.parentNode,r))},i(t){s||(H(n),s=!0)},o(t){R(n),s=!1},d(t){m[e].d(t),t&&a(r),t&&a(c),u=!1,o(l)}}}function ke(t,e,n){let o,r,c,l,i,a,d;s(t,ot,(t=>n(5,o=t))),s(t,tt,(t=>n(6,r=t))),s(t,nt,(t=>n(7,c=t))),s(t,X,(t=>n(8,l=t))),s(t,et,(t=>n(0,i=t))),s(t,Y,(t=>n(1,a=t))),s(t,Z,(t=>n(2,d=t)));var f=this&&this.__awaiter||function(t,e,n,o){return new(n||(n=Promise))((function(r,c){function s(t){try{l(o.next(t))}catch(t){c(t)}}function u(t){try{l(o.throw(t))}catch(t){c(t)}}function l(t){var e;t.done?r(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,u)}l((o=o.apply(t,e||[])).next())}))};function m(){return f(this,void 0,void 0,(function*(){yield async function(t){let e=await fetch(t);return await e.json()}("/state").then((t=>{u(ot,o=t,o)}))}))}function h(t){o.scores[t.name].blocked||fetch("/buzz",{method:"POST",headers:{"Content-Type":"text/plain"},body:t.name})}return setInterval((function(){return f(this,void 0,void 0,(function*(){let t;yield fetch("/marker").then((t=>t.arrayBuffer())).then((t=>new Uint8Array(t))).then((e=>{t=e[0],u(tt,r=!1,r)})).catch((()=>u(tt,r=!0,r))),t!==c&&(m(),u(nt,c=t,c))}))}),50),[i,a,d,function(t){let e=t.target,n=t.srcElement,o=["INPUT","BUTTON","SELECT"];if(!o.includes(e.tagName)&&!o.includes(n.tagName))for(const t of l)"Click"===t.buzzKey&&h(t)},function(t){for(const e of l)e.buzzKey===t.code&&h(e)}]}return new class extends G{constructor(t){super(),F(this,t,ke,we,c,{})}}({target:document.body,props:{}})}();
//# sourceMappingURL=bundle.js.map
