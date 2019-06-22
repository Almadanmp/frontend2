import React, {Component} from 'react';
import {fetchColdDay} from './Actions630';
import {Alert, Button, Card, CardBody, Collapse} from "reactstrap";
import connect from "react-redux/es/connect/connect";

class US630 extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: false,
      from: undefined,
      to: undefined
    };
  }

  componentDidMount() {
    this.props.onFetchColdDay(this.state.from, this.state.to);
  }


  toggle() {
    this.setState(state => ({collapse: !state.collapse}));
  }

  render() {
    const {loading} = this.props;
    const {cold} = this.props;
    if (loading === true) {
      return (
        <div className="spinner-border" role="status">
          <span className="sr-only"> Loading...</span>
        </div>
      );
    } else {
      return (
        <>
          <Button style={{direction: 'right'}} style={{backgroundColor: '#e4e5e6', marginBottom: '1rem'}}
                  onClick={this.toggle}
                  style={{backgroundColor: '#FFFFFF', marginBottom: '1rem'}}>Last coldest
            day (lower maximum temperature):</Button>
          <Collapse isOpen={this.state.collapse}>
            <h5
              key={cold.value}> {cold.toString().indexOf("ERROR") != -1 ? 'There is no data available' : 'The coldest day was ' + cold.date + ' and the temperature was ' + cold.value + 'ºC'} </h5>
          </Collapse>
        </>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.Reducers630.loading,
    cold: state.Reducers630.cold,
    error: state.Reducers630.error
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchColdDay: (from, to) => {
      dispatch(fetchColdDay({from, to}))
    }

  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(US630);
