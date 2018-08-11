import { action, computed, observable } from 'mobx';

interface ILetter {
  char: string;
  available: boolean;
}

class Term {
  public original: string;
  @observable
  public data: ILetter[];

  constructor(term: string) {
    this.original = term;
    this.data = term
      .split('')
      .reduce(
        (memo: string[], letter: string) =>
          memo.splice(Math.floor(Math.random() * memo.length), 0, letter) &&
          memo,
        []
      )
      .map(letter => ({ char: letter, available: true }));
  }

  public get chars(): string[] {
    return this.original.split('');
  }

  @computed
  get used(): ILetter[] {
    return this.data.filter(letter => !letter.available);
  }

  @computed
  get available(): ILetter[] {
    return this.data.filter(letter => letter.available);
  }

  @action
  public update(input: string) {
    const data = this.data.map(({ char, available }) => ({
      available: true,
      char
    }));

    input.split('').forEach(char => {
      const foundIndex = data.findIndex(
        letter => letter.available && letter.char === char
      );
      if (foundIndex > -1) {
        data[foundIndex].available = false;
      }
    });

    this.data = data;
  }

  @action
  public tap(index: number) {
    const data = this.data.map(({ char, available }, i) => ({
      available: index === i ? false : available,
      char
    }));

    this.data = data;
  }
}

export default Term;
