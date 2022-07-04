import { TTTSquare } from "./TTTSquare.js";

const styles = `
  section {
    display: grid;
    grid-template-areas:
      ". . ."
      ". . ."
      ". . .";
    gap: 0.5rem;

  }
`;

class TTTBoard extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>${styles}</style>
      <section>
        <slot name="square"></slot>
      </section>
    `;
  }

  connectedCallback() {
    const squareElms: NodeListOf<TTTSquare> = this.querySelectorAll(
      "ttt-square",
    );
    for (const [index, elm] of [...squareElms].entries()) {
      elm.dataset.square = String(index + 1); // Make the board squares 1-indexed
    }
  }
}

customElements.define("ttt-board", TTTBoard);
