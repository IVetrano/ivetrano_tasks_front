import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { FaCirclePlus } from "react-icons/fa6";
import { IoSearchCircle } from "react-icons/io5";
import Task from "./Task";
import { motion } from "framer-motion";


function Tasks() {
  const [showSearch, setShowSearch] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const tagColors = ["#dc3545", "#6f42c1", "#fd7e14", "#198754", "#0d6efd", "#d63384"];

  const handleShowDetails = (task) => {
    setSelectedTask(task);
    setShowDetails(true);
  };

  // Obtener datos desde la API
  useEffect(() => {
    fetch("https://ivetranotask.pythonanywhere.com/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => console.error("Error al obtener las tareas:", error));
  }, []);

  useEffect(() => {
    fetch("https://ivetranotask.pythonanywhere.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => console.error("Error al obtener los usuarios:", error));
  }, []);
  

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
              {tasks
                .filter(task => task.status === index)
                .map((task) => (
                <Row key={task.id} className="mb-2">
                  <Task titulo={task.title} tags={task.tags.map(tag =>[tag.name, tagColors[tag.colour]])} 
                    descripcion={task.description} prioridad={task.priority} fechaCreacion={task.creation_date}
                    fechaFin={task.end_date} onShowDetails={() => handleShowDetails(task)}/>
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
          <Button variant="outline-light" className="border-0" style={{ backgroundColor: "#6f42c1" }}>Buscar</Button>
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
              <Form.Label>Encargado</Form.Label>
              <Form.Select>
                <option>Seleccionar</option>
                {users.map((user) => (
                  <option>{user.name}</option>))}
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
          <Button variant="outline-light" className="border-0" style={{ backgroundColor: "#6f42c1" }}>Guardar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDetails} onHide={() => setShowDetails(false)} centered>
        <Modal.Header closeButton className="bg-dark text-light border-dark">
          <Modal.Title>Detalles de la Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light border-dark">
          {selectedTask && (
            <>
              <h5>{selectedTask.titulo}</h5>
              <p><strong>Tags:</strong></p>
              <div>
                {selectedTask.tags.map(([tag, color], index) => (
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
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="bg-dark text-light border-dark">
          <Button variant="outline-light" className="border-0" onClick={() => setShowDetails(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
}

export default Tasks;
