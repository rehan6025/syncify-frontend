// src/pages/LoggedIn.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoggedIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      fetch("http://localhost:3000/auth/spotify/set-cookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token }),
        credentials: "include" // super important for cookies
      })
        .then(res => {
          if (res.ok) {
            console.log("Cookie set successfully");
            navigate("/profile");
          } else {
            console.error("Failed to set cookie");
          }
        })
        .catch(err => {
          console.error("Error in set-cookie request", err);
        });
    } else {
      console.error("No token found in URL");
    }
  }, []);

  return <p>Setting things up... please wait.</p>;
};

export default LoggedIn;
