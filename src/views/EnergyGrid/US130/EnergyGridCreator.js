import React from 'react';
import 'react-day-picker/lib/style.css';
import {Button} from "reactstrap";
import {fetchEnergyGrid} from "./Actions";
import {connect} from 'react-redux';

class EnergyGridCreator extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      isHidden: true,
      name: '',
      maxContractedPower: ''
    };

    this.handleInputChange = attribute => event => {
      this.setState({
        [attribute]: event.target.value
      });
    };
  }
  toggleHidden = ()=>this.setState((prevState)=>({isHidden: !prevState.isHidden}))


  handleSubmit(){
    this.props.onFetchEnergyGrid(this.state);
  }

  render() {
    const {name, maxContractedPower} = this.state;
    return (
      <>
        <label> Name:
          <input placeholder={"Name"} value={this.state.name} type="text" name="name" onChange={this.handleInputChange('name')}/>
        </label>
        <p></p>
        <label> Maximum Power:
          <input placeholder={"00"} value={this.state.maxContractedPower} type="number" name="maxContractedPower" onChange={this.handleInputChange('maxContractedPower')}/>
        </label>
        <p></p>
        <Button style={{backgroundColor: '#e4e5e6', marginBottom: '1rem'}} onClick={this.handleSubmit}>Save new energy grid</Button>
        {!this.state.isHidden && <p>The energy grid to be created has the following details: {name + ', ' + maxContractedPower + '.'}</p>}

      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchEnergyGrid: ({name, maxContractedPower}) => {
      dispatch(fetchEnergyGrid({name, maxContractedPower}))
    }
  }
};

export default connect(null,mapDispatchToProps)(EnergyGridCreator);
