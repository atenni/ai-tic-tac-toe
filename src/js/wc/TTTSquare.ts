/**
 * Element representing one of nine squares on a Tic Tac Toe board.
 *
 * Each element has a `value` attribute which is 'x'|'o'|'' (empty).
 * When clicked, this attribute is updated to the value of the parent #game element's `currentPlayer` attribute.
 *
 * The element displays the value of the `value` attribute as a character.
 */

const styles = `
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
`;

export class TTTSquare extends HTMLElement {
  xoMap: Map<string, string>;

  static get observedAttributes() {
    return ["value"];
  }

  constructor() {
    super();

    this.xoMap = new Map([["x", "✕"], ["o", "◯"]]);

    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
      <style>${styles}</style>
      <button type="button"></button>
    `;
  }

  attributeChangedCallback(attrName: string, _: string, newVal: string) {
    if (attrName === "value") {
      const buttonElm = this.shadowRoot!.querySelector<HTMLButtonElement>(
        "button",
      );

      buttonElm!.innerHTML = this.xoMap.get(newVal) ?? "&nbsp;";
    }
  }
}

customElements.define("ttt-square", TTTSquare);
