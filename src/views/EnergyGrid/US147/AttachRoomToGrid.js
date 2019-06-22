import React from 'react';
import 'react-day-picker/lib/style.css';
import {Button} from "reactstrap";
import AttachRoom from "./AttachRoom"
import {attachRoomGrid} from "./Actions";
import {connect} from 'react-redux';

class AttachRoomToGrid extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      isHidden: true,
      name: '',
    };

    this.handleInputChange = attribute => event => {
      this.setState({
        [attribute]: event.target.value,
        isHidden: true
      });
    };
  }

  toggleHidden = () => this.setState((prevState) => ({isHidden: !prevState.isHidden}))

  handleSubmit() {
    this.props.onAttachRoomGrid(this.state.name, this.props.link.href);
    this.toggleHidden();
  }

  render() {
    const {name} = this.state;
    return (
      <>
        Name: <input value={this.state.name} placeholder="Ex: B107" type="text" name="name"
                      onChange={this.handleInputChange('name')}
      />
        <p></p>
        <Button style={{backgroundColor: '#e4e5e6', marginBottom: '1rem'}}
                onClick={this.handleSubmit}>Attach
          Room {name} to {this.props.grid}</Button>
        {!this.state.isHidden && <AttachRoom room={this.props.room} error={ this.props.error} grid={this.props.grid}/>}
      </>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    // loading: state.ReducersGetRoomsNotInGrid.loading,
    // roomsNotInGrid: state.ReducersGetRoomsNotInGrid.roomsNotInGrid,
    // error: state.ReducersGetRoomsNotInGrid.error
    loading: state.Reducers147.loading,
    room: state.Reducers147.room,
    error: state.Reducers147.error
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAttachRoomGrid: (name, link) => {
      dispatch(attachRoomGrid({name, link}))
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AttachRoomToGrid);
