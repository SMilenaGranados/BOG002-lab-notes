import React from "react";
import logoAllNotes from '../assets/LogoAllNotes.png';


const Register = () => {
    return (
        <section>
        <div>
            <img src={logoAllNotes} alt='logo' />
        </div>
        <form>
            <input type="email" placeholder="email" class="input" required></input>
            <p>Mensaje de error</p>
            <input type="password" placeholder="password" class="input" required></input>
            <p>Mensaje de error</p>
            <button type="submit" class="button">Register</button>
            
        </form>
        </section>
    )
}

export default Register