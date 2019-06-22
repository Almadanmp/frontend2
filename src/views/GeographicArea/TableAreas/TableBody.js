import React, {Component} from 'react';
import TableHeader from "./TableHeader";
import connect from "react-redux/es/connect/connect";
import GetChildren from "../ChildAreas/GetChildren.js";
import GetSensors from "../AreaSensors/GetSensors.js";

class TableBody extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: [],
    }
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
    })
      .then(res => res.json())
      .then((json) => {
        this.setState({
          item: json,
        })
      })
      .catch(console.log)
    console.log(this.state.item);

  }

  render() {
    const headers = {
      name: "Name",
      type: "Type",
      description: "Description",
      sensors: "Sensors",
      children: "Child Areas",
    };
    var {item} = this.state;
    return (
      <>
        <TableHeader headers={headers}/>
        {item.map(item => (
          <tr key={item.id}>
            <td style={{
              textAlign: "center"
            }}> {item.name}</td>
            <td style={{
              textAlign: "center"
            }}>{item.typeArea} </td>
            <td style={{
              textAlign: "center"
            }}>{item.description} </td>
            <td style={{
              textAlign: "center"
            }}>
              <GetSensors link={item.links.find((hrefs) => hrefs.rel === 'List area sensors.')} area={item.name}
                          linkAdd={item.links.find((hrefs) => hrefs.rel === 'Add a new area sensors.')}/>
            </td>

            <td style={{
              textAlign: "center"
            }}>
              <GetChildren link={item.links.find((hrefs) => hrefs.rel === 'List child areas.')} area={item.name}
                           geographicAreaId={item.geographicAreaId}/>
            </td>
          </tr>
        ))}
      </>
    );
  }

}


export default TableBody;
