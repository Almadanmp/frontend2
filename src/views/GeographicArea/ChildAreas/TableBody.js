import React, {Component} from 'react';
import TableHeader from "./TableHeader";
import RemoveChildArea from "./RemoveChild/RemoveChildArea";
class TableBody extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: [],
    }
  }

  componentDidMount() {
    const{link} =this.props;
    const token = localStorage.getItem('loginToken');
    fetch(link.href, {
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
      remove: "remove",
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
              <RemoveChildArea  link={item.links.find((hrefs) => hrefs.rel === 'Remove Child Area')} area={item.name}/>
            </td>
          </tr>
        ))}
      </>
    );
  }

}



export default TableBody;
