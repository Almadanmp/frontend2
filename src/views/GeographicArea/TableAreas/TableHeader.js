import React, {Component} from 'react';

class TableHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {headers} = this.props;
    return (
      <thead>
      <tr>
        <th style={{
          textAlign: "center"
        }}>{headers.name}</th>
        <th style={{
          textAlign: "center"
        }}>{headers.type}</th>
        <th style={{
          textAlign: "center"
        }}>{headers.description}</th>
        <th style={{
        textAlign: "center"
      }}>{headers.sensors}</th>
        <th style={{
          textAlign: "center"
        }}>{headers.children}</th>
      </tr>
      </thead>
    );
  }
}

export default TableHeader;
