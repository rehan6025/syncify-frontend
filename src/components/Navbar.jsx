import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import ConnectButton from './ConnectButton';

function Navbar() {
  const { spotifyConnected, youtubeConnected } = useSelector(state => state.auth);
  const location = useLocation();
  
  // Check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <nav className='bg-gradient-to-r from-blue-700 to-purple-700 text-white shadow-md'>
      <div className='container mx-auto px-4 py-3 flex flex-col sm:flex-row sm:justify-between items-center'>
        {/* Logo */}
        <Link to='/' className='text-xl font-bold mb-3 sm:mb-0'>
          <span className='text-white'>Syn<span className='text-yellow-300'>cify</span></span>
        </Link>
        
        {/* Navigation links */}
        <div className='flex flex-wrap items-center gap-6'>
          <Link 
            to='/transfer' 
            className={`hover:text-yellow-200 transition-colors ${isActive('/transfer') ? 'font-medium text-yellow-300' : ''}`}
          >
            Transfer
          </Link>
          <Link 
            to='/profile' 
            className={`hover:text-yellow-200 transition-colors ${isActive('/profile') ? 'font-medium text-yellow-300' : ''}`}
          >
            Profile
          </Link>
          
          {/* Connection status */}
          <div className='flex gap-3'>
            {spotifyConnected ? (
              <span
              className="bg-purple-500 hover:shadow-md bg-opacity-50 px-3 py-1 rounded flex items-center gap-1  cursor-pointer shadow-blue-500 
           
            hover:ring-blue-500 hover:ring-2 transition-ring
            hover:bg-purple-400 transition-colors duration-300 
            hover:scale-105 transition-transform
             "
            >
              <span className="w-2 h-2 bg-green-400 rounded-full relative top-0.5 "></span>
                Spotify
              </span>
            ) : (
              <ConnectButton service="spotify" />
            )}

            {youtubeConnected ? (
              <span className="bg-purple-500 hover:shadow-md bg-opacity-50 px-3 py-1 rounded flex items-center gap-1  cursor-pointer shadow-blue-500 
              hover:ring-blue-500 hover:ring-2 transition-ring
              hover:bg-purple-400 transition-colors duration-300 
              hover:scale-105 transition-transform
               ">
                <span className='w-2 h-2 bg-green-400 rounded-full relative top-0.5'></span>
                YouTube
              </span>
            ) : (
              <ConnectButton service="youtube" />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar
