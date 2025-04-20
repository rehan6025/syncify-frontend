import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setSpotifyConnected, setYoutubeConnected, logout } from "../features/authSlice";

function Profile() {
  const { spotifyConnected, youtubeConnected } = useSelector(state => state.auth);
  
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Account Overview</h1>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="font-semibold mb-2">Service Connections</h2>
          <div className="space-y-2">
            <div className={`flex items-center gap-2 ${spotifyConnected ? 'text-green-600' : 'text-red-600'}`}>
              <span className={`w-3 h-3 rounded-full ${spotifyConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
              Spotify {spotifyConnected ? 'Connected' : 'Not Connected'}
            </div>
            <div className={`flex items-center gap-2 ${youtubeConnected ? 'text-green-600' : 'text-red-600'}`}>
              <span className={`w-3 h-3 rounded-full ${youtubeConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
              YouTube {youtubeConnected ? 'Connected' : 'Not Connected'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile