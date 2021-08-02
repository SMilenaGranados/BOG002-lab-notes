import React from "react";
import "../styles/notes.css";
import logoAllNotes from "../assets/LogoAllNotes.png";
import pencil from "../assets/Pencil.png";
import line from "../assets/Line.png";



const Notes = () => {
  return (
    <section id="sectionNotes">
      <header id="headerNotes">
        <div>
          <img id="logoAllNotesNot" src={logoAllNotes} alt="logo" />
        </div>
        <p id="HiUser">Hi! ... </p>

        <button id="buttonAddNote" type="button">
          Add your new note
          <img id="logoPencil" src={pencil} alt="logoPencil" />
        </button>

        <button id="buttonLogOut" type="button" class="button">
          Log Out
        </button>
      </header>
      <div>
        <img id="line" src={line} alt="line"></img>
      </div>

      <div>
        <p>Aqui van las notas</p>
      </div>
    </section>
  );
};

export default Notes;
