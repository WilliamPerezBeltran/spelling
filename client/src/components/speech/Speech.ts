import { action, observable } from 'mobx';

class Speech {
  @observable
  public speaking = false;
  private synth = window.speechSynthesis;

  @action
  public speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    this.synth.speak(utterance);
    utterance.onend = this.onStop;
    this.speaking = true;
  }

  @action
  private onStop = () => {
    this.speaking = false;
  };
}

export default Speech;
