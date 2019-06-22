import React from 'react';
import {connect} from 'react-redux';
import {fetchGA} from './Actions003';
import {Alert, Button, Input} from "reactstrap";
import CreateArea from "./CreateArea";

class US003Redux extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      isHidden: true,
      item: [],
      name: '',
      typeArea: '',
      length: '',
      width: '',
      latitude: '',
      longitude: '',
      altitude: '',
      description: ''
    };

    this.handleInputChange = attribute => event => {
      this.setState({
        [attribute]: event.target.value
      });
    };

  }

  componentDidMount() {
    const token = localStorage.getItem('loginToken');
    fetch('https://smart-home-server-g2.herokuapp.com/geoAreas/areaTypes', {
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
          isLoaded: true,
          item: json,
        })
      })
      .catch(console.log)
  }

  handleChange(event) {
    this.setState({typeArea: event.target.value});
  }

  handleSubmit() {
    this.props.onFetchArea(this.state);
    this.setState({isHidden: false})
  }

  render() {
    const {item, name, typeArea, length, width, latitude, longitude, altitude, description} = this.state;
    const {areas, error} = this.props;

    if ((areas.toString()).indexOf("ERROR") !== -1) {
      return (
        <div>
          <div className="help-block"><Alert color="danger">ERROR: {error}</Alert></div>

        </div>
      )
    } else {
      return (
        <>
          <label> Name:<span>  </span>
            <input value={this.state.name} type="text" name="name" placeholder="Geographic area name"
                   onChange={this.handleInputChange('name')}/>
          </label>
          <span> Area type: </span>
          <label>
            <Input type="select" name="select" id="select" value={this.state.typeArea} onChange={this.handleChange}>
              <option value="0" onChange={this.handleChange}>Area type</option>
              {item.map(items => (
                <option value={items.name} key={items.name}>
                  {items.name}
                </option>
              ))}
            </Input>
          </label>
          <span>  </span>
          <p></p>
          <label> Length:<span>  </span>
            <input value={this.state.length} type="number" min="0" name="length" placeholder="0"
                   onChange={this.handleInputChange('length')}/>
          </label>
          <span>  </span>
          <label> Width:<span>  </span>
            <input value={this.state.width} type="number" min="0" name="width" placeholder="0"
                   onChange={this.handleInputChange('width')}/>
          </label>
          <span>  </span>
          <p></p>
          <label> Latitude:<span>  </span>
            <input value={this.state.latitude} type="number" name="latitude" placeholder="0"
                   onChange={this.handleInputChange('latitude')}/>
          </label>
          <span>  </span>
          <label> Longitude:<span>  </span>
            <input value={this.state.longitude} type="number" name="longitude" placeholder="0"
                   onChange={this.handleInputChange('longitude')}/>
          </label>
          <span>  </span>
          <p></p>
          <label> Altitude:<span>  </span>
            <input value={this.state.altitude} type="number" name="altitude" placeholder="0"
                   onChange={this.handleInputChange('altitude')}/>
          </label>
          <span>  </span>
          <label> Description:<span>  </span>
            <input value={this.state.description} type="text" name="description" placeholder="Area details"
                   onChange={this.handleInputChange('description')}/>
          </label>
          <p>  </p>
          <Button style={{backgroundColor: '#e4e5e6', marginBottom: '1rem'}} onClick={this.handleSubmit}>Save new
            geographic area
          </Button>
          {this.state.isHidden === false ?
            <CreateArea name={this.state.name}/> : ''}
        </>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {

    loading: state.Reducers003.loading,
    areas: state.Reducers003.areas,
    error: state.Reducers003.error
  }
};

const
  mapDispatchToProps = (dispatch) => {
    return {
      onFetchArea: ({name, typeArea, length, width, latitude, longitude, altitude, description}) => {
        dispatch(fetchGA({name, typeArea, length, width, latitude, longitude, altitude, description}))
      }
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(US003Redux);
