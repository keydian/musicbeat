import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import Homepage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';
import StartPage from './components/StartPage';
import jwtDecode from "jwt-decode";
import Header from './components/Header';
import { useEffect } from 'react';
import {connect} from "react-redux";
import { dispatch_to_props, FullProps, state_to_props } from './redux/redux';
import { Token } from './types/types';

function App(Props : FullProps) {
  
  //TODO: fazer com que n apareça o header no login e no register
  useEffect( () => {
    let token = localStorage.getItem("token");
    if (!Props.isLogged && token) {
      let decodedTkn = jwtDecode<Token>(token);
      Props.login({
        isLogged: true,
        username: decodedTkn.username,
        token: token,
      });
    }
  }, [])
  
  return (
    <div className="App">
      <main>
        <Header/>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/home" element={<StartPage/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default connect(state_to_props, dispatch_to_props)(App);
