import sounds from "../sounds";

const style = `
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
`;

type ThemeNames = "light" | "dark";

class ThemeSelector extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.innerHTML = `
      <style>${style}</style>
      
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
    `;

    this.initThemeSelector();
    this.setupThemeChangeListener();
    this.setupThemeToggle();
  }

  initThemeSelector() {
    // In order of priority:
    if (window.localStorage.getItem("theme")) {
      this.setCurrentTheme(window.localStorage.getItem("theme") as ThemeNames);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      this.setCurrentTheme("dark");
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      this.setCurrentTheme("light");
    }
  }

  setupThemeChangeListener() {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );
    darkModeMediaQuery.addEventListener("change", (e) => {
      this.setCurrentTheme(e.matches ? "dark" : "light");
    });
  }

  setupThemeToggle() {
    const themeSelectorElm = this.shadow.querySelector<HTMLInputElement>(
      "input",
    );

    themeSelectorElm!.addEventListener("change", (e) => {
      const theme = (e.target as HTMLInputElement).checked ? "dark" : "light";
      this.setCurrentTheme(theme);
    });

    themeSelectorElm!.addEventListener("click", () => {
      sounds.click();
    });
  }

  setCurrentTheme(theme: ThemeNames) {
    if (!["light", "dark"].includes(theme)) return;

    // Update <body data-theme="">
    document.body.dataset.theme = theme;

    // Update the selected input element
    const themeSelectorElm = this.shadow.querySelector<HTMLInputElement>(
      "input",
    );

    if (themeSelectorElm) {
      themeSelectorElm.checked = theme === "dark" ? true : false;
    }

    // Update localStorage
    window.localStorage.setItem("theme", theme);
  }
}

customElements.define("theme-selector", ThemeSelector);

export {};
