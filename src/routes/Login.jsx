import React from "react";
import logoAllNotes from '../assets/LogoAllNotes.png';
import logoGoogle from '../assets/LogoGoogle.png';


const Login = () => {
    return (
        <section>
        <div>
            <img src={logoAllNotes} alt='logo' />
            <p>¡Don't let anything slip through!<br></br>
            All Notes lets you yake note of everything</p> 
        </div>
        <form>
            <input type="email" placeholder="email" class="input" required></input>
            <p>Mensaje de error</p>
            <input type="password" placeholder="password" class="input" required></input>
            <p>Mensaje de error</p>
            <button type="submit" class="button">Log in</button>
            <button type="submit"><img src={logoGoogle} alt='logoGoogle'/>Log in with Google</button>
        </form>
        <div>
        <button class="button">Registration</button> 
        </div>
        </section>
    )
}

export default Login