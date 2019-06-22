import React, {Component} from 'react';


class US605GetCurrentTemperature extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: [],
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('loginToken')
    fetch( this.props.link.href, {
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
          item: json,
        })
      })
      .catch(console.log)
  }

  render() {
    var {item} = this.state;

    return (
      <div>
        <p></p>
        {item.rel == "This room does not exist." ? 'No data available': item.toString() + 'Cº'}
      </div>
    );
  }

}

export default US605GetCurrentTemperature;
