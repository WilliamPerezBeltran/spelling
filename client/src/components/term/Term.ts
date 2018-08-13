import { action, computed, observable } from 'mobx';

interface ILetter {
  char: string;
  available: boolean;
}

class Term {
  // Original, ordered term
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

  // Array of chars of the original term
  public get chars(): string[] {
    return this.original.split('');
  }

  public get length(): number {
    return this.original.length;
  }

  // Letters not used yet
  @computed
  get available(): string[] {
    return this.data
      .filter(letter => letter.available)
      .map(letter => letter.char);
  }

  @action
  public update(inputArray: string[]) {
    const data = this.data.map(({ char }) => ({
      available: true,
      char
    }));

    inputArray.forEach(char => {
      if (!char) {
        return;
      }

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
