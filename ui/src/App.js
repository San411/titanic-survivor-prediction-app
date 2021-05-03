import React, { Component } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      formData: {
        ticketClass: 1,
        sex: 0,
        age: 30,
        sibSp: 1,
        parCh: 2
      },
      result: ""
    };
  }

  

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({
      formData
    });
  }

  handlePredictClick = (event) => {
    const formData = this.state.formData;
    this.setState({ isLoading: true });
    fetch('https://titanic-survivor-prediction.herokuapp.com/prediction/', 
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          result: response.result,
          isLoading: false
        });
      });
  }

  handleCancelClick = (event) => {
    this.setState({ result: "" });
  }

  render() {
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;

    var ticketClasses = []
    ticketClasses.push(<option key = {1} value = {1}>{"First Class"}</option>);
    ticketClasses.push(<option key = {2} value = {2}>{"Second Class"}</option>);
    ticketClasses.push(<option key = {3} value = {3}>{"Third Class"}</option>);

    var sexs = []
    sexs.push(<option key = {0} value = {0}>{"Female"}</option>);
    sexs.push(<option key = {1} value = {1}>{"Male"}</option>);

    var ages = []
    for (var i = 0; i <= 80; i = i + 1){
      ages.push(<option key = {i} value = {i}>{i}</option>);
    }
    var sibSps = []
    for (var i = 0; i <= 8; i = 1+i) {
      sibSps.push(<option key = {i} value = {i}>{i}</option>);
    }
    var parChs = []
    for (var i = 0; i <= 6; i = 1+i) {
      parChs.push(<option key = {i} value = {i}>{i}</option>);
    }

    return (
      <Container>
        <div>
          <h1 className="title">Titanic Survivor Prediction</h1>
        </div>
        <div className="content">
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Ticket Class</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.ticketClass}
                  name="ticketClass"
                  onChange={this.handleChange}>
                  {ticketClasses}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Sex</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.sex}
                  name="sex"
                  onChange={this.handleChange}>
                  {sexs}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Age</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.age}
                  name="age"
                  onChange={this.handleChange}>
                  {ages}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Siblings/Spouses</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.sibSp}
                  name="sibSp"
                  onChange={this.handleChange}>
                  {sibSps}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Parents/Chidlren</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.parCh}
                  name="parCh"
                  onChange={this.handleChange}>
                  {parChs}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Row>
              <Col>
                <Button
                  block
                  variant="success"
                  disabled={isLoading}
                  onClick={!isLoading ? this.handlePredictClick : null}>
                  { isLoading ? 'Making prediction' : 'Predict' }
                </Button>
              </Col>
              <Col>
                <Button
                  block
                  variant="danger"
                  disabled={isLoading}
                  onClick={this.handleCancelClick}>
                  Reset prediction
                </Button>
              </Col>
            </Row>
          </Form>
          {result === "" ? null :
            (<Row>
              <Col className="result-container">
                <h5 id="result">{result}</h5>
              </Col>
            </Row>)
          }
        </div>
      </Container>
    );
  }
}

export default App;