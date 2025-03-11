import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";


const TaskCalendar = () => {
  return (
    <Container className="text-light bg-dark">
      <Row>
        <Col>
          <Calendar />
        </Col>
      </Row>
    </Container>
  )
}

export default TaskCalendar;