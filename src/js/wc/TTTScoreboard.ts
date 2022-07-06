const styles = `
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
