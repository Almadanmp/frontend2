import React, {Component} from 'react';
import {Button} from 'reactstrap';
import US108Redux from "./US108Redux";

class US108BackButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
    }
  }

  toggleHidden = () => this.setState((prevState) => ({isHidden: !prevState.isHidden}));

  render() {
    return (
      <div>
        <Button style={{backgroundColor: '#e4e5e6', marginBottom: '1rem'}} onClick={this.toggleHidden}>Back</Button>
        {!this.state.isHidden && <US108Redux/>}
      </div>
    )
  }
}

export default US108BackButton;
