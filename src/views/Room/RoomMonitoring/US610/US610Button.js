import React, {Component} from 'react';
import {Button, CardBody} from 'reactstrap';
import US610GetTemperature from "./US610GetTemperature";


class US610Button extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
      item:{},
      roomID:this.props.roomID,
      day:this.props.day
    }
  }


  toggleHidden = ()=>this.setState((prevState)=>({isHidden: !prevState.isHidden}))

  render(){
    console.log(this.props.link.href)
    return(
      <div>
        <Button style={{backgroundColor: '#e4e5e6', marginBottom: '1rem'}} onClick={this.toggleHidden}>Get the Maximum temperature in the day {this.props.day} in the room {this.props.roomID}</Button>
        <br></br>
        {!this.state.isHidden &&
        <US610GetTemperature day={this.props.day} link={this.props.link}/>}
      </div>
    )
  }
}

export default US610Button;
