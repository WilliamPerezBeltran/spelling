import * as React from 'react';

import { shallow } from 'enzyme';

import AppState from './AppState';
import Form from './Form';

const appState = new AppState();

describe('<Form />', () => {
  it('renders withouth crashing', () => {
    const checkMock = jest.spyOn(appState, 'check');
    const wrapper = shallow(<Form appState={appState} />);

    expect(wrapper.find('form')).toHaveLength(1);
    expect(wrapper.find('input[type="submit"]')).toHaveLength(1);

    appState.inputArray = appState.term.chars;
    wrapper.find('form').simulate('submit', { preventDefault: () => true });
    expect(checkMock).toHaveBeenCalled();
  });
});
