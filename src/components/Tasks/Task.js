import React, { useState } from "react";
import { Card, Button, Row, Col, Modal } from "react-bootstrap";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";

function Task({ titulo, tags, descripcion, prioridad, fechaCreacion, fechaFin }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <Card className="bg-dark text-light w-75 mx-auto">
        <Card.Body>
          <Card.Title style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => setShowDetails(true)}>
            {titulo}
          </Card.Title>
          <Row className="d-flex justify-content-between align-items-start">
            <Col md={8} className="d-flex flex-wrap">
              {tags.map(([tag, color], index) => (
                <span key={index} style={{
                  backgroundColor: color,
                  color: "white",
                  borderRadius: "12px",
                  padding: "5px 10px",
                  marginRight: "5px",
                  marginBottom: "5px",
                  fontSize: "0.9em",
                  display: "inline-block",
                }}>
                  {tag}
                </span>
              ))}
            </Col>
            <Col md={3}>
              <Button variant="outline-light" className="border-0" title="Editar tarea">
                <FaEdit />
              </Button>
              <Button variant="outline-light" className="border-0" title="Pasar tarea a la siguiente etapa">
                <IoIosArrowDroprightCircle />
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Modal de detalles */}
      <Modal show={showDetails} onHide={() => setShowDetails(false)} centered>
        <Modal.Header closeButton className="bg-dark text-light border-dark">
          <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light border-dark">
          <p><strong>Descripción:</strong> {descripcion}</p>
          <p><strong>Prioridad:</strong> {prioridad === 0 ? "Alta" : prioridad === 1 ? "Media" : "Baja"}</p>
          <p><strong>Fecha de creación:</strong> {fechaCreacion}</p>
          <p><strong>Fecha final:</strong> {fechaFin}</p>
          <p><strong>Tags:</strong></p>
          {tags.map(([tag, color], index) => (
            <span key={index} style={{
              backgroundColor: color,
              color: "white",
              borderRadius: "12px",
              padding: "5px 10px",
              marginRight: "5px",
              marginBottom: "5px",
              display: "inline-block"
            }}>
              {tag}
            </span>
          ))}
        </Modal.Body>
        <Modal.Footer className="bg-dark text-light border-dark">
          <Button variant="outline-light" className="border-0" onClick={() => setShowDetails(false)}>Cerrar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Task;