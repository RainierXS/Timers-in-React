import React, { Component } from 'react';
import './App.css';
import Timers from './components/timers'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      timers: []
    };
  }

  addTimer(timer){
    let timers = this.state.timers;
    let counter = this.state.counter + 1;
    timers.push(timer);
    this.setState({counter,timers});
  }

  deleteTimer(id){
    let timers = this.state.timers.filter(timer => timer.id !== id);
    this.setState({timers})
  }

  render() {
    return (
      <div className="App container-fluid">
        <Timers
          timers={this.state.timers}
          id={this.state.counter}
          handleNewTimer={(timer) => this.addTimer(timer)}
          handleTimerClear={(id) => this.deleteTimer(id)}
        />
      </div>
    );
  }
}

export default App;
