// For some reason dialog-polyfill behaves well with regular browsers that
// support the <dialog> element, but in our tests it complains:
// “This browser already supports <dialog>, the polyfill may not work correctly”
//
// Mocking dialog-polyfill disables the package completely (and gets rid of the
// warning-message)

jest.mock('dialog-polyfill');
