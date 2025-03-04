import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { FaCirclePlus } from "react-icons/fa6";
import { IoSearchCircle } from "react-icons/io5";
import Task from "./Task";
import { motion } from "framer-motion";
import { data } from "react-router-dom";

const COLORS = ["#dc3545", "#6f42c1", "#fd7e14", "#198754", "#0d6efd", "#d63384"];
const PRIORITIES = ["Alta", "Media", "Baja"];
const STATUSES = ["Sin empezar", "En proceso", "Terminada"];

function Tasks(user) {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [tags, setTags] = useState([]);

  const [showSearch, setShowSearch] = useState(false);
  const [filterTitle, setFilterTitle] = useState("");
  const [filterPriority, setFilterPriority] = useState();
  const [filterEndDate, setFilterEndDate] = useState("");
  const [filterCreationDate, setFilterCreationDate] = useState("");
  const [filterCreator, setFilterCreator] = useState("");
  const [filterManager, setFilterManager] = useState("");
  const [filterTags, setFilterTags] = useState([]);

  const [showCreate, setShowCreate] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState(0);
  const [newTaskStatus, setNewTaskStatus] = useState(0);
  const [newTaskManager, setNewTaskManager] = useState("");
  const [newTaskEndDate, setNewTaskEndDate] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const [showTagModal, setShowTagModal] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState(COLORS[0]);

  const handleTagSelect = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleFilterTagSelect = (tag) => {
    setFilterTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleCreateTag = () => {
    if (newTagName.trim() && !tags.some(tag => tag.name === newTagName)) {
      const newTag = { name: newTagName, color: newTagColor };
      fetch(`https://ivetranotask.pythonanywhere.com/tags?name=${newTagName}&colour=${COLORS.indexOf(newTagColor)}`, {
        method: 'POST',
      })
        .then(response => response.json())
        .then(data => {
          setTags([...tags, newTag]);
          setNewTagName("");
          setNewTagColor(COLORS[0]);
          setShowTagModal(false);
        })
        .catch(error => console.error("Error al crear el tag:", error));
    }
  };

  const handleCreateTask = () => {
    fetch("https://ivetranotask.pythonanywhere.com/tasks", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: newTaskTitle,
        description: newTaskDescription,
        priority: newTaskPriority,
        status: newTaskStatus,
        was_made_by: user.user,
        assigned_to: [newTaskManager],
        end_date: newTaskEndDate,
        tags: selectedTags.map(tag => tag.name)
      })
    })
      .then(response => {
        if (response.status === 201) {
          setShowCreate(false);
          return response.json();
        } else {
          throw new Error('Register failed');
        }
      })
      .catch(error => {
        console.error("Error crear tarea:", error);
        alert("Error al crear tarea");
      });
  }

  const handleFilter = () => {
    const filterData = {};

    if (filterTitle) filterData.title = filterTitle;
    if (filterPriority !== undefined) filterData.priority = filterPriority;
    if (filterCreator) filterData.was_made_by = filterCreator;
    if (filterManager) filterData.assigned_to = filterManager;
    if (filterEndDate) filterData.end_date = filterEndDate;
    if (filterCreationDate) filterData.creation_date = filterCreationDate;
    if (filterTags.length > 0) filterData.tags = filterTags.map(tag => tag.name).join(',');

    const queryString = new URLSearchParams(filterData).toString();

    fetch(`https://ivetranotask.pythonanywhere.com/tasks?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setTasks(data);
        setShowSearch(false);
      })
      .catch(error => {
        console.error("Error al filtrar tareas:", error);
        alert("Error al filtrar tareas");
      });
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

  useEffect(() => {
    fetch("https://ivetranotask.pythonanywhere.com/tags")
      .then((response) => response.json())
      .then((data) => {
        setTags(data);
      })
      .catch((error) => console.error("Error al obtener los tags:", error));
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
                    <Task titulo={task.title} tags={task.tags.map(tag => [tag.name, COLORS[tag.colour]])}
                      descripcion={task.description} prioridad={task.priority} fechaCreacion={task.creation_date}
                      fechaFin={task.end_date} creador={task.was_made_by} encargado={task.manager} />
                  </Row>
                ))}
            </Col>
          ))}
          <Col>
            <div style={{ marginTop: "26%", position: "fixed", top: "20px", right: "20px", padding: "20px" }}>
              <Button variant="outline-light" className="border-0 w-100 mx-auto" onClick={() => setShowSearch(true)} title="Buscar tarea">
                <IoSearchCircle className="w-100 h-100" />
              </Button>
              <Button variant="outline-light" className="border-0 w-100 mt-2" onClick={() => setShowCreate(true)} title="Crear tarea">
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
              <Form.Control type="text" placeholder="Ingrese el título" value={filterTitle}
                onChange={(e) => setFilterTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prioridad</Form.Label>
              <Form.Select onChange={(e) => setFilterPriority(PRIORITIES.indexOf(e.target.value))}>
                <option value="">Seleccionar</option>
                {PRIORITIES.map((priority, index) => (
                  <option key={index} value={priority}>{priority}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Creador</Form.Label>
              <Form.Select onChange={(e) => setFilterCreator(e.target.value)}>
                <option value="">Seleccionar</option>
                {users.map((user, index) => (
                  <option key={index} value={user.username}>{user.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Encargado</Form.Label>
              <Form.Select onChange={(e) => setFilterManager(e.target.value)}>
                <option value="">Seleccionar</option>
                {users.map((user, index) => (
                  <option key={index} value={user.username}>{user.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha Final</Form.Label>
              <Form.Control type="date" onChange={(e) => setFilterEndDate(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Creación</Form.Label>
              <Form.Control type="date" onChange={(e) => setFilterCreationDate(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tags</Form.Label>
              <div>
                {tags.map((tag, index) => (
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
                    onClick={() => handleFilterTagSelect(tag)}
                  >
                    {tag.name} {filterTags.includes(tag) && "✓"}
                  </span>
                ))}
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark text-light border-dark">
          <Button variant="outline-light" className="border-0" onClick={() => setShowSearch(false)}>Cerrar</Button>
          <Button variant="outline-light" className="border-0" style={{ backgroundColor: "#6f42c1" }} onClick={handleFilter}>Buscar</Button>
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
              <Form.Control type="text" placeholder="Ingrese el título" value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Ingrese la descripción" value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prioridad</Form.Label>
              <Form.Select onChange={(e) => setNewTaskPriority(PRIORITIES.indexOf(e.target.value))}>
                {PRIORITIES.map((priority, index) => (
                  <option key={index} value={priority}>{priority}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Select onChange={(e) => setNewTaskStatus(STATUSES.indexOf(e.target.value))}>
                {STATUSES.map((status, index) => (
                  <option key={index} value={status}>{status}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Encargado</Form.Label>
              <Form.Select onChange={(e) => setNewTaskManager(e.target.value)}>
                {users.map((user, index) => (
                  <option key={index} value={user.username}>{user.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha Final</Form.Label>
              <Form.Control type="date" onChange={(e) => setNewTaskEndDate(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tags</Form.Label>
              <div>
                {tags.map((tag, index) => (
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
                    {tag.name} {selectedTags.includes(tag) && "✓"}
                  </span>
                ))}
              </div>
              <Button variant="outline-light" className="mt-2" onClick={() => setShowTagModal(true)}>
                + Crear Tag
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark text-light border-dark">
          <Button variant="outline-light" className="border-0" onClick={() => setShowCreate(false)}>
            Cerrar
          </Button>
          <Button variant="outline-light" className="border-0" style={{ backgroundColor: "#6f42c1" }} onClick={handleCreateTask}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para crear tags */}
      <Modal show={showTagModal} onHide={() => setShowTagModal(false)} centered>
        <Modal.Header closeButton className="bg-dark text-light border-dark">
          <Modal.Title>Crear Nuevo Tag</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light border-dark">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre del Tag</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Color</Form.Label>
              <div>
                {COLORS.map((color, index) => (
                  <span
                    key={index}
                    style={{ backgroundColor: color, cursor: "pointer", margin: "5px", padding: "10px" }}
                    onClick={() => setNewTagColor(color)}
                  >
                    {newTagColor === color ? "✓" : ""}
                  </span>
                ))}
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark text-light border-dark">
          <Button variant="outline-light" className="border-0" onClick={() => setShowTagModal(false)}>
            Cancelar
          </Button>
          <Button variant="outline-light" className="border-0" style={{ backgroundColor: "#6f42c1" }} onClick={handleCreateTag}>
            Crear
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
}

export default Tasks;
