var w=Object.defineProperty;var T=(o,t,e)=>t in o?w(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var d=(o,t,e)=>(T(o,typeof t!="symbol"?t+"":t,e),e),q=(o,t,e)=>{if(!t.has(o))throw TypeError("Cannot "+e)};var f=(o,t,e)=>{if(t.has(o))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(o):t.set(o,e)};var b=(o,t,e)=>(q(o,t,"access private method"),e);const k=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function e(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerpolicy&&(n.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?n.credentials="include":a.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(a){if(a.ep)return;a.ep=!0;const n=e(a);fetch(a.href,n)}};k();var m,v;class M{constructor(){f(this,m);d(this,"ctx");d(this,"masterGain");this.ctx=new AudioContext,this.masterGain=this.ctx.createGain(),this.masterGain.gain.setValueAtTime(.15,0),this.masterGain.connect(this.ctx.destination),console.log("constructor")}click(t){let e=164.81,r=3951.07,a=.08,n=.1,s=.01;t=="heavy"&&(e=164.81,r=3951.07,a=1,n=.05,s=.01);const i=this.ctx.createOscillator();i.frequency.setValueAtTime(e,this.ctx.currentTime);const l=this.ctx.createOscillator();l.frequency.setValueAtTime(r,this.ctx.currentTime);const c=this.ctx.createGain();c.gain.setValueAtTime(a,this.ctx.currentTime),c.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+s);const h=this.ctx.createGain();h.gain.setValueAtTime(n,this.ctx.currentTime),h.gain.exponentialRampToValueAtTime(.001,this.ctx.currentTime+s),i.connect(c),l.connect(h),c.connect(this.masterGain),h.connect(this.masterGain),i.start(),l.start(),i.stop(this.ctx.currentTime+s),l.stop(this.ctx.currentTime+s)}reset(){b(this,m,v).call(this,659.25,493.88,329.63)}winner(){b(this,m,v).call(this,493.88,329.63,659.25)}}m=new WeakSet,v=function(t,e,r){const n=.22499999999999998,s=.025,i=.4,l=.075*2+s*2+n,c=this.ctx.createOscillator();c.frequency.setValueAtTime(t,this.ctx.currentTime);const h=this.ctx.createOscillator();h.frequency.setValueAtTime(e,this.ctx.currentTime);const p=this.ctx.createOscillator();p.frequency.setValueAtTime(r,this.ctx.currentTime);const u=this.ctx.createGain();u.gain.setValueAtTime(i,this.ctx.currentTime),u.gain.exponentialRampToValueAtTime(i*.1,this.ctx.currentTime+l),c.connect(u),h.connect(u),p.connect(u),u.connect(this.masterGain),c.start(this.ctx.currentTime),c.stop(this.ctx.currentTime+.075),h.start(this.ctx.currentTime+.075+s),h.stop(this.ctx.currentTime+.075+s+.075),p.start(this.ctx.currentTime+.075+s+.075+s),p.stop(this.ctx.currentTime+l)};var g=new M;function E(o){const t=new y(o),e=t.moves.length,r=S([...o],5e4);return G(r,t.currentPlayer,e)}function S(o,t){const e=[];for(;e.length<t;){const r=new y([...o]);for(;!r.isFinished;)r.addMove(x(r));e.push(r)}return e}function G(o,t,e){const r=[];if(o.filter(i=>{const l=i.winner.player;return l===t||l===void 0}).forEach(i=>r.push(i.moves[e].square)),r.length===0)return x(o[0]);const s=[...r.reduce((i,l)=>(i.has(l)?i.set(l,i.get(l)+1):i.set(l,1),i),new Map).entries()].sort((i,l)=>l[1]-i[1])[0];return{player:t,square:s[0]}}function x(o){const t=o.currentPlayer;let e=o.availableSquares[Math.floor(Math.random()*o.availableSquares.length)];if(o.moves.length===3){const r=o.moves.filter(n=>n.player==="x").map(n=>n.square);[[1,9],[3,7]].forEach(n=>{if(n.every(s=>r.includes(s))){const s=o.moves[1].square;e=[2,4,6,8].filter(i=>i!==s)[Math.floor(Math.random()*4)]}})}return{player:t,square:e}}const L=`
  :host {
    background-color: var(--gray-100);
    border: 1px solid var(--game-border-color);
    box-shadow: var(--game-box-shadow);
    padding: 2rem 3rem;
  }

  :host([data-current-player="x"]) {
    --bg-player-x: var(--gray-300);
    --bg-player-o: transparent;
    
    --border-player-x: 1px solid var(--gray-200);
    --border-player-o: none;
  }

  :host([data-current-player="o"]) {
    --bg-player-x: transparent;
    --bg-player-o: var(--gray-300);

    --border-player-x: none;
    --border-player-o: 1px solid var(--gray-200);
  }

  ::slotted([slot="feedback"]) {
    text-align: center;
  }
  
  ::slotted([slot="reset"]) {
    width: 100%;
    font-size: 0.8rem;
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
`;class F extends HTMLElement{constructor(){super();d(this,"game");d(this,"welcomeMessages",["Welcome to Tic Tac Toe! It's your turn.","Click on a square to start.","Good luck!","Have fun!","Let's play!","Let's play Tic Tac Toe!","It's your turn!","Let's go player X!","Get 3 in a row to win!","Here we go!","Player X goes first"]);const e=this.attachShadow({mode:"open"});e.innerHTML=`
      <style>${L}</style>
      <slot name="scoreboard"></slot>
      <slot name="board"></slot>
      <slot name="feedback"></slot>
      <slot name="reset"></slot>
    `,this.game=new y,this.initBoard()}get squares(){return this.querySelectorAll("ttt-square")}get randomWelcomeMessage(){return this.welcomeMessages[Math.floor(Math.random()*this.welcomeMessages.length)]}initBoard(){this.querySelectorAll("ttt-square").forEach(a=>{a.addEventListener("click",this.squareClickHandler.bind(this),{passive:!0})}),this.querySelector('[slot="reset"]').addEventListener("click",this.resetClickHandler.bind(this),{passive:!0}),this.dataset.currentPlayer="x",this.updateGameFeedback(this.randomWelcomeMessage)}resetBoard(){this.game=new y,this.dataset.currentPlayer="x",this.updateGameFeedback(this.randomWelcomeMessage),this.squares.forEach((e,r)=>{setTimeout(()=>{e.setAttribute("value",""),e.classList.remove("winning-square")},r*50)})}updateCurrentPlayer(){this.game.isFinished?this.dataset.currentPlayer="":this.dataset.currentPlayer=this.game.currentPlayer}updateGameFeedback(e=""){const r=this.querySelector('[slot="feedback"]');r.textContent=e||this.game.getGameStatus()}squareClickHandler(e){if(this.game.isFinished||this.game.currentPlayer==="o")return;const r=this.game.currentPlayer,a=Number(e.target.dataset.square);g.click("heavy"),this.processMove({player:r,square:a})}resetClickHandler(e){g.reset(),this.resetBoard()}processMove(e){var a;if(this.game.isFinished)return;try{this.game.addMove(e)}catch(n){let s;n instanceof Error?s=n.message:s=String(n),this.updateGameFeedback(s);return}if(this.querySelectorAll("ttt-square")[e.square-1].setAttribute("value",e.player),this.updateCurrentPlayer(),this.updateGameFeedback(),["x","o"].includes((a=this.game.winner.player)!=null?a:"")){const n=this.game.winner.squares;g.winner(),this.game.highlightWinningSquares(n);return}this.game.currentPlayer==="o"&&!this.game.isFinished&&setTimeout(()=>{this.addAIMove()},1e3)}addAIMove(){const e=E([...this.game.moves]);g.click(),this.processMove(e)}}class y{constructor(t=[]){d(this,"moves");this.moves=t}addMove(t){if(!this.isValidMove(t)[0])throw new Error(this.isValidMove(t)[1]);this.moves.push(t)}get currentPlayer(){return this.moves.length===0?"x":this.moves.at(-1).player==="x"?"o":"x"}isValidMove(t){let[e,r]=[!0,""];return t.square<=0||t.square>9?[e,r]=[!1,"Invalid square"]:t.player!==this.currentPlayer?[e,r]=[!1,`It's not ${t.player}'s turn`]:t.player!=="x"&&this.moves.length===0?[e,r]=[!1,"Player x goes first (currently)"]:this.moves.map(a=>a.square).includes(t.square)&&([e,r]=[!1,"That square has already been played"]),[e,r]}getGameStatus(){var t;return["x","o"].includes((t=this.winner.player)!=null?t:"")?this.winner.player==="x"?"\u2715 wins!":"\u25EF wins!":this.moves.length>=9?"Tie":"Game in progress\u2026"}get isFinished(){return this.getGameStatus()!=="Game in progress\u2026"}get availableSquares(){return[1,2,3,4,5,6,7,8,9].filter(t=>!this.moves.map(e=>e.square).includes(t))}highlightWinningSquares(t=[]){const e=document.querySelectorAll("ttt-square");t.forEach(r=>{e[r-1].classList.add("winning-square")})}get winner(){let t,e;const r=[[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]],a=[],n=[];return this.moves.forEach(s=>{s.player==="x"?a.push(s.square):s.player==="o"&&n.push(s.square)}),r.forEach(s=>{s.every(i=>a.includes(i))?(t="x",e=s):s.every(i=>n.includes(i))&&(t="o",e=s)}),{player:t,squares:e}}}customElements.define("ttt-game",F);const A=`
  h1 {
    font-size: 2.25rem;
    letter-spacing: 0.1rem;
    color: var(--gray-900);
    text-align: center;
    margin: 0;
    margin-bottom: 1rem;
    text-transform: uppercase;
    font-weight: 100;
  }

  h2 {
    color: var(--gray-800);
    font-weight: 400;
    margin: 0;
    margin-bottom: 0.25rem;
  }

  p {
    color: var(--gray-500);
    font-size: 0.9rem;
    margin: 0;
  }

  section {
    display: flex;
    gap:1rem;
    margin-bottom: 1rem;
  }

  section [id^="player"] {
    flex-grow: 1;
    text-align: center;
    padding: 1rem;

    transition: background-color 0.5s ease-in-out;
  }

  #player-x {
    background-color: var(--bg-player-x);
    border: var(--border-player-x);
  }

  #player-o {
    background-color: var(--bg-player-o);
    border: var(--border-player-o);
  }
`;class C extends HTMLElement{constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
      <style>${A}</style>
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
    `}}customElements.define("ttt-scoreboard",C);const P=`
  section {
    display: grid;
    grid-template-areas:
      ". . ."
      ". . ."
      ". . .";
    gap: 0.5rem;

  }
`;class H extends HTMLElement{constructor(){super();const t=this.attachShadow({mode:"open"});t.innerHTML=`
      <style>${P}</style>
      <section>
        <slot name="square"></slot>
      </section>
    `}connectedCallback(){const t=this.querySelectorAll("ttt-square");for(const[e,r]of[...t].entries())r.dataset.square=String(e+1)}}customElements.define("ttt-board",H);const I=`
button {
  --square-size: 100px;

  color: var(--gray-800);
  background: var(--gray-0);

  width: var(--square-size);  /* Might not be necessary if using grid */
  height: var(--square-size);
  border: 1px solid black;
  padding: 0.5rem;

  font-size: calc(var(--square-size) * 0.5);

  transition: background-color 1s; /* Transition to this state */
}

:host(.winning-square) button {
  background-color: var(--winning-square-background-color);
  transition: background-color 1ms; /* Transition to this state */
}
`;class O extends HTMLElement{constructor(){super();d(this,"xoMap");this.xoMap=new Map([["x","\u2715"],["o","\u25EF"]]);const e=this.attachShadow({mode:"open"});e.innerHTML=`
      <style>${I}</style>
      <button type="button"></button>
    `}static get observedAttributes(){return["value"]}attributeChangedCallback(e,r,a){var n;if(e==="value"){const s=this.shadowRoot.querySelector("button");s.textContent=(n=this.xoMap.get(a))!=null?n:null}}}customElements.define("ttt-square",O);const V=`
  :host  {
    --width: 3rem;
    --height: 1.5rem;
    --bottom-inset: 2.1rem;
    --right-inset: 3rem;

    position: absolute;
    bottom: var(--bottom-inset);
    right: var(--right-inset);

    width: var(--width);
    height: var(--height);

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
    font-size: 1.15rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  /* Sun icon */
  label::before {
    content: "\\263C";
    right: 100%;
    margin-right: 0.5rem;
  }

  /* Moon icon */
  label::after {
    content: "\\263E";
    left: 100%;
    margin-left: 0.5rem;

  }

  /* Theme label */
  span {
    --label-top-padding: 0.25rem;
    --label-height: 1rem;
    --font-size: 0.7rem;
    --label-y-offset: calc(var(--height) + var(--label-top-padding));

    color: var(--gray-500);
    font-size: var(--font-size);
    text-align: center;
    text-transform: uppercase;

    position: absolute;
    height: var(--label-height);
    width: 100%;
    transform: translateY(var(--label-y-offset));
  }

  /* Ball toggle */
  span::after {
    --ball-padding: 3px;
    --diameter: calc(var(--height) - var(--ball-padding) * 2);
    --ball-y-offset: calc(-1 * var(--label-y-offset) + var(--ball-padding));

    content: "";
    position: absolute;
    left: calc(0% + var(--ball-padding));
    
    width: var(--diameter);
    height: var(--diameter);
    background: var(--gray-900);
    border-radius: var(--diameter);
    box-shadow:
      inset 0 0 0   1px var(--gray-300),
      inset 0 0 2px 2px var(--gray-400),
      0 0 var(--ball-padding) var(--gray-300);
      

    transform: translateY(var(--ball-y-offset));
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
`;class z extends HTMLElement{constructor(){super();d(this,"shadow");this.shadow=this.attachShadow({mode:"open"}),this.shadow.innerHTML=`
      <style>${V}</style>
      
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
    `,this.initThemeSelector(),this.setupThemeChangeListener(),this.setupThemeToggle()}initThemeSelector(){window.localStorage.getItem("theme")?this.setCurrentTheme(window.localStorage.getItem("theme")):window.matchMedia("(prefers-color-scheme: dark)").matches?this.setCurrentTheme("dark"):window.matchMedia("(prefers-color-scheme: light)").matches&&this.setCurrentTheme("light")}setupThemeChangeListener(){window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",r=>{this.setCurrentTheme(r.matches?"dark":"light")})}setupThemeToggle(){const e=this.shadow.querySelector("input");e.addEventListener("change",r=>{const a=r.target.checked?"dark":"light";this.setCurrentTheme(a)}),e.addEventListener("click",()=>{g.click()})}setCurrentTheme(e){if(!["light","dark"].includes(e))return;document.body.dataset.theme=e;const r=this.shadow.querySelector("input");r&&(r.checked=e==="dark"),window.localStorage.setItem("theme",e)}}customElements.define("theme-selector",z);
