import * as React from "react";
import ReactDOM from "react-dom";
import { ClientApp } from "./components/client-app/client-app.component";
import type { ClientAppProperties } from "./components/client-app/client-app.component";

export default (initialState: ClientAppProperties, el: HTMLElement) => {
  ReactDOM.render(<ClientApp {...initialState} />, el);
};
