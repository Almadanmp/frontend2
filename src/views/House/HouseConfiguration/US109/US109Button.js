import React, {Component} from 'react';
import { Button} from 'reactstrap';
import US109Put from "./US109Put";

class US109Button extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
      name:this.props.name,
      floor:this.props.floor,
      width: this.props.width,
      length: this.props.length,
      height: this.props.height,
    }
  }

  toggleHidden = ()=>this.setState((prevState)=>({isHidden: !prevState.isHidden}));

  render(){
    return(
      <div>
        <Button style={{backgroundColor: '#e4e5e6', marginBottom: '1rem'}} onClick={this.toggleHidden}>Edit the room {this.props.name}</Button>
        {!this.state.isHidden && <US109Put  name={this.props.name} floor={this.props.floor} width={this.props.width} length={this.props.length} height={this.props.height}/>}
      </div>
    )
  }
}

export default US109Button;
