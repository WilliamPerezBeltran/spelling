import * as React from 'react';

import { shallow } from 'enzyme';

import AppState from '../app-state';

import Letter from './Letter';

const appState = new AppState();

beforeEach(() => {
  appState.setTerm('test');
});

describe('<Form />', () => {
  it('renders withouth crashing', () => {
    const tapMock = jest.spyOn(appState, 'tap');
    const wrapper = shallow(
      <Letter
        index={0}
        char={appState.term.chars[0]}
        available={true}
        appState={appState}
      />
    );

    expect(wrapper.find('span')).toHaveLength(1);

    wrapper.simulate('click');
    expect(tapMock).toHaveBeenCalledWith(0);

    wrapper.setProps({ available: false });
    wrapper.simulate('click');
    expect(tapMock).toHaveBeenCalledTimes(1);
  });
});
