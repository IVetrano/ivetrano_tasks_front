import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import { motion } from "framer-motion";
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './TaskCalendar.css';

const COLORS = ["#dc3545", "#6f42c1", "#fd7e14", "#198754", "#0d6efd", "#d63384"];

moment.locale('es');
const localizer = momentLocalizer(moment);

const messages = {
  previous: 'Anterior',
  next: 'Siguiente',
  today: 'Actual',
  showMore: total => `+ Ver más (${total})`
};

const TaskCalendar = () => {
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://ivetranotask.pythonanywhere.com/tasks")
      .then((response) => response.json())
      .then((data) => {
        data = data.map((task) => {
          const color = COLORS[task.tags[0].colour];
          return {
            title: task.title,
            start: new Date(task.end_date),
            end: new Date(task.end_date),
            allDay: true,
            style: { backgroundColor: color, color: 'white' }
          };
        });
        setEvents(data);
      })
      .catch((error) => console.error("Error al obtener las tareas:", error));
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <motion.div initial={{ x: "100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-center">
            <h1 className="mx-auto" style={{ color: "white" }}>Calendario</h1>
            <Calendar
              views={[Views.MONTH]}
              defaultView={view}
              view={view}
              date={date}
              onView={(view) => setView(view)}
              onNavigate={(date) => {
                setDate(new Date(date));
              }}
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 600, color: 'white' }}
              selectable
              popup
              messages={messages}
              eventPropGetter={(event) => ({
                style: event.style
              })}
            />
          </motion.div>
        </Col>
      </Row>
    </Container>
  )
}

export default TaskCalendar;