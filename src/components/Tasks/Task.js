import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";

function Task(props) {
  const { titulo, tags } = props;

  return (
    <Card className="bg-dark text-light w-75 mx-auto">
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Row className="d-flex justify-content-between align-items-start">
          {/* Columna de Tags */}
          <Col md={8} className="d-flex flex-wrap">
            {tags.map(([tag, color], index) => (
              <span
                key={index}
                style={{
                  backgroundColor: color,
                  color: "white",
                  borderRadius: "12px",
                  padding: "5px 10px",
                  marginRight: "5px",
                  marginBottom: "5px",
                  fontSize: "0.9em",
                  display: "inline-block",
                }}
              >
                {tag}
              </span>
            ))}
          </Col>
          {/* Columna de Botones */}
          <Col md={3} className="">
            <Button variant="outline-light" className="border-0" title="Editar tarea">
              <FaEdit className=""/>
            </Button>
            <Button variant="outline-light" className="border-0" title="Pasar tarea a la siguiente etapa">
              <IoIosArrowDroprightCircle />
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default Task;
