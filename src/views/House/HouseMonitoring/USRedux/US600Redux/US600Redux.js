import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchTemp} from './Actions600';
import {CardBody} from "reactstrap";

class US600Redux extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onFetchTemp();
  }

  render() {
    const {loading, temp} = this.props;
    if (loading === true) {
      return (
        <div className="spinner-border" role="status">
          <span className="sr-only"> Loading...</span>
        </div>
      );
    }
    else {
      if ((temp.toString()).indexOf("ERROR") != -1) {
        return (
          <div>
            <h4> ERROR: No Data Available.
            </h4>
          </div>
        )
      }
      return (
        <div>
          <h4 key={temp}>
            Current Temperature: {temp} ºC
          </h4>
        </div>
      );

    }
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.Reducers600.loading,
    temp: state.Reducers600.temp,
    error: state.Reducers600.error
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchTemp: () => {
      dispatch(fetchTemp())
    }

  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(US600Redux);
