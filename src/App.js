import React, { useState } from "react";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './components/Home/Home';
import Tasks from "./components/Tasks/Tasks";
import TaskCalendar from "./components/Calendar/TaskCalendar";
import Metrics from "./components/Metrics/Metrics";

const Content = ({ section, user }) => {
  const contentMap = {
    home: <Home/>,
    tasks: <Tasks user={user}/>,
    calendar: <TaskCalendar/>,
    metrics: <Metrics/>
  };
  return contentMap[section];
};

const App = () => {
  const [selectedSection, setSelectedSection] = useState("home");
  const [user, setUser] = useState("Anonimo");

  return (
    <Container fluid className="bg-dark">
      <Row>
        <Col xs={3} md={1} className="p-0 sidebar-sticky">
          <Col md={7}>
            <Sidebar onSelect={setSelectedSection} setUser={setUser} user={user}/>
          </Col>          
        </Col>
        <Col className="pt-4">
          <Content section={selectedSection} user={user} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
