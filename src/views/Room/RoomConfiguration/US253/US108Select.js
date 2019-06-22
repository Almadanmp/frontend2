import React, {Component} from 'react';
import {Form, FormGroup, Input, Label} from "reactstrap";
import SensorTypesSelect from "./SensorTypesSelect";
import {fetchRooms} from "../../../House/HouseConfiguration/US108/Actions108";
import connect from "react-redux/es/connect/connect";

class US108Select extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(event) {
    this.setState({value: event.target.value});
  }

  componentDidMount() {
    this.props.onFetchUsers();
  }


  render() {

    const {loading, rooms} = this.props;
    if (loading === true) {
      return (
        <div className="spinner-border" role="status">
          <span className="sr-only"> Loading...</span>
        </div>
      );
    }
    if (rooms.length > 0) {
      {
        return (
          <div>
            <Form action="" method="post">
              <FormGroup>
                <Label>Select Room</Label>
                <Input type="select" name="select" id="select" value={this.state.value} onChange={this.handleChange}>
                  <option value="0" onChange={this.handleChange}>Please select</option>
                  {rooms.map(items => (
                    <option value={items.name} key={items.name}>
                      Name: {items.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Form>
            <SensorTypesSelect roomID={this.state.value}/>

          </div>
        );
      }
    }
  }
}


const mapStateToProps = (state) => {
  return {
    loading: state.Reducer108.loading,
    rooms: state.Reducer108.rooms,
    error: state.Reducer108.error
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchUsers: () => {
      dispatch(fetchRooms())
    }

  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(US108Select);
