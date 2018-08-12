import Speech from './Speech';

describe('Speech', () => {
  it('initializes correctly', () => {
    const speech = new Speech();
    expect(speech.speaking).toBeFalsy();

    speech.speak('hello');
    expect(speech.speaking).toBeTruthy();

    speech.onStop();
    expect(speech.speaking).toBeFalsy();
  });
});
