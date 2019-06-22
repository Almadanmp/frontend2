import React, {Component} from 'react';


class SaveAreaSensor extends Component {

  constructor(props) {
    super(props);
  }


  componentDidMount() {
    const token = localStorage.getItem('loginToken')
    const motherAreaId = this.props.motherAreaId;
    const childAreaId = this.props.childAreaId;

    console.log(this.props);
    fetch('https://smarthome-g2-server.herokuapp.com/geoAreas/' + motherAreaId + '/' + childAreaId,{
      method: 'put',
      headers: {
        'Authorization': token,
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
      }
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
        <p>The Geographic Area with the ID: {this.props.childAreaId} was successfully
          added to the Geographic Area with ID: {this.props.motherAreaId}.</p>
      </div>
    );


  }
}

export default SaveAreaSensor;
