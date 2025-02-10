import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './components/Home/Home';

const Content = ({ section }) => {
  const contentMap = {
    home: <Home/>,
    tasks: "Acá están las tareas.",
    calendar: "Calendario.",
    metrics: "Graficos."
  };
  return contentMap[section];
};

const App = () => {
  const [selectedSection, setSelectedSection] = useState("home");

  return (
    <Container fluid className="bg-dark">
      <Row>
        <Col xs={3} md={1} className="p-0">
          <Col md={7}>
            <Sidebar onSelect={setSelectedSection} />
          </Col>          
        </Col>
        <Col className="pt-4">
          <Content section={selectedSection} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
