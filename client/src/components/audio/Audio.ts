import check from '../../assets/audio/check.mp3';
import heartbeat from '../../assets/audio/heartbeat.mp3';
import tap from '../../assets/audio/tap.mp3';

class AudioInterface {
  public static check() {
    const audio = new Audio(check);
    audio.play();
  }

  public static heartbeat() {
    const audio = new Audio(heartbeat);
    audio.play();
  }

  public static tap() {
    const audio = new Audio(tap);
    audio.play();
  }
}

export default AudioInterface;
