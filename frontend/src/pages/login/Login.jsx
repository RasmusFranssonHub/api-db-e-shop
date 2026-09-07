import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './login.scss'
import heroImage from '../../assets/hero/hero.png';
import iconUser from '../../assets/icons/person.png';

function Login() {
    const [username, setUsername] = useState('')
    const navigate = useNavigate()
    
    const handleLogin = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior


        if (!username.trim()) {
            alert("Vänligen fyll i ditt användarnamn.");
            return;
        }
        localStorage.setItem("username", username.trim());

        navigate("/dashboard"); // Redirect to the dashboard after login

        
    }


    return (
        <div className=
        "login"
        style={{ backgroundImage: `url(${heroImage})` }}
        >

            <div className="login-container"> 
                <h1>SHOP PORTAL LOGIN</h1>
                <p>Fyll i ditt användarnamn för att fortsätta.</p>

                <form onSubmit={handleLogin}>
                    <div className="input-wrapper">
                    <img src={iconUser} alt="User Icon" className="input-icon" />
                    <input
                        id="username"
                        type="text"
                        placeholder="Skriv ditt användarnamn.."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    </div>
                    
                    <button type="submit">
                    Logga in
                    </button>
                </form>
            </div>
        </div>
    );
}
export default Login;