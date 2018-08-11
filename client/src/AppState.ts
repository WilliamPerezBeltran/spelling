import { action, computed, observable } from 'mobx';

import Term from './Term';

const terms: string[] = ['engagement', 'beautiful', 'debugging', 'let down'];

class AppState {
  public term = new Term(terms[Math.floor(Math.random() * terms.length)]);
  @observable
  public inputArray: string[] = this.term.chars.map(() => '');
  @observable
  public focusIndex: number = 0;

  @computed
  public get input(): string {
    return this.inputArray.join('');
  }

  @action
  public setInput(index: number, input: string) {
    this.inputArray[index] = input;
    this.term.update(this.input);

    this.setFocus(input ? index + 1 : index);
  }

  @action
  public tap(index: number) {
    const insertAt = this.inputArray.findIndex(char => char === '');
    this.inputArray[insertAt] = this.term.data[index].char;
    this.term.tap(index);

    this.setFocus(insertAt + 1);
  }

  public check() {
    if (this.input === this.term.original) {
      alert('YES!');
    } else {
      alert('NO, NO');
    }
  }

  @action
  private setFocus(index: number) {
    if (index > -1 && index < this.term.length) {
        this.focusIndex = index;
    }
  }
}

export default AppState;
