
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Form from './components/form';
import Game from './components/Game';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;