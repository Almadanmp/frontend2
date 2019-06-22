import React, {Component} from 'react';
import US108Select from "./US108Select";
import {Button} from 'reactstrap';
import TableHeaderUS108 from "./TableHeaderUS108";


class TableBodyUS108 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false,
      name: '',
      link: []
    };
  };


  handleEdit = () => {
    this.setState(
      prevState => ({
        check: !prevState.check
      })
    );
  };

  render() {
    const headers = {
      name: "Name",
      floor: "Floor",
      height: "Height (m)",
      length: "Length (m)",
      width: "Width (m)",
      edit: "Configure"
    };
    const {rooms} = this.props; // data = this.props.data;
    if (rooms.length > 0 && this.state.check === false) {
      return (<tbody>
        <TableHeaderUS108 headers={headers}/>
        <tbody>
        {rooms.map((todo) => (
          <tr style={{textAlign: 'center'}} key={todo.name}>
            <td style={{textAlign: 'center'}}>{todo.name}</td>
            <td style={{textAlign: 'center'}}>{todo.floor}</td>
            <td style={{textAlign: 'center'}}>{todo.height}</td>
            <td style={{textAlign: 'center'}}>{todo.length}</td>
            <td style={{textAlign: 'center'}}>{todo.width}</td>
            <td style={{textAlign: 'center'}}>
              <Button style={{backgroundColor: '#e4e5e6', marginBottom: '1rem'}} onClick={(event) => {
                this.handleEdit();
                this.state.name = todo.name;
                this.state.links = todo.links;
              }}> Edit
              </Button>
            </td>
          </tr>
        ))}
        </tbody>
        </tbody>
      );
    } else if (rooms.length > 0 && this.state.check === true) {
      return (<><US108Select name={this.state.name} link={this.state.links.find((hrefs) => hrefs.rel === 'Edit this Room')}/></>);
    } else {
      return (<h1>No data ....</h1>);
    }
  }
}

export default TableBodyUS108;
