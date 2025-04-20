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
        <div className='bg-gradient-to-r from-blue-600 to-purple-600 min-h-screen'>
            <div className='p-6 max-w-xl mx-auto text-center '>
                <img src={playlist.images[0].url} alt={playlist.name} className='w-full h-64 object-cover rounded' />
                <h1 className='text-3xl font-bold mt-4'>{playlist.name}</h1>
                <p className="text-gray-600 mb-4">{playlist.description}</p>

                <button
                    onClick={handleTransfer}
                    className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded"
                >
                    Transfer to Youtube
                </button>

                {playlistUrl && (
                    <a href={playlistUrl}
                        target='_blank'
                        className="mt-4 inline-block px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-lg rounded"
                    >
                        Open Playlist
                    </a>
                )}
            </div>
        </div>

    )
}

export default TransferPlaylistPage