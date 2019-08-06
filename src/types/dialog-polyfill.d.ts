// Type definitions for dialog-polyfill
// Project: https://github.com/GoogleChrome/dialog-polyfill
// Definitions by: Ruben Swieringa <https://github.com/rubenswieringa>
// Definitions:

declare module 'dialog-polyfill' {
  const dialogPolyfill: {
    registerDialog: (element: HTMLElement) => void;
  };
  export default dialogPolyfill;
}
