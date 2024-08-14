import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import css from "./index.css?inline";
import "./index.css";

export const initializeReactApp = (appElement, rootElement) => {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <App
        user={appElement.getAttribute("data-user")}
        hash={appElement.getAttribute("data-hash")}
        assistantId={
          appElement.getAttribute("data-assistant") ||
          import.meta.env.VITE_DEFAULT_ASSISTANT_ID
        }
        fontBase={appElement.getAttribute("data-fontbase")}
      />
    </React.StrictMode>
  );
};

class CustomAppComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const appElement = this.parentElement as HTMLTemplateElement;
    if (appElement) {
      // const templateContent = template.content;
      const shadowRoot = this.attachShadow({ mode: "open" });
      // create variable to attach the tailwind stylesheet
      const style = document?.createElement("style");

      // attach the stylesheet as text
      style.textContent = css;

      // apply the style
      shadowRoot.appendChild(style);

      const rootElement = document?.createElement("div");
      rootElement.setAttribute("id", "wisserroot");
      shadowRoot.appendChild(rootElement);

      if (rootElement) {
        initializeReactApp(appElement, rootElement);
      } else {
        console.error("Root element for React app not found.");
      }
    } else {
      console.error("Template not found in parent element.");
    }
  }
}

const container = document?.getElementById("wisser-assistant");

if (container) {
  if (container.getAttribute("data-shadow") === "false") {
    container.setAttribute("class", "wisserroot");
    container.setAttribute("id", "wisserroot");

    initializeReactApp(container, container);
  } else {
    customElements.define("wisser-shadow", CustomAppComponent);
    container.appendChild(document?.createElement("wisser-shadow"));
  }
}
