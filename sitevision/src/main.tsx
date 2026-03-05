import * as React from "react";
import { createRoot } from "react-dom/client";
import type { ClientAppProps } from "./components/client-app/client-app.component";
import { ClientApp } from "./components/client-app/client-app.component";

export default (initialState: ClientAppProps, el: HTMLElement) => {
  createRoot(el).render(<ClientApp {...initialState} />);
};
