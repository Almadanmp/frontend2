import React, {Component} from 'react';
import { Button} from 'reactstrap';
import SaveMotherAndChild from "./SaveMotherAndChild";


class US007Button extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
      motherAreaId:this.props.motherAreaId,
      childAreaId:this.props.childAreaId
    }
  }


  toggleHidden = ()=>this.setState((prevState)=>({isHidden: !prevState.isHidden}))

  render(){
    return(
      <div>
        <Button style={{backgroundColor: '#e4e5e6', marginBottom: '1rem'}} onClick={this.toggleHidden}>Add Sensor</Button>
        {!this.state.isHidden && <SaveMotherAndChild motherAreaId={this.props.motherAreaId} childAreaId={this.props.childAreaId}/>}
      </div>
    )
  }
}

export default US007Button;
