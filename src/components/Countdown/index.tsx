import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './index.module.scss';

export default class Countdown extends React.Component {
  static propTypes = {
    seconds: PropTypes.number.isRequired,
    label: PropTypes.string,
    loop: PropTypes.bool,
    customClass: PropTypes.string,
    onFinish: PropTypes.func
  };

  static defaultProps = {
    loop: false,
    label: 'Reserving your wines for',
    customClass: '',
    onFinish: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      seconds: props.seconds,
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState(prevState => {
        const end = this.props.loop ? this.props.seconds : 0;
        const remaining = prevState.seconds > 0 ? prevState.seconds - 1 : end;
        return { seconds: remaining };
      });
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { seconds } = this.state;
    if (seconds === 0) {
      this.props.onFinish();
    }
  }

  render() {
    const { label, customClass } = this.props;
    const { seconds } = this.state;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const counter = `00:${`0${minutes}`.slice(-2)}:${`0${remainingSeconds}`.slice(-2)}`;

    return (
      <div className={`${styles.countdown} ${customClass}`}>
        {label && <div className={`${styles.label} countdown-label`}>{label}</div>}
        <div className={`${styles.counter} countdown-counter`}>{counter}</div>
      </div>
    );
  }
}
