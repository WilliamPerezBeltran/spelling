import { observable } from 'mobx';

const terms: string[] = ['engagement', 'beautiful', 'debugging', 'let down'];

class AppState {
  @observable
  public term = terms[Math.floor(Math.random() * terms.length)];

  public get letters(): string[] {
    return [...this.term.split('')].reduce(
      (a: string[], v: string) =>
        a.splice(Math.floor(Math.random() * a.length), 0, v) && a,
      []
    );
  }
}

export default AppState;
