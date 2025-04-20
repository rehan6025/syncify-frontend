// Login.jsx
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Login() {
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    // Clear all possible auth remnants
    const forceCleanup = () => {
      localStorage.removeItem('spotify_auth_state');
      document.cookie = 'spotify_access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = 'spotify_refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    };

    // Check for force parameter
    if (searchParams.get('force') === 'true') {
      forceCleanup();
    }
  }, [searchParams]);

  const handleYtLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/youtube`
  }

  const handleLogin = () => {
    // timestamp to prevent caching
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/spotify?ts=${Date.now()}`;
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with Spotify</button>
      <button onClick={handleYtLogin}>Login with Youtube</button>
    </div>
  );
}