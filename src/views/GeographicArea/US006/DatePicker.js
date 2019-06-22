import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {Button, Card, Collapse} from "reactstrap";

export default class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayChange = this.handleDayChange.bind(this);
    this.state = {
      selectedDay: undefined,
    };
  }
  handleDayChange(day) {
    this.setState({ selectedDay: day });
    this.getOneDay();
  }
  getOneDay = () => {
    console.log("getInterval: " + JSON.stringify(this.props))
    this.props.getDays(this.state.selectedDay)
  }

  handleDaysClick = () => {
    this.getOneDay();
  }
  render() {
    const { selectedDay } = this.state;
    return (
      <div>
        {selectedDay && <p>Day: {selectedDay.toLocaleDateString()}</p>}
        {!selectedDay}
        <DayPickerInput onDayChange={this.handleDayChange} />
        <p></p>
        <Button style={{backgroundColor: '#e4e5e6', marginBottom: '1rem'}} onClick={this.handleDaysClick}>
          Select date
        </Button>
      </div>
    );
  }
}
