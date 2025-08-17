import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Music, Youtube, ArrowRight, Loader } from 'lucide-react'

//using fetches to transfer playlists
function TransferPlaylistPage() {
    const { playlistId } = useParams();
    const [playlist, setPlaylist] = useState(null);
    const [playlistUrl, setPlaylistUrl] = useState("");
    const [isTransferring, setIsTransferring] = useState(false);
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
        setIsTransferring(true);
        
        setIsTransferring(true);
        
        setIsTransferring(true);
        
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

        if (playlistData?.id) {
            setPlaylistUrl(`https://www.youtube.com/playlist?list=${playlistData.id}`);
        } else {
            console.error('Failed to get playlist ID:', playlistData);
        }

        const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        for (let i = 0; i < videos.length; i++) {
            const video = videos[i];
            
            await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/youtube/playlists/${playlistData.id}/items`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ videoId: video.youtubeId })
            })

            await wait(300);
        }

        setIsTransferring(false);
    };

    if (!playlist) return (
        <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen flex items-center justify-center">
            <div className="text-center">
                <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
                <p className="text-gray-600">Loading playlist...</p>
            </div>
        </div>
    );


   return (
  <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
    <div className="p-8 max-w-2xl mx-auto text-center">
      <div className="relative mb-6 max-w-md mx-auto">
        <img 
          src={playlist.images[0].url} 
          alt={playlist.name} 
          className="w-full h-72 object-cover rounded-xl shadow-lg" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl"></div>
        
        
       
      </div>
      
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{playlist.name}</h1>
      <p className="text-gray-600 mb-2">{playlist.description}</p>
      <p className="text-sm text-gray-500 mb-8">{playlist.tracks?.total} tracks</p>

      {/* Loading Bar */}
      {isTransferring && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="mb-4">
            <p className="text-gray-700 font-medium mb-3">Transferring your playlist...</p>
            
            {/* Continuous Loading Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse">
                <div className="h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2">
           
            <span className="text-sm text-blue-600 font-medium">Please wait...</span>
          </div>
        </div>
      )}

      {isTransferring && (
        <div className="mb-6 bg-white rounded-lg shadow-md p-4">
          <p className="text-gray-700 mb-3">Transferring your playlist...</p>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse">
              <div className="h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30" style={{animation: 'shimmer 2s infinite'}}></div>
            </div>
          </div>
          <p className="text-sm text-blue-600 mt-2">Please wait...</p>
        </div>
      )}

      {isTransferring && (
        <div className="mb-6 bg-white rounded-lg shadow-md p-4">
          <p className="text-gray-700 mb-3">Transferring your playlist...</p>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse">
              <div className="h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30" style={{animation: 'shimmer 2s infinite'}}></div>
            </div>
          </div>
          <p className="text-sm text-blue-600 mt-2">Please wait...</p>
        </div>
      )}

      <button
        onClick={handleTransfer}
        disabled={isTransferring}
        className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
          isTransferring 
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
            : 'bg-blue-100 text-blue-700 cursor-pointer hover:bg-blue-600 hover:text-white transform hover:scale-105'
        } border border-blue-200 shadow-sm hover:shadow-md`}
      >
        {isTransferring ? (
          <div className="flex items-center gap-2">
            
            Transferring...
          </div>
        ) : (
          'Transfer to YouTube'
        )}
      </button>

      {playlistUrl && (
        <a 
          href={playlistUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          
          Open YouTube Playlist
        </a>
      )}
    </div>
  </div>
);
}

export default TransferPlaylistPage
