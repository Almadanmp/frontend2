import React from 'react';
import 'react-day-picker/lib/style.css';
import {Button} from "reactstrap";
import {deleteRoomFromGrid} from "../../US149/Actions149Hateoas";
import {connect} from 'react-redux';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


class RemoveFromGrid extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: this.props.name,
      grid: this.props.grid,
    };
  }

  submit = () => {
    confirmAlert({
      title: 'Confirm to remove',
      message: 'Are you sure to remove '+this.state.name+' from '+this.state.grid+'?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.handleSubmit()
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  handleSubmit() {
    this.props.onDeleteRoomFromGrid(this.state.name, this.props.link);
  }

  render() {
    return (
      <>
        <Button style={{backgroundColor: '#ffffff', marginBottom: '1rem'}} onClick={this.submit}><i
          className="fa fa-minus-square-o fa-lg"></i> </Button>
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteRoomFromGrid: (name, link) => {
      dispatch(deleteRoomFromGrid({name, link}))
    }
  }
};

export default connect(null, mapDispatchToProps)(RemoveFromGrid);
