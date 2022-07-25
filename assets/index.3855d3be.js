var x=Object.defineProperty;var w=(a,e,t)=>e in a?x(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var c=(a,e,t)=>(w(a,typeof e!="symbol"?e+"":e,t),t),T=(a,e,t)=>{if(!e.has(a))throw TypeError("Cannot "+t)};var v=(a,e,t)=>{if(e.has(a))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(a):e.set(a,t)};var f=(a,e,t)=>(T(a,e,"access private method"),t);const q=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}};q();var p,y;class k{constructor(){v(this,p);c(this,"_ctx");c(this,"masterGain");c(this,"compressor");c(this,"output");this._ctx=new AudioContext,this.masterGain=this.ctx.createGain(),this.masterGain.gain.value=.5,this.masterGain.connect(this.ctx.destination),this.compressor=this.ctx.createDynamicsCompressor(),this.compressor.threshold.value=-24,this.compressor.knee.value=10,this.compressor.release.value=.5,this.compressor.connect(this.masterGain),this.output=this.compressor}get ctx(){return this._ctx.state==="suspended"&&this._ctx.resume(),this._ctx}click(e){let t=h.get("E3"),r=h.get("B7"),s=.08,o=.1,i=.01;e=="heavy"&&(t=h.get("E3"),r=h.get("B7"),s=1,o=.05,i=.01);const n=this.ctx.createOscillator();n.frequency.setValueAtTime(t,this.ctx.currentTime);const l=this.ctx.createOscillator();l.frequency.setValueAtTime(r,this.ctx.currentTime);const d=this.ctx.createGain();d.gain.setValueAtTime(s,this.ctx.currentTime),d.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+i);const u=this.ctx.createGain();u.gain.setValueAtTime(o,this.ctx.currentTime),u.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+i),n.connect(d),l.connect(u),d.connect(this.output),u.connect(this.output),n.start(),l.start(),n.stop(this.ctx.currentTime+i),l.stop(this.ctx.currentTime+i)}reset(){const e=[{pitch:h.get("E5"),duration:"S"},{pitch:h.get("B4"),duration:"S"},{pitch:h.get("E4"),duration:"H"}];f(this,p,y).call(this,{notes:e,meta:{bpm:140,style:"legato"}})}winner(){const e=[{pitch:h.get("B4"),duration:"S"},{pitch:h.get("E4"),duration:"S"},{pitch:h.get("E5"),duration:"H"}];f(this,p,y).call(this,{notes:e,meta:{bpm:140,style:"legato"}})}}p=new WeakSet,y=function(e){let r=0,s=0;e.meta.style==="staccato"?s=0:e.meta.style==="legato"&&(s=.75),e.notes.forEach(o=>{const i=M(e.meta.bpm,o.duration),n=this.ctx.currentTime+r,l=n+i,d=this.ctx.createOscillator();d.frequency.value=o.pitch;const u=this.ctx.createGain();u.gain.setValueAtTime(o.gain!==void 0?o.gain:.4,n),u.gain.exponentialRampToValueAtTime(.001,l+s),d.connect(u),u.connect(this.output),d.start(n),d.stop(l+s),r+=i})};const h=new Map([["E3",164.81],["B4",493.88],["E4",329.63],["E5",659.25],["B7",3951.07]]);function M(a,e){const r=60/a*4;switch(e){case"W":return r/1;case"H":return r/2;case"Q":return r/4;case"E":return r/8;case"S":return r/16}}const m=new k;function E(a){const e=new g(a),t=e.moves.length,r=S([...a],5e4);return G(r,e.currentPlayer,t)}function S(a,e){const t=[];for(;t.length<e;){const r=new g([...a]);for(;!r.isFinished;)r.addMove(b(r));t.push(r)}return t}function G(a,e,t){const r=[];if(a.filter(n=>{const l=n.winner.player;return l===e||l===void 0}).forEach(n=>r.push(n.moves[t].square)),r.length===0)return b(a[0]);const i=[...r.reduce((n,l)=>(n.has(l)?n.set(l,n.get(l)+1):n.set(l,1),n),new Map).entries()].sort((n,l)=>l[1]-n[1])[0];return{player:e,square:i[0]}}function b(a){const e=a.currentPlayer;let t=a.availableSquares[Math.floor(Math.random()*a.availableSquares.length)];if(a.moves.length===3){const r=a.moves.filter(o=>o.player==="x").map(o=>o.square);[[1,9],[3,7]].forEach(o=>{if(o.every(i=>r.includes(i))){const i=a.moves[1].square;t=[2,4,6,8].filter(n=>n!==i)[Math.floor(Math.random()*4)]}})}return{player:e,square:t}}const L=`
  :host {
    --square-gap: max(0.4rem, 1vmin);
    --game-padding:
        max(1rem, 5vw)
        max(2rem, 5vw);

    background-color: var(--gray-100);
    border: 1px solid var(--game-border-color);
    box-shadow: var(--game-box-shadow);
    padding: var(--game-padding);
    width: max(220px, 40vmin);
    transform: translateY(-2.5vh);
  }


  @media (orientation: landscape) {
    :host {
      transform: translateY(0);
    }
  }

  :host([data-current-player="x"]) {
    --bg-player-x: var(--gray-200);
    --border-player-x: 1px solid var(--gray-300);

    --bg-player-o: transparent;
    --border-player-o: none;
  }

  :host([data-current-player="o"]) {
    --bg-player-x: transparent;
    --border-player-x: none;

    --bg-player-o: var(--gray-200);
    --border-player-o: 1px solid var(--gray-300);
  }

  ::slotted([slot="feedback"]) {
    font-size: max(0.9rem, 1.5vmin);
    margin: max(0.5rem, 1.5vmin) 0;
    text-align: center;
    color: var(--gray-600);
    font-style: italic;
  }
  
  ::slotted([slot="reset"]) {
    width: 100%;
    font-size: max(0.8rem, 1.5vmin);
    text-transform: uppercase;
    letter-spacing: 0.4rem;

    padding: 0.4rem;
    
    color: var(--gray-700);
    background: var(--gray-100);
    border: 1px solid var(--gray-400);
    transition: all 100ms ease-in-out;
  }
  ::slotted([slot="reset"]:hover) {
    color: var(--gray-900);
    background: var(--gray-75);
    border: 1px solid var(--gray-500);

    box-shadow: var(--reset-button-hover-shadow);
  }
`;class P extends HTMLElement{constructor(){super();c(this,"game");c(this,"welcomeMessages",["Welcome! Let's play Tic-Tac-Toe!","Click on a square to start.","Good luck!","Have fun!","Let's play!","Let's play Tic Tac Toe!","It's your turn!","Let's go player X!","Get 3 in a row to win!","Here we go!","Player X goes first"]);const t=this.attachShadow({mode:"open"});t.innerHTML=`
      <style>${L}</style>
      <slot name="scoreboard"></slot>
      <slot name="board"></slot>
      <slot name="feedback"></slot>
      <slot name="reset"></slot>
    `,this.game=new g,this.initBoard()}get squares(){return this.querySelectorAll("ttt-square")}get randomWelcomeMessage(){return this.welcomeMessages[Math.floor(Math.random()*this.welcomeMessages.length)]}initBoard(){this.querySelectorAll("ttt-square").forEach(s=>{s.addEventListener("click",this.squareClickHandler.bind(this),{passive:!0})}),this.querySelector('[slot="reset"]').addEventListener("click",this.resetClickHandler.bind(this),{passive:!0}),this.dataset.currentPlayer="x",this.updateGameFeedback(this.randomWelcomeMessage)}resetBoard(){this.game=new g,this.dataset.currentPlayer="x",this.updateGameFeedback(this.randomWelcomeMessage),this.squares.forEach((t,r)=>{setTimeout(()=>{t.setAttribute("value",""),t.classList.remove("winning-square")},r*50)})}updateCurrentPlayer(){this.game.isFinished?this.dataset.currentPlayer="":this.dataset.currentPlayer=this.game.currentPlayer}updateGameFeedback(t=""){const r=this.querySelector('[slot="feedback"]');r.textContent=t||this.game.getGameStatus()}squareClickHandler(t){if(this.game.isFinished||this.game.currentPlayer==="o")return;const r=this.game.currentPlayer,s=Number(t.target.dataset.square);m.click("heavy"),this.processMove({player:r,square:s})}resetClickHandler(t){m.reset(),this.resetBoard()}processMove(t){var s;if(this.game.isFinished)return;try{this.game.addMove(t)}catch(o){let i;o instanceof Error?i=o.message:i=String(o),this.updateGameFeedback(i);return}if(this.querySelectorAll("ttt-square")[t.square-1].setAttribute("value",t.player),this.updateCurrentPlayer(),this.updateGameFeedback(),["x","o"].includes((s=this.game.winner.player)!=null?s:"")){const o=this.game.winner.squares;m.winner(),this.game.highlightWinningSquares(o);return}this.game.currentPlayer==="o"&&!this.game.isFinished&&setTimeout(()=>{this.addAIMove()},1e3)}addAIMove(){const t=E([...this.game.moves]);m.click(),this.processMove(t)}}class g{constructor(e=[]){c(this,"moves");this.moves=e}addMove(e){if(!this.isValidMove(e)[0])throw new Error(this.isValidMove(e)[1]);this.moves.push(e)}get currentPlayer(){return this.moves.length===0?"x":this.moves.at(-1).player==="x"?"o":"x"}isValidMove(e){let[t,r]=[!0,""];return e.square<=0||e.square>9?[t,r]=[!1,"Invalid square"]:e.player!==this.currentPlayer?[t,r]=[!1,`It's not ${e.player}'s turn`]:e.player!=="x"&&this.moves.length===0?[t,r]=[!1,"Player x goes first (currently)"]:this.moves.map(s=>s.square).includes(e.square)&&([t,r]=[!1,"That square has already been played"]),[t,r]}getGameStatus(){var e;return["x","o"].includes((e=this.winner.player)!=null?e:"")?this.winner.player==="x"?"\u2715 wins!":"\u25EF wins!":this.moves.length>=9?"Tie":"Game in progress\u2026"}get isFinished(){return this.getGameStatus()!=="Game in progress\u2026"}get availableSquares(){return[1,2,3,4,5,6,7,8,9].filter(e=>!this.moves.map(t=>t.square).includes(e))}highlightWinningSquares(e=[]){const t=document.querySelectorAll("ttt-square");e.forEach(r=>{t[r-1].classList.add("winning-square")})}get winner(){let e,t;const r=[[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]],s=[],o=[];return this.moves.forEach(i=>{i.player==="x"?s.push(i.square):i.player==="o"&&o.push(i.square)}),r.forEach(i=>{i.every(n=>s.includes(n))?(e="x",t=i):i.every(n=>o.includes(n))&&(e="o",t=i)}),{player:e,squares:t}}}customElements.define("ttt-game",P);const C=`
  h1 {
    font-size: max(2rem, 6vmin);
    letter-spacing: 0.1rem;
    color: var(--gray-900);
    text-align: center;
    margin: 0;
    margin-bottom: 2.5vh;
    text-transform: uppercase;
    font-weight: 100;
  }

  h2 {
    color: var(--gray-800);
    font-size: max(0.9rem, 2vmin);
    font-weight: 800;
    text-transform: uppercase;
    padding: 0.25rem 1rem;
    margin: 0 0 0.25rem 0;
    border-radius: 10rem;

    transition: background-color 0.5s ease-in-out;
  }

  p {
    color: var(--gray-400);
    font-size: max(0.6rem, 1.25vmin);
    font-weight: 700;
    text-transform: uppercase;
    margin: 0;
  }

  section {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  section [id^="player"] {
    flex-grow: 1;
    text-align: center;
  }

  #player-x h2 {
    background-color: var(--bg-player-x);
    border: var(--border-player-x);
  }

  #player-o h2 {
    background-color: var(--bg-player-o);
    border: var(--border-player-o);
  }
`;class H extends HTMLElement{constructor(){super();const e=this.attachShadow({mode:"open"});e.innerHTML=`
      <style>${C}</style>
      <h1>Tic Tac Toe</h1>
      <section>
        <div id="player-x">
          <h2>Player X</h2>
          <p>You</p>
        </div>

        <div id="player-o">
          <h2>Player O</h2>
          <p>AI</p>
        </div>
      </section>
    `}}customElements.define("ttt-scoreboard",H);const A=`
  :host {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: var(--square-gap);
  }

`;class F extends HTMLElement{constructor(){super();const e=this.attachShadow({mode:"open"});e.innerHTML=`
      <style>${A}</style>
      <slot></slot>
    `}connectedCallback(){const e=this.querySelectorAll("ttt-square");for(const[t,r]of[...e].entries())r.dataset.square=String(t+1)}}customElements.define("ttt-board",F);const B=`
button {
  color: var(--gray-800);
  background: var(--gray-50);
  width: 100%;
  aspect-ratio: 1;
  border: 1px solid black;
  padding: 0;
  margin: 0;

  font-size: 2.5rem;

  transition: background-color 1s; /* Transition to this state */
}

:host(.winning-square) button {
  background-color: var(--winning-square-background-color);
  transition: background-color 1ms; /* Transition to this state */
}
`;class I extends HTMLElement{constructor(){super();c(this,"xoMap");this.xoMap=new Map([["x","\u2715"],["o","\u25EF"]]);const t=this.attachShadow({mode:"open"});t.innerHTML=`
      <style>${B}</style>
      <button type="button"></button>
    `}static get observedAttributes(){return["value"]}attributeChangedCallback(t,r,s){var o;if(t==="value"){const i=this.shadowRoot.querySelector("button");i.innerHTML=(o=this.xoMap.get(s))!=null?o:"&nbsp;"}}}customElements.define("ttt-square",I);const O=`
  :host  {
    --width: 3rem;
    --height: clamp(1.5rem, 4vmin, 2rem);
    --icon-font-size: 1.15rem;
    --bottom-inset: 1.25rem;
    --right-inset: 2.5rem;

    position: absolute;
    bottom: var(--bottom-inset);
    right: var(--right-inset);

    height: var(--height);
    aspect-ratio: 1.6;
  }

  @media (min-width: 768px) {
    :host {
      --width: 4rem;
      --icon-font-size: 1.5rem;
      --bottom-inset: 1.5rem;
      --right-inset: 3rem;
    }
  }

  label {
    --rgb-color: rgb(var(--border-r), var(--border-g), var(--border-b));

    height: var(--height);
    display: flex;
    justify-content: center;
    
    border-radius: var(--height);
    background: var(--rgb-color);
    box-shadow: inset 0 0 0.35rem var(--gray-800);
  }

  label::before,
  label::after {
    font-size: var(--icon-font-size);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  /* Sun icon */
  label::before {
    content: "\\263C";
    right: 100%;
    margin-right: 0.25rem;
  }

  /* Moon icon */
  label::after {
    content: "\\263E";
    left: 100%;
    margin-left: 0.25rem;

  }

  /* Theme label */
  span {
    font-size: 0.3rem; /* Small to minimise chance of line wrapping */
    color: transparent;  /* Hide from UI. aria-label is used for screen readers */
    position: absolute;
    width: 100%;
  }

  /* Ball toggle */
  span::after {
    --ball-padding: 3px;
    --diameter: calc(var(--height) - var(--ball-padding) * 2);

    content: "";
    position: absolute;
    left: calc(0% + var(--ball-padding));
    
    width: var(--diameter);
    height: var(--diameter);
    background: var(--gray-800);
    border-radius: var(--diameter);
    box-shadow:
      inset 0 0 0   1px var(--gray-300),
      inset 0 0 2px 2px var(--gray-400),
      0 0 var(--ball-padding) var(--gray-300);

    transform: translateY(var(--ball-padding));
    transition: all 150ms ease-in-out;
  }

  input:checked + label span::after {
    left: calc(100% - var(--diameter) - var(--ball-padding));
  }

  input {
    opacity: 0;
    width: 1px;
    height: 1px;
    position: absolute;
  }

  .sr-only {
    border: 0 !important;
    clip: rect(1px, 1px, 1px, 1px) !important;
    -webkit-clip-path: inset(50%) !important;
    clip-path: inset(50%) !important;
    height: 1px !important;
    overflow: hidden !important;
    margin: -1px !important;
    padding: 0 !important;
    position: absolute !important;
    width: 1px !important;
    white-space: nowrap !important;
  }
`;class V extends HTMLElement{constructor(){super();c(this,"shadow");this.shadow=this.attachShadow({mode:"open"}),this.shadow.innerHTML=`
      <style>${O}</style>
      
      <!-- Checked = dark mode -->
      <input
        type="checkbox"
        id="theme-selector"
        checked
        aria-label="Use dark theme"
      />

      <label for="theme-selector">
        <span>Theme</span>
      </label>
    `,this.initThemeSelector(),this.setupThemeChangeListener(),this.setupThemeToggle()}initThemeSelector(){window.localStorage.getItem("theme")?this.setCurrentTheme(window.localStorage.getItem("theme")):window.matchMedia("(prefers-color-scheme: dark)").matches?this.setCurrentTheme("dark"):window.matchMedia("(prefers-color-scheme: light)").matches&&this.setCurrentTheme("light")}setupThemeChangeListener(){window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",r=>{this.setCurrentTheme(r.matches?"dark":"light")})}setupThemeToggle(){const t=this.shadow.querySelector("input");t.addEventListener("change",r=>{const s=r.target.checked?"dark":"light";this.setCurrentTheme(s)}),t.addEventListener("click",()=>{m.click()})}setCurrentTheme(t){if(!["light","dark"].includes(t))return;document.body.dataset.theme=t;const r=this.shadow.querySelector("input");r&&(r.checked=t==="dark"),window.localStorage.setItem("theme",t)}}customElements.define("theme-selector",V);
