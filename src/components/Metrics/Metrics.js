import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './Metrics.css';

const COLORS = ["#dc3545", "#6f42c1", "#fd7e14", "#198754", "#0d6efd", "#d63384"];

const Metrics = () => {
  const [tags, setTags] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [rate, setRate] = useState([]);

  useEffect(() => {
    fetch("https://ivetranotask.pythonanywhere.com/tags")
      .then((response) => response.json())
      .then((data) => {
        setTags(data);
      })
      .catch((error) => console.error("Error al obtener las etiquetas:", error));
  }, []);

  useEffect(() => {
    fetch("https://ivetranotask.pythonanywhere.com/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => console.error("Error al obtener las tareas:", error));
  }, []);

  useEffect(() => {
    if (tags.length > 0 && tasks.length > 0) {
      const completedTasks = tasks.filter((task) => task.status === 2);

      if (completedTasks.length === 0) return;

      // Inicializar el contador por tag
      const count = Object.fromEntries(tags.map((tag) => [tag.name, 0]));

      completedTasks.forEach((task) => {
        const taskTagNames = task.tags.map(tag => tag.name);
        const numTags = taskTagNames.length;

        taskTagNames.forEach((tagName) => {
          if (count.hasOwnProperty(tagName)) {
            count[tagName] += 1 / numTags;
          }
        });
      });

      // Sumar todos los valores para normalizar
      const total = Object.values(count).reduce((sum, value) => sum + value, 0);

      // Convertir a array y normalizar para que la suma sea 100%
      const rateData = Object.entries(count).map(([tag, value]) => {
        const tagData = tags.find(t => t.name === tag);
        return {
          tag,
          count: total > 0 ? parseFloat((value / total * 100).toFixed(2)) : 0,  // Normalización y redondeo
          colour: tagData ? tagData.colour : 0
        };
      });

      setRate(rateData);
    }
  }, [tags, tasks]);

  return (
    <Container>
      <motion.div initial={{ x: "100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
        <Row className="text-center">
          <h1 className="mx-auto" style={{ color: "white" }}>Metricas</h1>
          <h3 className="mx-auto" style={{ color: "white" }}>Porcentaje de cada tag en las tareas terminadas</h3>
        </Row>
        <Row>
          <Col className="chart-container">
            <PieChart width={600} height={500}>
              <Pie
                data={rate}
                dataKey="count"
                nameKey="tag"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label
              >
                {rate.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.colour % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
};

export default Metrics;