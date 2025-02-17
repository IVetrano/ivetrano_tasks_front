import React, { useState } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { FaCirclePlus } from "react-icons/fa6";
import { IoSearchCircle } from "react-icons/io5";
import Task from "./Task";
import { motion } from "framer-motion";

function Tasks() {
  const [showSearch, setShowSearch] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  
  const taskList = [
    { titulo: "Tarea 1", tags: [["Programacion", "#dc3545"], ["Trabajo", "#6f42c1"]] },
    { titulo: "Tarea 2", tags: [["Casa", "#198754"], ["Reparaciones", "#fd7e14"]] },
    { titulo: "Tarea 3", tags: [["Ejercicio", "#0d6efd"], ["Salud", "#d63384"]] }
  ];

  return (
    <Container>
      <motion.div initial={{ x: "100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
        <Row md={4} className="d-flex flex-column align-items-center">
          <h1 className="mx-auto" style={{ color: "white" }}>Tareas</h1>
        </Row>
      </motion.div>
      <motion.div initial={{ x: "100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
        <Row md={12}>
          {["#dc3545", "#fd7e14", "#198754"].map((color, index) => (
            <Col key={index} md={3} className="mx-4 d-flex flex-column align-items-center"
              style={{ backgroundColor: color, borderRadius: "12px", alignItems: "center" }}>
              <h2 className="mx-auto" style={{ color: "white" }}>
                {index === 0 ? "Sin empezar" : index === 1 ? "En proceso" : "Terminadas"}
              </h2>
              {taskList.map((task, idx) => (
                <Row key={idx} className="mb-2">
                  <Task titulo={task.titulo} tags={task.tags} />
                </Row>
              ))}
            </Col>
          ))}
          <Col>
            <div style={{ marginTop: "200%" }}>
              <Button variant="outline-light" className="border-0 w-100 mx-auto" onClick={() => setShowSearch(true)}>
                <IoSearchCircle className="w-100 h-100" />
              </Button>
              <Button variant="outline-light" className="border-0 w-100" onClick={() => setShowCreate(true)}>
                <FaCirclePlus className="w-100 h-100" />
              </Button>
            </div>
          </Col>
        </Row>
      </motion.div>

      {/* Modal de búsqueda */}
      <Modal show={showSearch} onHide={() => setShowSearch(false)} centered>
        <Modal.Header closeButton className="bg-dark text-light border-dark">
          <Modal.Title>Buscar Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light border-dark">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el título" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prioridad</Form.Label>
              <Form.Select>
                <option>Seleccionar</option>
                <option>Alta</option>
                <option>Media</option>
                <option>Baja</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha Final</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Creación</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark text-light border-dark">
          <Button variant="outline-light" className="border-0" onClick={() => setShowSearch(false)}>Cerrar</Button>
          <Button variant="outline-light" className="border-0" style={{backgroundColor:"#6f42c1"}}>Buscar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de creación */}
      <Modal show={showCreate} onHide={() => setShowCreate(false)} centered>
        <Modal.Header closeButton className="bg-dark text-light border-dark">
          <Modal.Title>Crear Nueva Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light border-dark">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el título" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Ingrese la descripción" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prioridad</Form.Label>
              <Form.Select>
                <option>Alta</option>
                <option>Media</option>
                <option>Baja</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Select>
                <option>Sin empezar</option>
                <option>En proceso</option>
                <option>Terminada</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha Final</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark text-light border-dark">
          <Button variant="outline-light" className="border-0" onClick={() => setShowCreate(false)}>Cerrar</Button>
          <Button variant="outline-light" className="border-0" style={{backgroundColor:"#6f42c1"}}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Tasks;
