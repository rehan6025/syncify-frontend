
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Transfer from './pages/Transfer'
import Profile from './pages/Profile'
import TransferPlaylistPage from './pages/TransferPlaylistPage'
import HowItWorks from './pages/HowItWorks'

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/transfer" element={<Transfer/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/transfer/:playlistId" element={<TransferPlaylistPage/>} />
        <Route path="/how-it-works" element={<HowItWorks/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
