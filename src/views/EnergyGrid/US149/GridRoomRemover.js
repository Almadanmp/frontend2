import React from 'react';
import 'react-day-picker/lib/style.css';
import {Button} from "reactstrap";
import {deleteRoomFromGrid} from "./Actions149Hateoas";
import {connect} from 'react-redux';

class GridRoomRemover extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: '',
      grid: '',
    };

    this.handleInputChange = attribute => event => {
      this.setState({
        [attribute]: event.target.value
      });
    };
  }

  handleSubmit() {
    this.props.deleteRoomFromGrid(this.state);
  }


  render() {
    const {name, grid} = this.state;
    return (
      <>
        RoomID:<input value={this.state.name} type="text" name="room" onChange={this.handleInputChange('name')}/>
        GridID:<input value={this.state.grid} type="text" name="grid" onChange={this.handleInputChange('grid')}/>
        <Button style={{backgroundColor: '#e4e5e6', marginBottom: '1rem'}} onClick={this.handleSubmit}>Remove
          Room {name} from {grid} Energy Grid</Button>
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteRoomFromGrid: ({name, grid}) => {
      dispatch(deleteRoomFromGrid({name, grid}))
    }
  }
};

export default connect(null, mapDispatchToProps)(GridRoomRemover);

