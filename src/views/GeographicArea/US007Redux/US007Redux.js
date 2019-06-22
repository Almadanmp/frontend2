import React from 'react';
import {connect} from 'react-redux';
import {fetchMotherChild} from './Actions007';
import {Button, Card, CardBody, Collapse, Form, FormGroup, Input, Label} from "reactstrap";
import AlterMotherChild from './AlterMotherChild'


class US007Redux extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.state = {
      isHidden: true,
      item: [],
      childId: '',
      idMother: 0,
      count: 0,
      mother: '',
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('loginToken');
    fetch('https://smart-home-server-g2.herokuapp.com/geoAreas/', {
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

  toggle() {
    this.setState(state => ({collapse: !state.collapse}));
  }

  handleChange2(event) {
    this.setState({id: event.target.value});
  }

  handleSubmit() {
    this.props.onFetchMotherChild(this.props.geographicAreaId, this.state.id);
    console.log(this.props.geographicAreaId)
    console.log(this.state.id)
    console.log(this.props.mother)
    this.setState({isHidden: false})
  }

  render() {
    const {item} = this.state;

    return (
      <div>
        <Button onClick={this.toggle} className={"btn-pill"} style={{backgroundColor: '#93c4c4', marginBottom: '1rem'}}><i
          className="fa fa-plus-square-o fa-lg"/> Add Child Area{this.props.id}</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
              <Form action="" method="post">
                <FormGroup>
                  <Label>Select Geographic Area Child</Label>
                  <Input type="select" name="select" id="select" value={this.state.value} onChange={this.handleChange2}>
                    <option value="" onChange={this.handleChange2}>Please select the child Geographic Area</option>
                    {item.map(items => (
                      <option value={items.geographicAreaId} key={items.geographicAreaId}>
                        {items.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Form>
              <p></p>
              <Button style={{backgroundColor: '#e4e5e6', marginBottom: '1rem'}} onClick={this.handleSubmit}>Save
                changes
              </Button>
              {(this.state.isHidden === false ?
                <AlterMotherChild childId={this.state.id} motherId={this.props.geographicAreaId}
                                  mother={this.props.mother}/> : '')}
            </CardBody>
          </Card>'
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.Reducers007.loading,
    added: state.Reducers007.location,
    error: state.Reducers007.error
  }
};

const
  mapDispatchToProps = (dispatch) => {
    return {
      onFetchMotherChild: (geographicAreaId, id) => {
        dispatch(fetchMotherChild({geographicAreaId, id}))
      }
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(US007Redux);
