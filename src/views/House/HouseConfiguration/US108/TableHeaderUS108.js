import React, {Component} from 'react';

class TableHeaderUS108 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {headers} = this.props;
    return (
      <thead>
      <tr>
        <th style={{textAlign: 'center'}}>{headers.name}</th>
        <th style={{textAlign: 'center'}}>{headers.floor}</th>
        <th style={{textAlign: 'center'}}>{headers.height}</th>
        <th style={{textAlign: 'center'}}>{headers.length}</th>
        <th style={{textAlign: 'center'}}>{headers.width}</th>
        <th style={{textAlign: 'center'}}>{headers.edit}</th>
      </tr>
      </thead>
    );
  }
}

export default TableHeaderUS108;
