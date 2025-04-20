  import React, { useEffect, useState } from 'react'
  import { useSelector } from 'react-redux';
  import { useNavigate } from 'react-router-dom'
  import PlaylistCard from '../components/PlaylistCard';


  function Transfer() {
    const navigate = useNavigate();
    const spotifyConnected = useSelector(state => state.auth.spotifyConnected);
    const youtubeConnected = useSelector(state => state.auth.youtubeConnected);
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
      if (!spotifyConnected || !youtubeConnected) {
        alert('connect both spotify and youtube to transfer')
        navigate('/')
      }

    }, [spotifyConnected, youtubeConnected, navigate]);



    useEffect(() => {
      const fetchPlaylists = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/spotify/playlists`, {
          credentials: "include"
        });
        const data = await res.json();
        setPlaylists(data);

      }

      fetchPlaylists();
    }, [])

    const handleSelect = (playlistId) => {
      navigate(`/transfer/${playlistId}`);
    }

    return (
      <div className='bg-gradient-to-r from-blue-600 to-purple-600 '>
        <div className="p-4 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold"><span className='text-white'>Transfer </span><span className='text-yellow-300'>Playlists</span> </h1>
          <p className="text-white mb-6">
            Select a playlist to transfer to YouTube
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {playlists.map(playlist => (
              <PlaylistCard
                key={playlist.id}
                playlist={playlist}
                onSelect={() => handleSelect(playlist.id)}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  export default Transfer
