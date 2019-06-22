import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchAmplitude} from './Actions633';
import {Alert, Button, Card, CardBody, Collapse} from "reactstrap";

class US633Redux extends Component {
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
    this.props.onFetchAmplitude(this.state.from, this.state.to);
  }

  toggle() {
    this.setState(state => ({collapse: !state.collapse}));
  }

  render() {
    const {loading} = this.props;
    const {amplitude} = this.props;
    if (loading === true) {
      return (
        <div className="spinner-border" role="status">
          <span className="sr-only"> Loading...</span>
        </div>
      );
    }
    return (
      <div>
        <Button style={{backgroundColor: '#e4e5e6', marginBottom: '1rem'}} onClick={this.toggle}
                style={{backgroundColor: '#FFFFFF', marginBottom: '1rem'}}>The
          highest temperature amplitude: </Button>
        <Collapse isOpen={this.state.collapse}>


          <h5
            key={amplitude.value}> {amplitude.toString().indexOf("ERROR") != -1 ? 'There is no data available' : 'The highest amplitude was ' + amplitude.value + ' on the date ' + amplitude.date + 'ºC'}</h5>

        </Collapse>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.Reducers633.loading,
    amplitude: state.Reducers633.amplitude,
    error: state.Reducers633.error
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchAmplitude: (from, to) => {
      dispatch(fetchAmplitude({from, to}))
    }

  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(US633Redux);
