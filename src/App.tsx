import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";
import Homepage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';

function App() {

  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
