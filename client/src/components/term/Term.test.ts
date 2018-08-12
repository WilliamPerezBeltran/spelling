import Term from './Term';

const str = 'alright';

describe('Term', () => {
  it('initializes correctly', () => {
    const term = new Term(str);
    expect(term.original).toBe(str);
    expect(term.chars).toEqual(['a', 'l', 'r', 'i', 'g', 'h', 't']);
    expect(term.length).toBe(str.length);
  });

  it('updates data on input', () => {
    const term = new Term(str);
    const available = term.available;

    term.update(['']);
    expect(term.available).toEqual(available);

    term.update(['z']);
    expect(term.available).toEqual(available);

    term.update(['a', 't']);
    expect(term.available.sort()).toEqual(['l', 'r', 'i', 'g', 'h'].sort());
  });

  it('updates data on tap', () => {
    const term = new Term(str);
    let available = term.available;

    term.tap(0);
    available = available.slice(1);
    expect(term.available).toEqual(available);

    term.tap(term.chars.length - 1);
    available = available.slice(0, -1);
    expect(term.available).toEqual(available);
  });
});
