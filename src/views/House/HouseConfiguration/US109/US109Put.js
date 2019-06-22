import React, {Component} from 'react';

class US109Put extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: [],
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('loginToken');
    const name = this.props.name;
    const floor = this.props.floor;
    const width = this.props.width;
    const length = this.props.length;
    const height = this.props.height;
    console.log(this.props);
    fetch('https://smarthome-g2-server.herokuapp.com/rooms/' + name, {
      method: 'put',
      headers: {
        'Authorization': token,
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name, floor, width, length, height})
    })
      .then(res => res.json())
      .then((json) => {
        this.setState({
          item: json,
        })
      })
      .catch(console.log);
  };

  render() {
    return (
      <div>
        <p>The room has been altered to the following configuration:</p>
          <ul>
            <li>
            Name: {this.props.name}
            </li>
            <li>
            Floor: {this.props.floor}
            </li>
            <li>
            Width: {this.props.width} m
            </li>
            <li>
            Length: {this.props.length} m
            </li>
            <li>
            Height: {this.props.height} m
            </li>
          </ul>
      </div>
    );
  }
}

export default US109Put;
