import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setSpotifyConnected, setYoutubeConnected, logout } from "../features/authSlice";

function Profile() {
  const { spotifyConnected, youtubeConnected } = useSelector(state => state.auth);
  
  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 p-6">
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Account Overview</h1>
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-blue-100">
            <h2 className="font-semibold text-lg text-indigo-800">Service Connections</h2>
          </div>
          
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white shadow-sm">
              <div className="flex items-center gap-3">
                <span className={`w-4 h-4 rounded-full ${spotifyConnected ? 'bg-green-500' : 'bg-red-500'} 
                  shadow-sm ring-2 ${spotifyConnected ? 'ring-green-200' : 'ring-red-200'}`}></span>
                <span className="font-medium">Spotify</span>
              </div>
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                spotifyConnected 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {spotifyConnected ? 'Connected' : 'Not Connected'}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-white shadow-sm">
              <div className="flex items-center gap-3">
                <span className={`w-4 h-4 rounded-full ${youtubeConnected ? 'bg-green-500' : 'bg-red-500'} 
                  shadow-sm ring-2 ${youtubeConnected ? 'ring-green-200' : 'ring-red-200'}`}></span>
                <span className="font-medium">YouTube</span>
              </div>
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                youtubeConnected 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {youtubeConnected ? 'Connected' : 'Not Connected'}
              </span>
            </div>
          </div>
        </div>
        
       
      </div>
    </div>
  </div>
  );
}

export default Profile
