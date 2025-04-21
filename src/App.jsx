import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Transfer from './pages/Transfer'
import Profile from './pages/Profile'
import TransferPlaylistPage from './pages/TransferPlaylistPage'
import HowItWorks from './pages/HowItWorks'
import LoggedIn from './pages/LoggedIn'

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setSpotifyConnected, setYoutubeConnected } from './features/authSlice';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/status`, {
          credentials: 'include'
        });
        const data = await res.json();

        dispatch(setSpotifyConnected(data.spotifyConnected));
        dispatch(setYoutubeConnected(data.youtubeConnected));
      } catch (err) {
        console.error('Failed to check auth status:', err);
      }
    };

    checkAuth();
  }, []);
  
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/transfer" element={<Transfer/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/transfer/:playlistId" element={<TransferPlaylistPage/>} />
        <Route path="/how-it-works" element={<HowItWorks/>} />
        <Route path="/loggedin" element={<LoggedIn/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
