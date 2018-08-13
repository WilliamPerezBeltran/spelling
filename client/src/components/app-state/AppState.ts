import { action, computed, observable } from 'mobx';

import Audio from '../audio';
import Term from '../term';

class AppState {
  public static STEPS_COUNT = 3;
  @observable
  public term: Term;
  @observable
  public nextTerm: Term = new Term('');
  @observable
  public inputArray: string[];
  @observable
  public focusIndex: number;
  @observable
  public checked: boolean;
  @observable
  public index: number = -1;
  @observable
  public loading: boolean = false;
  @observable
  public transitioning: boolean = false;

  public correctCount: number = 0;

  // User input
  @computed
  public get input(): string {
    return this.inputArray.join('');
  }

  // Ready to move to the next step
  @computed
  public get ready(): boolean {
    return !this.loading && this.nextTerm.length > 0;
  }

  @computed
  public get readyToCheck(): boolean {
    return this.input.length === this.term.length;
  }

  @computed
  public get atLastStep(): boolean {
    return this.index === AppState.STEPS_COUNT - 1;
  }

  // Done with the activities
  @computed
  public get done(): boolean {
    return this.atLastStep && this.checked;
  }

  // Prepare next term
  @action
  public setNextTerm(term: string) {
    this.nextTerm = new Term(term);
  }

  // Set User input
  @action
  public setInput(index: number, input: string) {
    this.inputArray[index] = input;
    this.term.update(this.inputArray);

    this.setFocus(input ? index + 1 : index);
  }

  // User tapped a letter
  @action
  public tap(index: number) {
    const insertAt = this.inputArray.findIndex(char => char === '');
    this.inputArray[insertAt] = this.term.data[index].char;
    this.term.tap(index);

    this.setFocus(insertAt + 1);
  }

  // Check activity
  @action
  public check() {
    this.checked = true;

    if (this.input !== this.term.original) {
      Audio.heartbeat();
      return false;
    }

    this.correctCount += 1;
    Audio.check();
    return true;
  }

  // Move to the next activity
  @action
  public next() {
    this.transitioning = true;

    setTimeout(() => {
      this.term = this.nextTerm;
      this.nextTerm = new Term('');
      this.reset();
      this.index += 1;
      this.transitioning = false;
    }, 1000);
  }

  @action
  public setLoading(value: boolean) {
    this.loading = value;
  }

  @action
  private setFocus(index: number) {
    if (index > -1 && index < this.term.length) {
      this.focusIndex = index;
    }
  }

  @action
  private reset() {
    this.inputArray = this.term.chars.map(() => '');
    this.focusIndex = 0;
    this.checked = false;
  }
}

export default AppState;
