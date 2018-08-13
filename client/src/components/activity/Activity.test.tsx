import * as React from 'react';

import { shallow } from 'enzyme';

import AppState from '../app-state';
import Activity from './Activity';

const appState = new AppState();

beforeEach(() => {
  appState.setTerm('test');
});

describe('<Form />', () => {
  it('renders withouth crashing', () => {
    const checkMock = jest.spyOn(appState, 'check');
    const wrapper = shallow(<Activity appState={appState} />);

    expect(wrapper.find('form')).toHaveLength(1);

    wrapper.find('form').simulate('submit', { preventDefault: () => true });

    appState.inputArray = appState.term.chars;
    wrapper.find('form').simulate('submit', { preventDefault: () => true });

    expect(checkMock).toHaveBeenCalledTimes(1);
  });
});
