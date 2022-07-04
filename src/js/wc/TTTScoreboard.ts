const styles = `
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
`;

class TTTScoreboard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>${styles}</style>
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
    `;
  }
}

customElements.define("ttt-scoreboard", TTTScoreboard);

export {};
