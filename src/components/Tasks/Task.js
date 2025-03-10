import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Modal, Form } from "react-bootstrap";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";


function Task({ id, titulo, tags, descripcion, prioridad, fechaCreacion, fechaFin, creador, encargado, estado, PRIORITIES, STATUSES, users, COLORS, AllTags, refreshTasks }) {
  const [showDetails, setShowDetails] = useState(false);

  const [showEdit, setShowEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(titulo);
  const [newDescription, setNewDescription] = useState(descripcion);
  const [newPriority, setNewPriority] = useState(prioridad);
  const [newStatus, setNewStatus] = useState(estado);
  const [newManager, setNewManager] = useState("");
  const [newEndDate, setNewEndDate] = useState(fechaFin);
  const [selectedTags, setSelectedTags] = useState(tags.map(tag => tag[0]));

  useEffect(() => {
    const manager = users.find(user => user.name === encargado);
    if (manager) {
      setNewManager(manager.username);
    }
  }, [encargado, users]);

  const handleTagSelect = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag.name) ? prev.filter((t) => t !== tag.name) : [...prev, tag.name]
    );
  };

  const handleEditTask = () => {
    const editData = {};
    if (newTitle !== titulo) editData.title = newTitle;
    if (newDescription !== descripcion) editData.description = newDescription;
    if (newPriority !== prioridad) editData.priority = newPriority;
    if (newStatus !== estado) editData.status = newStatus;

    const manager = users.find(user => user.name === encargado);
    if (newManager !== manager.username) editData.assigned_users = [newManager];
    if (newEndDate !== fechaFin) editData.endDate = newEndDate;

    const currentTagNames = tags.map(tag => tag[0]);
    if (selectedTags.sort().join(',') !== currentTagNames.sort().join(',')) {
      editData.tags = selectedTags;
    }
    console.log(JSON.stringify(editData));

    fetch(`https://ivetranotask.pythonanywhere.com/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editData)
    })
      .then(response => {
        if (response.status === 200) {
          setShowEdit(false);
          refreshTasks();
          return response.json();
        } else {
          throw new Error('Register failed');
        }
      })
      .catch(error => {
        console.error("Error editar tarea:", error);
        alert("Error al editar tarea");
      });
  };

  const handleNextStage = () => {
    if (estado === 2) {
      fetch(`https://ivetranotask.pythonanywhere.com/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.status === 200) {
            refreshTasks();
            return response.json();
          } else {
            throw new Error('Register failed');
          }
        })
        .catch(error => {
          console.error("Error al eliminar tarea:", error);
          alert("Error al eliminar tarea");
        });
      return;
    }

    const nextStatus = estado + 1;
    fetch(`https://ivetranotask.pythonanywhere.com/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: nextStatus })
    })
      .then(response => {
        if (response.status === 200) {
          refreshTasks();
          return response.json();
        } else {
          throw new Error('Register failed');
        }
      })
      .catch(error => {
        console.error("Error al pasar a la siguiente etapa:", error);
        alert("Error al pasar a la siguiente etapa");
      });
  }

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
              <Button variant="outline-light" className="border-0" title="Editar tarea" onClick={() => setShowEdit(true)}>
                <FaEdit />
              </Button>
              <Button variant="outline-light" className="border-0" title={estado !== 2 ? "Pasar tarea a la siguiente etapa" : "Eliminar tarea"}
              onClick={() => handleNextStage()}>
                {estado !== 2 ? <IoIosArrowDroprightCircle /> : <MdDeleteForever />}
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
          <p><strong>Creador:</strong> {creador}</p>
          <p><strong>Encargado:</strong> {encargado}</p>
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

      {/* Modal de edición */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
        <Modal.Header closeButton className="bg-dark text-light border-dark">
          <Modal.Title>Editar tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light border-dark">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control type="text" placeholder={titulo} value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder={descripcion} value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prioridad</Form.Label>
              <Form.Select value={newPriority} onChange={(e) => setNewPriority(PRIORITIES.indexOf(e.target.value))}>
                {PRIORITIES.map((priority, index) => (
                  <option key={index} value={index}>{priority}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Select value={newStatus} onChange={(e) => setNewStatus(STATUSES.indexOf(e.target.value))}>
                {STATUSES.map((status, index) => (
                  <option key={index} value={index}>{status}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Encargado</Form.Label>
              <Form.Select value={newManager} onChange={(e) => setNewManager(e.target.value)}>
                {users.map((user, index) => (
                  <option key={index} value={user.username}>{user.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha Final</Form.Label>
              <Form.Control type="date" value={newEndDate} onChange={(e) => setNewEndDate(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tags</Form.Label>
              <div>
                {AllTags.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: COLORS[tag.colour],
                      cursor: "pointer",
                      color: "white",
                      borderRadius: "12px",
                      padding: "5px 10px",
                      marginRight: "5px",
                      marginBottom: "5px",
                      fontSize: "0.9em",
                      display: "inline-block"
                    }}
                    onClick={() => handleTagSelect(tag)}
                  >
                    {tag.name} {selectedTags.includes(tag.name) && "✓"}
                  </span>
                ))}
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark text-light border-dark">
          <Button variant="outline-light" className="border-0" onClick={() => setShowEdit(false)}>Cerrar</Button>
          <Button variant="outline-light" className="border-0" style={{ backgroundColor: "#6f42c1" }} onClick={handleEditTask}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Task;