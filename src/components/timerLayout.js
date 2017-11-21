import React,{Component} from 'react';

class timerLayout extends Component{
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      titleTerm: "",
      title: null,
      time:'00:00:00',
      hourInt:0,
      minInt:0,
      secInt:0,
      timeout: null,
      started: false
    };

    //#region  ******USED FOR TIMER******//
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.clear = this.clear.bind(this);
    this.add = this.add.bind(this);
    this.setTime = this.setTime.bind(this);
    //#endregion**************************//

    this.onTitleFormSubmit = this.onTitleFormSubmit.bind(this);
    this.onTitleInputChange = this.onTitleInputChange.bind(this);
  }

  setTitle(){
    if(!this.state.title){
      return (
        <form className="form-inline" onSubmit={this.onTitleFormSubmit} >
          <input
            type="text"
            name="title"
            className="form-control"
            style={{width: 145+"px"}}
            onChange={this.onTitleInputChange}
            value={this.state.titleTerm}
            placeholder="Enter Timer Title"
          />
          <input type="submit" value="Submit" className="btn btn-primary" />
        </form>
      )
    }else{
      return <h2>{this.state.title}</h2>
    }
  }

  onTitleInputChange(event){
    this.setState({titleTerm: event.target.value})
  }

  onTitleFormSubmit(event){
    event.preventDefault();
    this.setState({title: this.state.titleTerm});
  }

//#region timer functions
  start() {
    let timeout = setTimeout(this.add, 1000);
    this.setState({ timeout: timeout, started: true });
  }

  pause() {
    clearTimeout(this.state.timeout);
    this.setState({started:false});
  }

  clear() {
    clearTimeout(this.state.timeout);
    this.props.handleTimerClear(this.props.id)
  }

  add() {
    let seconds = this.state.secInt,
        minutes = this.state.minInt,
        hours = this.state.hourInt;

    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
      if (minutes >= 60) {
        minutes = 0;
        hours++;
      }
    }
    this.setState({
      secInt: seconds,
      minInt: minutes,
      hourInt: hours
    });

    this.setTime(seconds, minutes, hours);
    this.start();
  }

  setTime(secs, mins, hours) {
    let time;
    time = (hours ? (hours > 9 ? hours : '0' + hours) : '00') +
           ':' + (mins ? (mins > 9 ? mins : '0' + mins) : '00') +
           ':' + (secs ? (secs > 9 ? secs : '0' + secs) : '00');
    this.setState({
      time: time
    });
  }
//#endregion timer functions

  render(){
    if(this.props.newTimer){
      return (
        <div className="timer-new timer col col-xs-4">
          <button className="add-timer" onClick={() => this.props.handleNewTimer({id: this.props.id, timer: this})}></button>
        </div>
      )
    }
    return (
      <div className="timer col col-xs-4">
        {this.setTitle()}
        <h1>{this.state.time}</h1>
        <button className="btn btn-block btn-primary" onClick={this.start} disabled={this.state.started}>Start</button>
        <button className="btn btn-block btn-primary" onClick={this.pause} disabled={!this.state.started}>Pause</button>
        <button className="btn btn-block btn-primary" onClick={this.clear}>Delete</button>
      </div>
    );
  }
}

export default timerLayout;
