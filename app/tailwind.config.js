import { preset as Core } from "@sk-web-gui/core";

/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",

    "./node_modules/@sk-web-gui/*/dist/**/*.js",
  ],
  darkMode: "class", // or 'media' or 'class'
  important: "#wisserroot",
  corePlugins: {
    preflight: false,
  },

  blocklist: [],
  theme: {
    extend: {
      spacing: {
        assistanttop: "var(--sk-spacing-assistanttop)",
        assistantbottom: "var(--sk-spacing-assistantbottom)",
        assistantleft: "var(--sk-spacing-assistantleft)",
        assistantright: "var(--sk-spacing-assistantright)",
      },
    },
  },
  presets: [
    Core({ plugin: { cssBase: false, components: ["AICornerModule"] } }),
  ],
};
