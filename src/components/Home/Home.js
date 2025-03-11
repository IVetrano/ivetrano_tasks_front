import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ReactComponent as Logo } from '../../logo.svg';
import { FaListCheck } from "react-icons/fa6";
import { FaChartPie, FaCalendarCheck } from "react-icons/fa";
import { motion } from "motion/react";
import { FaUserCircle } from "react-icons/fa";


const Home = () => {
  return (
    <Container className="text-light" style={{overflow: "hidden"}}>
      <motion.div initial={{x: "100%", opacity: "0.001"}} animate={{x: "0", opacity: "100"}}>
      <Row className="h-100 mb-4">
        <Col xs="auto"><h1>Bienvenido a</h1></Col>
        <Col xs="auto" className="p-0"><Logo style={{ width: "64px", height: "42px" }} /></Col>
        <Col xs="auto" className="p-0"><h1>etrano Tasks</h1></Col>
      </Row>
      </motion.div>

      <motion.div initial={{ x: "100%", opacity: "0.001" }} animate={{ x: "0", opacity: "100" }} transition={{ delay: "1" }}>
        <Row className="my-4">
          <Col xs="auto"><h3>Ivetrano Tasks es un gestor de tareas para la compañía de software ficticia Ivetrano. Cada usuario es un empleado al que se le pueden asignar tareas para completar.</h3></Col>
        </Row>
      </motion.div>

      <motion.div initial={{ x: "100%", opacity: "0.001" }} animate={{ x: "0", opacity: "100" }} transition={{ delay: "2" }}>
        <Row className="my-4">
          <Col xs="auto"><h3>Visita</h3></Col>
          <Col xs="auto"><FaListCheck style={{ width: "30px", height: "30px", color: "#6f42c1" }} /></Col>
          <Col xs="auto"><h3>para ver, buscar y crear tareas.</h3></Col>
        </Row>
      </motion.div>

      <motion.div initial={{ x: "100%", opacity: "0.001" }} animate={{ x: "0", opacity: "100" }} transition={{ delay: "3" }}>
        <Row className="my-4">
          <Col xs="auto"><h3>Dirígete a</h3></Col>
          <Col xs="auto"><FaCalendarCheck style={{ width: "30px", height: "30px", color: "#6f42c1" }} /></Col>
          <Col xs="auto"><h3>para ver las tareas en el calendario.</h3></Col>
        </Row>
      </motion.div>

      <motion.div initial={{ x: "100%", opacity: "0.001" }} animate={{ x: "0", opacity: "100" }} transition={{ delay: "4" }}>
        <Row className="my-4">
          <Col xs="auto"><h3>Consulta</h3></Col>
          <Col xs="auto"><FaChartPie style={{ width: "30px", height: "30px", color: "#6f42c1" }} /></Col>
          <Col xs="auto"><h3>para ver a qué tipo de tareas se dedica más tiempo.</h3></Col>
        </Row>
      </motion.div>

      <motion.div initial={{ x: "100%", opacity: "0.001" }} animate={{ x: "0", opacity: "100" }} transition={{ delay: "5" }}>
        <Row className="my-4">
          <Col xs="auto"><h3>O también puedes ir a</h3></Col>
          <Col xs="auto"><FaUserCircle style={{ width: "30px", height: "30px", color: "#6f42c1" }} /></Col>
          <Col xs="auto"><h3>para crear un usuario o iniciar sesión.</h3></Col>
        </Row>
        <Row><h3>Si no has iniciado sesión, las tareas que crees tomaran como creador al usuario "Anónimo".</h3></Row>
      </motion.div>

      <motion.div initial={{x: "100%", opacity: "0.001"}} animate={{x: "0", opacity: "100"}} transition={{delay: "6"}}>
      <Row style={{ paddingTop: "10%" }}>
        <h4>
          Si te interesa ver más de mis proyectos, puedes hacer clic{" "}
          <a href="https://ivetrano.github.io/github-portfolio/" style={{ color: "#6f42c1" }}>aquí</a>
          .
        </h4>
      </Row>
      </motion.div>

    </Container>
  )
}

export default Home;