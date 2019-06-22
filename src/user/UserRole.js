import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUserRole} from "./ActionsUserRole";

class UserRole extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onFetchUserRole();
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.ReducersUserRole.loading,
    userRole: state.ReducersUserRole.userRole,
    error: state.ReducersUserRole.error
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUserRole: () => {
      dispatch(fetchUserRole())
    }

  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserRole);
