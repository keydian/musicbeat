import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";
import Homepage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';

function App() {

  return (
    <div className="App">
      <main>
        <Header/>
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
