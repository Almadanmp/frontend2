import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchTotalRainfallDay} from './USRedux/US620Redux/Actions620';
import {Alert, Button, Card, CardBody, Collapse} from "reactstrap";
import DatePickerOneDay620 from "./USRedux/US620Redux/DatePickerOneDay620.js";

class US620 extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: false,
      selectedDay: undefined
    };
  }

  componentDidMount() {
    this.props.onFetchTotalRainfall(this.state.selectedDay);
  }

  handleDayPicker = (selectedDay) => {

    console.log("handleDayPicker:" + JSON.stringify(selectedDay))
    if (selectedDay !== undefined) {
      const initialDay = selectedDay.toISOString().substring(0, 10);
      this.setState({selectedDay: selectedDay});
      this.props.onFetchTotalRainfall(initialDay)

    }
  }

  toggle() {
    this.setState(state => ({collapse: !state.collapse}));
  }

  render() {
    const {totalRainfall} = this.props;
    const numberOfMonths = 1;


          return (
            <>
                  <CardBody>
                    <DatePickerOneDay620 getDays={this.handleDayPicker} numberOfMonths={numberOfMonths}/>

                    <h5 key={totalRainfall}>
                    {totalRainfall.toString().indexOf("ERROR") != 0 ? 'There is no data available, please select another day' : 'The total rainfall was' + totalRainfall} </h5>

                  </CardBody>
            </>
          );
        }

}

const mapStateToProps = (state) => {
  return {
    loading: state.Reducers620.loading,
    totalRainfall: state.Reducers620.totalRainfall,
    error: state.Reducers620.error
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchTotalRainfall: (selectedDay) => {
      dispatch(fetchTotalRainfallDay({selectedDay}))
    }

  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(US620);
