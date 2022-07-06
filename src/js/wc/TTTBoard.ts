import { TTTSquare } from "./TTTSquare.js";

const styles = `
  :host {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: var(--square-gap);
  }

`;

class TTTBoard extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>${styles}</style>
      <slot></slot>
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
