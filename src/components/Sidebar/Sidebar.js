import React from "react";
import { Button, Container } from 'react-bootstrap';
import { ReactComponent as Logo} from '../../logo.svg';
import { FaListCheck } from "react-icons/fa6";
import { FaChartPie, FaCalendarCheck } from "react-icons/fa";

const Sidebar = ({ onSelect }) => {
  return (
    <Container className="d-flex flex-column p-0 text-white vh-100" style={{backgroundColor: "#1a1e21"}}>
      <Button className="mt-3 border-0" style={{backgroundColor: "#1a1e21"}} onClick={() => onSelect("home")}>
        <Logo className="w-100 h-100" />
      </Button>
      <hr className="mb-4 w-75 mx-auto" />
      <Button variant="outline-light" className="mb-4 mx-1 border-0" 
        onClick={() => onSelect("tasks")}><FaListCheck className="w-100 h-100"/></Button>
      <Button variant="outline-light" className="mb-4 mx-1 border-0" 
        onClick={() => onSelect("calendar")}><FaCalendarCheck className="w-100 h-100"/></Button>
      <Button variant="outline-light" className="mb-4 mx-1 border-0" 
      onClick={() => onSelect("metrics")}><FaChartPie className="w-100 h-100"/></Button>
    </Container>
  );
};

export default Sidebar;