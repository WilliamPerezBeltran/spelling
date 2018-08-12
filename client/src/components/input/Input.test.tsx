import * as React from 'react';

import { mount } from 'enzyme';

import AppState from '../app-state';

import Input from './Input';

const appState = new AppState();

describe('<Input />', () => {
  it('renders with refs', () => {
    const setInputMock = jest.spyOn(appState, 'setInput');
    const char = appState.term.chars[0];
    const wrapper = mount(<Input appState={appState} />);

    expect(wrapper.find('input')).toHaveLength(appState.term.length);

    wrapper
      .find('input')
      .first()
      .simulate('keydown', { which: 39 });

    wrapper
      .find('input')
      .first()
      .simulate('keypress', { key: char });

    wrapper
      .find('input')
      .first()
      .simulate('keypress', { key: '/' });

    appState.inputArray[0] = char;

    wrapper
      .find('input')
      .first()
      .simulate('change');
    expect(setInputMock).toHaveBeenCalledWith(0, char);
  });
});
