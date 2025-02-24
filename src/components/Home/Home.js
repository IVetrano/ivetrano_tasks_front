import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ReactComponent as Logo } from '../../logo.svg';
import { FaListCheck } from "react-icons/fa6";
import { FaChartPie, FaCalendarCheck } from "react-icons/fa";
import { motion } from "motion/react";

const Home = () => {
  return (
    <Container className="text-light">
      <motion.div initial={{x: "100%", opacity: "0.001"}} animate={{x: "0", opacity: "100"}}>
      <Row className="h-100 mb-4">
        <Col xs="auto"><h1>Bienvenido a</h1></Col>
        <Col xs="auto" className="p-0"><Logo style={{ width: "64px", height: "42px" }} /></Col>
        <Col xs="auto" className="p-0"><h1>etrano Tasks</h1></Col>
      </Row>
      </motion.div>

      <motion.div initial={{ x: "100%", opacity: "0.001" }} animate={{ x: "0", opacity: "100" }} transition={{ delay: "1" }}>
        <Row className="my-4">
          <Col xs="auto"><h3>Podés ir a</h3></Col>
          <Col xs="auto"><FaListCheck style={{ width: "30px", height: "30px", color: "#6f42c1" }} /></Col>
          <Col xs="auto"><h3>para ver tus tareas</h3></Col>
        </Row>
      </motion.div>

      <motion.div initial={{ x: "100%", opacity: "0.001" }} animate={{ x: "0", opacity: "100" }} transition={{ delay: "2" }}>
        <Row className="my-4">
          <Col xs="auto"><h3>O podes ir a</h3></Col>
          <Col xs="auto"><FaCalendarCheck style={{ width: "30px", height: "30px", color: "#6f42c1" }} /></Col>
          <Col xs="auto"><h3>para ver que tareas te esperan en tu calendario</h3></Col>
        </Row>
      </motion.div>

      <motion.div initial={{ x: "100%", opacity: "0.001" }} animate={{ x: "0", opacity: "100" }} transition={{ delay: "3" }}>
        <Row className="my-4">
          <Col xs="auto"><h3>O tambien podes ir a</h3></Col>
          <Col xs="auto"><FaChartPie style={{ width: "30px", height: "30px", color: "#6f42c1" }} /></Col>
          <Col xs="auto"><h3>para ver a que tipo de tareas le dedicas mas tiempo</h3></Col>
        </Row>
      </motion.div>

      <motion.div initial={{x: "100%", opacity: "0.001"}} animate={{x: "0", opacity: "100"}} transition={{delay: "5"}}>
      <Row style={{ paddingTop: "25%" }}>
        <h4>
          Si te interesa ver más de mis proyectos podés hacer click{" "}
          <a href="https://ivetrano.github.io/github-portfolio/" style={{ color: "#6f42c1" }}>acá</a>
          .
        </h4>
      </Row>
      </motion.div>

    </Container>
  )
}

export default Home;