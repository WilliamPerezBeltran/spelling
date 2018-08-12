import { action, computed, observable } from 'mobx';

import Audio from '../audio';
import Term from '../term';

const terms: string[] = ['nice', 'done', 'dog', 'get it'];

class AppState {
  public term = new Term(terms[Math.floor(Math.random() * terms.length)]);
  @observable
  public inputArray: string[] = this.term.chars.map(() => '');
  @observable
  public focusIndex: number = 0;
  @observable
  public checked: boolean = false;

  @computed
  public get input(): string {
    return this.inputArray.join('');
  }

  @computed
  public get ready(): boolean {
    return this.input.length === this.term.length;
  }

  @action
  public setInput(index: number, input: string) {
    this.inputArray[index] = input;
    this.term.update(this.inputArray);

    this.setFocus(input ? index + 1 : index);
  }

  @action
  public tap(index: number) {
    const insertAt = this.inputArray.findIndex(char => char === '');
    this.inputArray[insertAt] = this.term.data[index].char;
    this.term.tap(index);

    this.setFocus(insertAt + 1);
  }

  @action
  public check() {
    this.checked = true;

    if (this.input !== this.term.original) {
      Audio.heartbeat();
      return false;
    }

    Audio.check();
    return true;
  }

  @action
  private setFocus(index: number) {
    if (index > -1 && index < this.term.length) {
      this.focusIndex = index;
    }
  }
}

export default AppState;
