import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchSensorTypes} from './Actions005extra';
import {
  CardBody, CardHeader,
  Card, Table,
} from 'reactstrap';
import US005 from "../US005";
import TableHeader from "./TableHeader";

class US005extraRedux extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onFetchTypes();
  }

  render() {
    const headers = {
      type: "Type",
      unit: "Unit"
    };
    const {listSensorTypes} = this.props;
    return (
      <div style={{float:'left'}}>
        <Card >
          <CardHeader>
            <strong> Sensor Types</strong>
          </CardHeader>
            <CardBody style={{
              textAlign: "right"
            }}>
              <Table>
                <TableHeader headers={headers}/>
                {listSensorTypes.map(item => (
                  <tr key={item.id}>
                    <td style={{
                      textAlign: "left"
                    }}> {item.name}</td>
                    <td style={{
                      textAlign: "left"
                    }}>{item.units} </td>
                  </tr>
                  ))}
              </Table>

        <US005/></CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listSensorTypes: state.Reducer005extra.listSensorTypes
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchTypes: () => {
      dispatch(fetchSensorTypes())
    }

  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(US005extraRedux);
