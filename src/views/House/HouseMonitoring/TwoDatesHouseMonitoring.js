import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchHottestDay} from './USRedux/US631Redux/Actions631';
import {CardBody} from "reactstrap";
import DatePickerWithTwoDates from "./DatePickerWithTwoDates";
import {fetchColdDay} from "./USRedux/US630Redux/Actions630";
import {fetchAmplitude} from './USRedux/US633Redux/Actions633';
import US623 from "./USRedux/US623Redux/US623";
import US630 from "./USRedux/US630Redux/US630Redux";
import US631 from "./USRedux/US631Redux/US631Redux";
import US633 from "./USRedux/US633Redux/US633Redux";
import {fetchRainfall} from "./USRedux/US623Redux/Actions623";

class TwoDatesHouseMonitoring extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: false,
      from: undefined,
      to: undefined
    };
  }


  handleIntervalPicker = (from, to) => {

    console.log("handleIntervalPicker: from" + JSON.stringify(from) + "to: " + JSON.stringify(to));
    if (from !== undefined && to !== undefined) {
      const initialDay = from.toISOString().substring(0, 10);
      const finalDay = to.toISOString().substring(0, 10);
      this.setState({from: from, to: to});
      this.props.onFetchHottestDay(initialDay, finalDay);
      this.props.onFetchColdDay(initialDay, finalDay);
      this.props.onFetchAmplitude(initialDay, finalDay)
      this.props.onFetchAverageRainfall(initialDay, finalDay)
    }
  };

  toggle() {
    this.setState(state => ({collapse: !state.collapse}));
  }

  render() {
    const numberOfMonths = 2;
    return (
      <>
        <CardBody>
          <DatePickerWithTwoDates getDates={this.handleIntervalPicker} numberOfMonths={numberOfMonths}/>
          <p>
            <US623/>
          </p>
          <p>
            <US630/>
          </p>
          <p>
            <US631/>
          </p>
          <p>
            <US633/>
          </p>
        </CardBody>
      </>
    );
  }

}


const mapStateToProps = (state) => {
  return {
    loading: state.Reducers631.loading,
    hottestDay: state.Reducers631.hottestDay,
    errorHot: state.Reducers631.error,
    cold: state.Reducers630.cold,
    errorCold: state.Reducers630.error,
    amplitude: state.Reducers633.amplitude,
    errorAmplitude: state.Reducers633.error,
    rainfall: state.Reducers623.rainfall,
    errorRainfall: state.Reducers623.error
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchAverageRainfall: (from, to) => {
      dispatch(fetchRainfall({from, to}))
    },
    onFetchHottestDay: (from, to) => {
      dispatch(fetchHottestDay({from, to}))
    },
    onFetchColdDay: (from, to) => {
      dispatch(fetchColdDay({from, to}))
    },
    onFetchAmplitude: (from, to) => {
      dispatch(fetchAmplitude({from, to}))
    }

  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TwoDatesHouseMonitoring);
