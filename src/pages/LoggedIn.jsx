// src/pages/LoggedIn.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSpotifyConnected } from '../features/authSlice'

const LoggedIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const accessToken = urlParams.get("access_token");
    const refreshToken = urlParams.get("refresh_token");
    const expiresIn = urlParams.get("expires_in");

    if (accessToken && refreshToken && expiresIn) {
      fetch(`https://syncify-backend-2c5p.onrender.com/auth/spotify/store-tokens`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          access_token: accessToken,
          refresh_token: refreshToken,
          expires_in: expiresIn
        }),
        credentials: "include"
      })
        .then(res => {
          if (res.ok) {
            console.log("All tokens sent and cookie set successfully");
            dispatch(setSpotifyConnected(true));
            setTimeout(() => {
              navigate("/profile");
            }, 100);

            navigate("/profile");
          } else {
            console.error("Failed to set cookie");
          }
        })
        .catch(err => {
          console.error("Error in set-cookie request", err);
        });
    } else {
      console.error("Missing token(s) in URL");
    }
  }, []);

  return <p>Setting things up... please wait.</p>;
};

export default LoggedIn;
