import './App.css';
import {
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import Homepage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';
import StartPage from './components/StartPage';
import jwtDecode from "jwt-decode";
import Header from './components/Header';
import { useEffect } from 'react';
import { connect } from "react-redux";
import { dispatch_to_props, FullProps, state_to_props } from './redux/redux';
import { Token } from './types/types';
import { createTheme, ThemeProvider } from "@mui/material";
import Profile from './components/profile/Profile';
import MyCollections from './components/collection/MyCollections';
import CollectionPage from './components/collection/CollectionPage';
import MusicPlayer from './components/MusicPlayer';
import SongPage from './components/songs/SongPage';
import AlbumPage from './components/albums/AlbumPage';
import JamsPage from './components/jams/JamsPage';
import JamPage from './components/jams/JamPage';


function App(Props: FullProps) {

  const theme = createTheme({
    typography: {
      fontFamily: ['Lato'].join()
    }
  })

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    if (!Props.isLogged && token) {
      let decodedTkn = jwtDecode<Token>(token);
      Props.login({
        isLogged: true,
        username: decodedTkn.username,
        token: token,
        jam: decodedTkn.jam
      });
    }
  }, [])

  let location = useLocation();
  const inJam = () => {
    if(!location.pathname.includes("jams") && location.pathname.includes('jam')) {
      return true;
    }
    return false
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <main>
          {location.pathname !== '/login' && location.pathname !== '/register' && (location.pathname !== '/' || Props.isLogged) &&
            <Header />
          }
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<StartPage />} />
            <Route path="/jams" element={<JamsPage />} />
            <Route path="/jam/:jamid" element={<JamPage />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/collections/:username" element={<MyCollections />} />
            <Route path="/collection/:collectionid" element={<CollectionPage />} />
            <Route path="/songs/:songid" element={<SongPage />} />
            <Route path="/albums/:albumname" element={<AlbumPage />} />
          </Routes>
          {location.pathname !== '/login' && location.pathname !== '/register' && !inJam() && (location.pathname !== '/' || Props.isLogged) &&
            <MusicPlayer />
          }
        </main>
      </div>
    </ThemeProvider>
  );
}

export default connect(state_to_props, dispatch_to_props)(App);
