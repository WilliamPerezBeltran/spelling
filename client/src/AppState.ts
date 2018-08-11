import { action, observable } from 'mobx';

import Term from './Term';

const terms: string[] = ['engagement', 'beautiful', 'debugging', 'let down'];

class AppState {
  public term = new Term(terms[Math.floor(Math.random() * terms.length)]);
  @observable
  public input = '';

  @action
  public setInput(input: string) {
    this.input = input;
    this.term.update(this.input);
  }

  @action
  public tap(index: number) {
    this.input = this.input.concat(this.term.data[index].char);
    this.term.tap(index);
  }

  public check() {
    if (this.input === this.term.original) {
      alert('YES!');
    } else {
      alert('NO, NO');
    }
  }
}

export default AppState;
