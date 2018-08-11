import { action, computed, observable } from 'mobx';

import Term from './Term';

const terms: string[] = ['engagement', 'beautiful', 'debugging', 'let down'];

class AppState {
  public term = new Term(terms[Math.floor(Math.random() * terms.length)]);
  @observable
  public inputArray: string[] = this.term.chars.map(() => '');

  @computed
  public get input(): string {
    return this.inputArray.join('');
  }

  @action
  public setInput(index: number, input: string) {
    this.inputArray[index] = input;
    this.term.update(this.input);

    if (input) {
      this.next(index);
    }
  }

  @action
  public tap(index: number) {
    const insertAt = this.inputArray.findIndex(char => char === '');
    this.inputArray[insertAt] = this.term.data[index].char;
    this.term.tap(index);

    this.next(insertAt);
  }

  public check() {
    if (this.input === this.term.original) {
      alert('YES!');
    } else {
      alert('NO, NO');
    }
  }

  private next(index: number) {
    const next = document.querySelector<HTMLFormElement>('form')!.elements[
      index + 1
    ] as HTMLInputElement;
    next.focus();
  }
}

export default AppState;
