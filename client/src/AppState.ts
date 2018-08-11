import { action, computed, observable } from 'mobx';

const terms: string[] = ['engagement', 'beautiful', 'debugging', 'let down'];

class AppState {
  @observable
  public term = terms[Math.floor(Math.random() * terms.length)];
  @observable
  public input = '';

  @computed
  public get letters(): string[] {
    return this.term
      .split('')
      .reduce(
        (a: string[], v: string) =>
          a.splice(Math.floor(Math.random() * a.length), 0, v) && a,
        []
      );
  }

  @computed
  public get used(): string[] {
    return this.input.split('');
  }

  @computed
  public get available(): string[] {
    const available: string[] = [...this.letters];

    this.used.forEach(letter => {
      available.splice(available.indexOf(letter), 1);
    });

    return available;
  }

  @action
  public setInput(input: string) {
    const available: string[] = [...this.letters];
    const allowed = input.split('').filter(letter => {
      const includes = available.includes(letter);
      available.splice(available.indexOf(letter), 1);
      return includes;
    });

    this.input = allowed.join('');
  }

  public check() {
    if (this.input === this.term) {
      alert('YES!');
    } else {
      alert('NO, NO');
    }
  }
}

export default AppState;
