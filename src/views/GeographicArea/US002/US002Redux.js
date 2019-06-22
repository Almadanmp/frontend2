import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchGATs} from './Actions002';

class US002Redux extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onFetchTypes();
  }

  render() {
    const {listGATypes} = this.props;
    return (
      <>
        <label>
          <h5>Existing geographic area types:</h5>
          <p></p>
          {listGATypes.map(listGATypes => (
            <p key={listGATypes.id}>{'- ' + listGATypes.name}</p>
          ))}
        </label>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listGATypes: state.Reducer002.listGATypes
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchTypes: () => {
      dispatch(fetchGATs())
    }

  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(US002Redux);
