import React, {Component} from 'react';
import TableHeader from "./TableHeader";


class TableBody extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: [],
      sensors: false,
      gridID: ''
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('loginToken');
    fetch('https://smarthome-g2-server.herokuapp.com/gridSettings/grids/' + this.props.gridID, {
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
          sensors: true,
          item: json,
        })
      })
      .catch(console.log)
  }

  render() {
    const headers = {
      name: "Rooms",
      floor: "Floor",
      height: "Height (m)",
      length: "Length (m)",
      width: "Width (m)",
      remove: "Remove from grid",
      edit: "Edit Room"
    };
    var {item} = this.state;
    return (
      <>
        <TableHeader headers={headers}/>
        {item.map(item => (
          <tr key={item.name}>
            <td> {item.name}</td>
            <td>{item.floor} </td>
            <td> {item.height}</td>
            <td> {item.length} </td>
            <td> {item.width} </td>
            <td>
            </td>
            <td> {item.edit} </td>
          </tr>
        ))}
      </>
    );
  }

}


export default TableBody;
