import React from 'react';
import 'react-day-picker/lib/style.css';
import US108Button from './US108Button';

class RoomEditor extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: this.props.name,
      floor: '',
      width: '',
      length: '',
      height: '',
      link: this.props.link
    };
  }

  handleInputChange = attribute => event => {
    this.setState({
      [attribute]: event.target.value
    });
  };


  handleSubmit() {
    this.props.onFetchSensor(this.state);
  }


  render() {
    const {floor, width, length, height} = this.state;
    return (
      <div>
        <label>Floor:
          <input value={floor} type="number" name="sensorId" placeholder="Floor"
                 onChange={this.handleInputChange('floor')}/>
        </label>
        <p></p>
        <label>Width:
          <input value={width} type="number" min="0" name="width" placeholder="Width"
                 onChange={this.handleInputChange('width')}/>
        </label>
        <p></p>
        <label>Length:
          <input value={length} type="number" min="0" name="length" placeholder="Length"
                 onChange={this.handleInputChange('length')}/>
        </label>
        <p></p>
        <label>Height:
          <input value={height} type="number" min="0" name="height" placeholder="Height"
                 onChange={this.handleInputChange('height')}/>
        </label>
        <US108Button name={this.props.name} floor={this.state.floor} width={this.state.width} length={this.state.length}
                     height={this.state.height} link={this.props.link}/>
      </div>
    )
  }
}

export default RoomEditor
