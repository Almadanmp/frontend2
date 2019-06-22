import React, {Component} from 'react';
import {Form, FormGroup, Input, Label} from "reactstrap";
import US007Button from "./US007Button";

class SelectChildArea extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: [],
      isLoaded: false,
      value: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem('loginToken')
    fetch('https://smarthome-g2-server.herokuapp.com/geoAreas/',{
        headers: {
          'Authorization': token,
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          item: json,
        })
      })
      .catch(console.log)
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }


  render() {

    var {isLoaded, item} = this.state;
    console.log(item);
    if (!isLoaded) {
      return <div>Loading...</div>
    } else {
      if (!item.error) {
        const tasks = item.filter(task => task.geographicAreaId != this.props.geographicAreaId);

        return (
          <div>
            <Form action="" method="post" >
              <FormGroup>
                <Label>Select the child Geographic Area</Label>
                <Input type="select" name="select" id="select" value={this.state.value} onChange={this.handleChange}>
                  <option value="0" onChange={this.handleChange}>Please select</option>
                  {tasks.map(items => (
                    <option value={items.geographicAreaId}  key={items.name}>
                      Name: {items.name}
                    </option>
                  ))}
                </Input>
                <br/>
                <US007Button motherAreaId={this.props.geographicAreaId} childAreaId={this.state.value}/>
              </FormGroup>
            </Form>
          </div>
        );
      } else {
        return "ERROR: Non-authorized user."
      }
    }
  }
}

export default SelectChildArea;
