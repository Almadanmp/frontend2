import React, {Component} from 'react';
import {CardBody, Card, Col, Row, CardHeader, Table} from 'reactstrap';
import DatePickerOneDay610 from "./DatePickerOneDay610";
import SelectRoom from "./SelectRoom"

class US610 extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: false,
      selectedDay:''
    };
  }

  toggle() {
    this.setState(state => ({collapse: !state.collapse}));
  }

  handleDayPicker = (selectedDay) => {

    console.log("handleDayPicker:"+ JSON.stringify(selectedDay))
    if (selectedDay !== undefined) {
      const initialDay = selectedDay.toISOString().substring(0, 10);
      this.setState({selectedDay: initialDay});
    }
  }

  render() {
    const numberOfMonths = 1;
    return (
      <Row>
        <Col >
          <Card className="card-accent-warning">
            <CardHeader>
              Temperature on a selected day
            </CardHeader>
            <CardBody>
              <Table responsive>
                <CardBody>
              <span>
              <DatePickerOneDay610 getDays={this.handleDayPicker} numberOfMonths={numberOfMonths}/>
              </span>
                  <br></br>
                  <br></br>
              <SelectRoom day={this.state.selectedDay}/>
                  <br></br>
            </CardBody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>

    );
  }
}

export default US610;
