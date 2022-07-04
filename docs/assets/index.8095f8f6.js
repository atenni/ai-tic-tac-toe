var l=Object.defineProperty;var d=(s,t,o)=>t in s?l(s,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):s[t]=o;var i=(s,t,o)=>(d(s,typeof t!="symbol"?t+"":t,o),o);const c=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}};c();const u=`
  :host {  
    background-color: hsla(0, 0%, 0%, 15%);
    padding: 3rem;
  }
  `;class b extends HTMLElement{constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
      <style>${u}</style>
      <slot name="board"></slot>
    `}connectedCallback(){document.querySelectorAll("[slot='square']").forEach(o=>{o.addEventListener("click",n=>{const e=this.dataset.currentPlayer||"";n.target.setAttribute("value",e),this.dataset.currentPlayer=e==="x"?"o":"x"})})}}customElements.define("ttt-game",b);const h=`
  section {
    display: grid;
    grid-template-areas:
      ". . ."
      ". . ."
      ". . .";
    gap: 0.5rem;

  }
`;class m extends HTMLElement{constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
      <style>${h}</style>
      <section>
        <slot name="square"></slot>
      </section>
    `}}customElements.define("ttt-board",m);const g=`
button {
  --square-size: 100px;

  width: var(--square-size);  /* Might not be necessary if using grid */
  height: var(--square-size);
  border: 1px solid black;
  background-color: rebecca-purple;
  padding: 0.5rem;

  font-size: calc(var(--square-size) * 0.5);
}
`;class p extends HTMLElement{constructor(){super();i(this,"xoMap");this.xoMap=new Map([["x","\u2715"],["o","\u25EF"]]);const o=this.attachShadow({mode:"open"});o.innerHTML=`
      <style>${g}</style>
      <button></button>
    `}static get observedAttributes(){return["value"]}attributeChangedCallback(o,n,e){var r;if(o==="value"&&this.xoMap.has(e)){const a=this.shadowRoot.querySelector("button");a.textContent=(r=this.xoMap.get(e))!=null?r:null}}}customElements.define("ttt-square",p);
