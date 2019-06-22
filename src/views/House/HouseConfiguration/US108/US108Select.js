import React, {Component} from 'react';
import RoomEditor from "./RoomEditor";

class US108Select extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: [],
      isLoaded: false,
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem('loginToken');
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
    console.log(this.props.item.name)
    console.log(this.props.item.link)
  }


  render() {

    const {isLoaded, item} = this.state;
    this.state.item = Array.from(this.state.item);
    if (!isLoaded) {
      return <div className = "spinner-border" role = "status" >
        <span className = "sr-only" > Loading...</span>
      </div>
    } else {

      if (!item.error) {
        return (
          <div style={{textAlign: 'center'}}>
            <RoomEditor name={this.props.name} link={this.props.link}/>
          </div>
        );
      } else {
        return item.error
      }
    }
  }
}

export default US108Select;
