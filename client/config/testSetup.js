import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });

// Mock SpeechSynthesis API
class MockedSpeechSynthesisUtterance {}
MockedSpeechSynthesisUtterance.onend = null;
global.SpeechSynthesisUtterance = MockedSpeechSynthesisUtterance;

class MockedSpeechSynthesis {}
MockedSpeechSynthesis.speak = jest.fn();
global.speechSynthesis = MockedSpeechSynthesis;

class MockedAudio {
  play = () => {};
}
global.Audio = MockedAudio;
