import AppState from './AppState';

const appState = new AppState();

beforeEach(() => {
  appState.setTerm('test');
});

describe('AppState', () => {
  it('initializes correctly', () => {
    expect(appState.term.original.length).toBeGreaterThan(0);
    expect(appState.inputArray.length).toBe(appState.term.original.length);
    expect(appState.focusIndex).toBe(0);
  });

  it('handles input changes', () => {
    appState.setInput(0, appState.term.original[0]);
    appState.setInput(1, '');
    expect(appState.input).toBe(appState.term.original[0]);

    appState.tap(1);
    expect(appState.input).toBe(
      appState.term.original[0] + appState.term.data[1].char
    );
  });

  it('checks correct answer', () => {
    appState.term.chars.forEach((char, index) => {
      appState.setInput(index, char);
    });

    expect(appState.check()).toBeTruthy();
  });

  it('checks wrong answer', () => {
    appState.term.available.forEach((char, index) => {
      appState.setInput(index, char);
    });

    expect(appState.check()).toBeFalsy();
  });
});
