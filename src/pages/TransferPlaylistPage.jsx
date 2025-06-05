import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

//using fetches to transfer playlists
function TransferPlaylistPage() {
    const { playlistId } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [playlistUrl, setPlaylistUrl] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlaylist = async () => {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/spotify/playlists`, {
                credentials: "include"
            });

            const data = await res.json();

            const selected = data.find(p => (p.id === playlistId));
            if (!selected) {
                alert("playlist not found")
                navigate('/transfer')
                return;
            }
            setPlaylist(selected);
        }
        fetchPlaylist();
    }, [playlistId]);

    const handleTransfer = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/spotify/tracks/${playlistId}`, {
            credentials: 'include'
        })
        const data = await res.json();

        const transferRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/youtube/batch-match`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ playlistId, spotifyTracks: data })
        })

        const response = await transferRes.json();
        console.log(response);

        const videos = response.results;

        const createPlaylist = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/youtube/playlists`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: `${playlist.name} - Syncify` })
        })
        const playlistData = await createPlaylist.json();

        //Getting youtube playlist link 
        if (playlistData?.id) {
            setPlaylistUrl(`https://www.youtube.com/playlist?list=${playlistData.id}`);
            console.log('New playlist URL will be set');
        } else {
            console.error('Failed to get playlist ID:', playlistData);
        }

        //https://www.youtube.com/playlist?list=PLBHubnbSvTmQami9Sr8Mb5Rg5stZJ2e_u

        const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        for (const video of videos) {
            const add = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/youtube/playlists/${playlistData.id}/items`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ videoId: video.youtubeId })
            })

            await wait(300);
        }

        alert("transfer complete");
    };

    if (!playlist) return <div>Loading...</div>


   return (
  <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
    <div className="p-8 max-w-xl mx-auto text-center">
      <div className="relative mb-6">
        <img 
          src={playlist.images[0].url} 
          alt={playlist.name} 
          className="w-full h-72 object-cover rounded-lg shadow-md" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
      </div>
      
      <h1 className="text-3xl font-bold mt-4 text-gray-800">{playlist.name}</h1>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{playlist.description}</p>

      <button
        onClick={handleTransfer}
        className="bg-blue-100 px-6 py-3 rounded-lg cursor-pointer text-blue-700 font-medium
          border border-blue-200 hover:bg-blue-600 hover:text-white
          transition-all duration-300 shadow-sm hover:shadow-md
          transform hover:scale-105"
      >
        Transfer to Youtube
      </button>

      {playlistUrl && (
        <a 
          href={playlistUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all"
        >
          Open Playlist
        </a>
      )}
    </div>
  </div>
);
}

export default TransferPlaylistPage
