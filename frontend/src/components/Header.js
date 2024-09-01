import { Link } from "react-router-dom";
import axios from 'axios';

export default function Header(props) {
    // Button text for header
    const loginButton = "Login";
    const registerButton = "Register";
    const logoutButton = "Logout";

    //State to see if a user is logged in
    const isLoggedIn = () => {
        const token = localStorage.getItem('authToken');
        return !!token; // Returns true if token exists, false otherwise
    };

    // Function to log user out of app
    const handleLogout = async () => {
        try {
          // Optionally, notify the backend that the user is logging out
          await axios.post('http://localhost:3001/logout', {}, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
          });
    
          // Remove the token from local storage
          localStorage.removeItem('authToken');
    
        } catch (error) {
          console.error('Logout failed:', error);
        }
      };

    // Returns the header, includes ternary operator to swap out logout/login buttons depending on login status of user
    return (
        <div className="header">
            <header>
                <div>
                    <img className="logo-icon" alt="small-volcano-logo" />
                </div>
                <div>
                    <h2 className="header-title">
                        Video Transcoder App
                    </h2>
                </div>
                {isLoggedIn ? (
                    <div className="logoutButton">
                        <Link className="logout-button lexend text-button-no-underline" onClick={handleLogout}>{logoutButton}</Link>

                    </div>
                ) : (
                    <div className="logoutButton">
                        <Link className="logout-button lexend text-button-no-underline" to='/login'>{loginButton}</Link>
                        <Link className="logout-button lexend text-button-no-underline" to='/register'>{registerButton}</Link>
                    </div>)}
            </header>
        </div>
    )
}

