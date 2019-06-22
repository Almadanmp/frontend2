import React, {Component} from 'react';
import { Button} from 'reactstrap';
import SaveHouseLocation from './SaveHouseLocation';

class US101Button extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
      geographicAreaId:this.props.geographicAreaId,
      street:this.props.street,
      number: this.props.number,
      zip: this.props.zip,
      town: this.props.town,
      country: this.props.country,
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      altitude: this.props.altitude
    }
  }

  toggleHidden = ()=>this.setState((prevState)=>({isHidden: !prevState.isHidden}));

  render(){
    return(
      <div>
        <Button style={{backgroundColor: '#e4e5e6', marginBottom: '1rem'}} onClick={this.toggleHidden}>Save House Location{this.props.name}</Button>
        {!this.state.isHidden && <SaveHouseLocation geographicAreaId={this.props.geographicAreaId} street={this.props.street} number={this.props.number} zip={this.props.zip}
                                                    town={this.props.town} country={this.props.country} latitude={this.props.latitude}
                                                    longitude={this.props.longitude} altitude={this.props.altitude}/>}
      </div>
    )
  }
}

export default US101Button;
