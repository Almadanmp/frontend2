import React, {Component} from 'react';
import Helmet from 'react-helmet';
import DayPicker, {DateUtils} from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {Button} from "reactstrap";

class DatePickerWithTwoDates extends Component {

  constructor(props) {
    super(props);

    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      from: undefined,
      to: undefined,
    };
  }

  getInterval = () => {
    console.log("getInterval: " + JSON.stringify(this.props))
    this.props.getDates(this.state.from, this.state.to)
  }

  handleDayClick = (day) => {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
    this.getInterval();
  }
  handleDaysClick = () => {
    this.getInterval();
  }
  handleResetClick = () => {
    this.setState(this.getInitialState());
  }

  render() {
    console.log("render: " + JSON.stringify(this.props))
    const {from, to} = this.state;
    const modifiers = {start: from, end: to};
    return (
      <div className="RangeExample">
        <h6>
          {!from && !to && 'Please select the first day.'}
          {from && !to && 'Please select the last day.'}
          {from &&
          to &&
          `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
          {from &&
          to && (
            <button className="link" onClick={this.handleResetClick}>
              Reset
            </button>
          )}
        </h6>
        <DayPicker
          className="Selectable"
          numberOfMonths={this.props.numberOfMonths}
          selectedDays={[from, {from, to}]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
          dateFormat="yyyy/MM/dd"
        />

        <Helmet>
          <style>{`
  .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .Selectable .DayPicker-Day {
    border-radius: 0 !important;
  }
  .Selectable .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .Selectable .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
`}</style>
        </Helmet>
        <br>
      </br>
        <Button style={{backgroundColor: '#e4e5e6', marginBottom: '1rem'}} onClick={this.handleDaysClick}>
          Select Date
        </Button>
      </div>
    );
  }
}

export default DatePickerWithTwoDates;
