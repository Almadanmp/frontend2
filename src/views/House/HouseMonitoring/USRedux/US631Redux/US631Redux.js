import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchHottestDay} from './Actions631';
import {Alert, Button, Card, CardBody, Collapse} from "reactstrap";


class US631Redux extends Component {
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
    this.props.onFetchHottestDay(this.state.from, this.state.to);
  }

  toggle() {
    this.setState(state => ({collapse: !state.collapse}));
  }

  render() {
    const {loading} = this.props;
    const {hottestDay} = this.props;
    if (loading === true) {
      return (
        <div className="spinner-border" role="status">
          <span className="sr-only"> Loading...</span>
        </div>
      );
    }
    else {
      return (
        <div>
          <Button style={{backgroundColor: '#e4e5e6', marginBottom: '1rem'}} onClick={this.toggle}
                  style={{backgroundColor: '#FFFFFF', marginBottom: '1rem'}}>Hottest
            day (higher maximum temperature): </Button>
          <Collapse isOpen={this.state.collapse}>
            <h5
              key={hottestDay.value}>{hottestDay.toString().indexOf("ERROR") != -1 ? 'There is no data available' : 'The hottest day was ' + hottestDay.date + ' and the temperature was ' + hottestDay.value + 'ºC'}</h5>

          </Collapse>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.Reducers631.loading,
    hottestDay: state.Reducers631.hottestDay,
    error: state.Reducers631.error
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchHottestDay: (from, to) => {
      dispatch(fetchHottestDay({from, to}))
    }

  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(US631Redux);
