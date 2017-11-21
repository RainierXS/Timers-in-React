import React from 'react';
import TimerLayout from './timerLayout';

const Timers = (props) => {
  const renderTimers = props.timers.map(({id}) => {
    return (
      <TimerLayout
        key={id}
        id={id}
        handleTimerClear={props.handleTimerClear}
      />
    );
  });

  return (
    <div className='timersContainer row'>
      {renderTimers}
      <TimerLayout
        id={props.id}
        handleNewTimer={props.handleNewTimer}
        newTimer
      />
    </div>
  )

};

export default Timers;
