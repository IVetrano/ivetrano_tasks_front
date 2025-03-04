import React from "react";
import { Button, Container, Modal, Form } from 'react-bootstrap';
import { ReactComponent as Logo } from '../../logo.svg';
import { FaListCheck } from "react-icons/fa6";
import { FaChartPie, FaCalendarCheck, FaUserCircle } from "react-icons/fa";
import { useState } from 'react';

const Sidebar = ({ onSelect, setUser, user }) => {
  const [showUserModal, setShowUserModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const [newUser, setNewUser] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");

  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");

  const [incorrectPassword, setIncorrectPassword] = useState(false);

  const handleLogin = () => {
    if (newUser === "" || newUserPassword === "") {
      return;
    }

    fetch(`https://ivetranotask.pythonanywhere.com/users/login?username=${newUser}&password=${newUserPassword}`, {
      method: 'GET',
    })
    .then(response => {
      if (response.status === 200) {
        setUser(newUser);
        setShowLoginModal(false);
        setShowUserModal(false);
        setIncorrectPassword(false);
        return response.json();
      } else {
        setIncorrectPassword(true);
        throw new Error('Login failed');
      }
    })
    .then(data => {
      setUser(newUser);
      setShowLoginModal(false);
    })
    .catch(error => {
      console.error("Error al iniciar sesión:", error);
      alert("Usuario o contraseña incorrectos");
    });
  }


  const handleRegister = () => {
    if (newUser === "" || newUserPassword === "" || newUserName === "" || newUserEmail === "") {
      return;
    }

    fetch(`https://ivetranotask.pythonanywhere.com/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: newUser,
        password: newUserPassword,
        name: newUserName,
        email: newUserEmail
      })
    })
    .then(response => {
      if (response.status === 201) {
        setUser(newUser);
        setShowRegisterModal(false);
        setShowUserModal(false);
        setIncorrectPassword(false);
        return response.json();
      } else {
        setIncorrectPassword(true);
        throw new Error('Register failed');
      }
    })
    .then(data => {
      setUser(newUser);
      setShowRegisterModal(false);
    })
    .catch(error => {
      console.error("Error al registrar usuario:", error);
      alert("Error al registrar usuario");
    });
  }

  return (
    <Container className="d-flex flex-column p-0 text-white vh-100" style={{ backgroundColor: "#1a1e21" }}>
      <Button className="mt-3 border-0"
        style={{ backgroundColor: "#1a1e21" }}
        onClick={() => onSelect("home")}
        title="Pagina principal">
        <Logo className="w-100 h-100" />
      </Button>
      <hr className="mb-4 w-75 mx-auto" />
      <Button variant="outline-light" className="mb-4 mx-1 border-0" title="Tareas"
        onClick={() => onSelect("tasks")}><FaListCheck className="w-100 h-100" /></Button>
      <Button variant="outline-light" className="mb-4 mx-1 border-0" title="Calendario"
        onClick={() => onSelect("calendar")}><FaCalendarCheck className="w-100 h-100" /></Button>
      <Button variant="outline-light" className="mb-4 mx-1 border-0" title="Metricas"
        onClick={() => onSelect("metrics")}><FaChartPie className="w-100 h-100" /></Button>
      <Button variant="outline-light" className="mx-1 border-0" title="Usuario"
        style={{ marginTop: "auto" }}
        onClick={() => setShowUserModal(true)}><FaUserCircle className="w-100 h-100" /></Button>


      {/* Modal para usuario */}
      <Modal show={showUserModal} onHide={() => setShowUserModal(false)} centered>
        <Modal.Header closeButton className="bg-dark text-light border-dark">
          <Modal.Title>{user}</Modal.Title>
        </Modal.Header>
        <Modal.Footer className="bg-dark text-light border-dark">
          <Button variant="outline-light" className="border-0" onClick={() => setShowUserModal(false)}>
            Cerrar
          </Button>
          <Button variant="outline-light" className="border-0" style={{ backgroundColor: "#6f42c1" }} onClick={() => setShowLoginModal(true)}>
            Iniciar sesion
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para login */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
        <Modal.Header closeButton className="bg-dark text-light border-dark">
          <Modal.Title>Iniciar sesion</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light border-dark">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Usuario"
                value={newUser}
                onChange={(e) => setNewUser(e.target.value)}
              />
              <Form.Label className="mt-3">Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={newUserPassword}
                onChange={(e) => setNewUserPassword(e.target.value)}
              />
              <Form.Label style={{color:"red", display: incorrectPassword ? 'block' : 'none'}}>
                Usuario o contraseña incorrectos
              </Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark text-light border-dark">
          <Button variant="outline-light" className="border-0" onClick={() => setShowLoginModal(false)}>
            Cerrar
          </Button>
          <Button variant="outline-light" className="border-0" onClick={() => setShowRegisterModal(true)}>
            Crear cuenta
          </Button>
          <Button variant="outline-light" className="border-0" style={{ backgroundColor: "#6f42c1" }} onClick={handleLogin}>
            Iniciar sesion
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para registro */}
      <Modal show={showRegisterModal} onHide={() => setShowRegisterModal(false)} centered>
        <Modal.Header closeButton className="bg-dark text-light border-dark">
          <Modal.Title>Crear cuenta</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light border-dark">
        <Form>
            <Form.Group className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Usuario"
                value={newUser}
                onChange={(e) => setNewUser(e.target.value)}
              />
              <Form.Label className="mt-3">Nombre completo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre completo"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
              <Form.Label className="mt-3">Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
              />
              <Form.Label className="mt-3">Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={newUserPassword}
                onChange={(e) => setNewUserPassword(e.target.value)}
              />
              <Form.Label style={{color:"red", display: incorrectPassword ? 'block' : 'none'}}>
                Usuario o contraseña incorrectos
              </Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark text-light border-dark">
          <Button variant="outline-light" className="border-0" onClick={() => setShowRegisterModal(false)}>
            Cerrar
          </Button>
          <Button variant="outline-light" className="border-0" style={{ backgroundColor: "#6f42c1" }} onClick={handleRegister}>
            Crear cuenta
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
};

export default Sidebar;