import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Collapse} from "reactstrap";
import {fetchRainfall} from "./Actions623";

class US623 extends Component {
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
    this.props.onFetchAverageRainfall(this.state.from, this.state.to);
  }

  toggle() {
    this.setState(state => ({collapse: !state.collapse}));
  }

  render() {
    const {loading} = this.props;
    const {rainfall} = this.props;
    if (loading === true) {
      return (
        <div className = "spinner-border" role = "status" >
        <span className = "sr-only" > Loading...</span>
        </div>
      );
    } else {
      return (
        <>
          <Button style={{direction: 'right'}} style={{backgroundColor: '#e4e5e6', marginBottom: '1rem'}}
                  onClick={this.toggle}
                  style={{backgroundColor: '#FFFFFF', marginBottom: '1rem'}}> Average rainfall:</Button>
          <Collapse isOpen={this.state.collapse}>
            <h5
              key={rainfall}> {rainfall.toString().indexOf("ERROR") != -1 ? 'There is no data available' : 'The average rainfall was ' + rainfall + '%'} </h5>
          </Collapse>
        </>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.Reducers623.loading,
    rainfall: state.Reducers623.rainfall,
    error: state.Reducers623.error
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchAverageRainfall: (from, to) => {
      dispatch(fetchRainfall({from, to}))
    }

  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(US623);
