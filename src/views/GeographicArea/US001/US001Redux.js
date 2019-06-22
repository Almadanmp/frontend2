import React from 'react';
import {connect} from 'react-redux';
import {addAreaType} from './Actions001';
import {Button} from "reactstrap";

class US001Redux extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: ''
    };

    this.handleInputChange = attribute => event => {
      this.setState({
        [attribute]: event.target.value
      });
    };

  }

  handleSubmit() {
    this.props.onPostType(this.state);
  }

  render() {
    const {name} = this.state;
    return (
      <>
        <label> Name:<span>  </span>
          <input value={this.state.name} type="text" name="name" placeholder="Name of the area type"
                 onChange={this.handleInputChange('name')}/>
        </label>
        <p>After creating this type, you'll be able to have areas that are - {name} -.</p>
        <Button style={{backgroundColor: '#e4e5e6', marginBottom: '1rem'}} onClick={this.handleSubmit}>Add area
          type</Button>
      </>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    onPostType: ({name}) => {
      dispatch(addAreaType({name}))
    }
  }
};

export default connect(
  null,
  mapDispatchToProps
)(US001Redux);
