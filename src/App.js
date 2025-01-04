import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import { motion } from 'motion/react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <motion.img animate={{ x: 100 }} transition={{ type: "spring" }} src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button> Hola </Button>
      </header>
    </div>
  );
}

export default App;
