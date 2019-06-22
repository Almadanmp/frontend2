import React, {Component} from 'react';
import {CardBody, Form, FormGroup, Input} from "reactstrap";
import US610Button from "./US610Button";

class SelectRoom extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: [],
      isLoaded: false,
      value: [],
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem('loginToken')
    fetch('https://smarthome-g2-server.herokuapp.com/rooms/', {
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

  handleProperties(){
    return {
      value: this.state.value,
      day: this.props.day
    };
  }

  render() {
    console.log(this.handleProperties())
    console.log(this.state.item)
    var {isLoaded, item} = this.state;

    if (!isLoaded) {
      return (<div className = "spinner-border" role = "status" >
        <span className = "sr-only" > Loading...</span>
      </div>)
    } else {
      if (!item.error) {
      return (
        <div>
          <Form action="" method="post" >
            <FormGroup>
              <h6>Select a Room</h6>
              <Input type="select" name="select" id="select" value={this.state.value} onChange={this.handleChange}>
                <option value="0" onChange={this.handleChange}>Please select</option>
                {item.map(items => (
                  <option value={[items.links.find((hrefs) => hrefs.rel === 'Get Maximum Temperature In Day')]} key={items.name}>
                    Name: {items.name}

                  </option>
                ))}
              </Input>
            </FormGroup>
          </Form>
          <br></br>
          <br></br>
          <US610Button day={this.props.day} link={this.state.value}/>
        </div>
      );
      } else {
        return "ERROR: Non-authorized user."
      }
    }
  }
}

export default SelectRoom;
