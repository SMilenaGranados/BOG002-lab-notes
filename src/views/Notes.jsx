import { auth, fires } from "../configuration/Firebase";
import firebase from "firebase/app";
import "../styles/notes.css";
import { useForm } from "../hooks/useForm";
import { useHistory } from "react-router-dom";
import logoAllNotes from "../assets/LogoAllNotes.png";
import pencil from "../assets/Pencil.png";
import savePost from "../assets/Save.png";
import line from "../assets/Line.png";
import btnEdit from "../assets/Edit.png";
import btnDelete from "../assets/Delete.png";
import Modal from "../components/Modal";
import useModal from "../hooks/useModal";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const Notes = () => {
  const { user, setUser } = useContext(UserContext);
  const [formValues, handleInputChange, reset] = useForm({
    title: "",
    date: "",
    message: "",
  });

  const { title, date, message } = formValues;
  const [isOpenModal, openModal, closeModal] = useModal();
  const history = useHistory();
  const [notes, setNotes] = useState([]);

  const userId = firebase.auth().currentUser;

  const addNote = async (e) => {
    e.preventDefault();

    await fires.collection("notes").doc().set({
      uid: user,
      Title: title,
      Date: date,
      Contents: message,
    });
    console.log("envie nota");
    reset(formValues);
  };

  const LogOut = (e) => {
    e.preventDefault();
    auth.signOut().then(() => history.push("/"));
  };

  const getNotes = async (usuario) => {
    console.log("userr ", usuario);
    fires
      .collection("notes")
      .where("uid", "==", usuario)
      .onSnapshot((querySnapshop) => {
        const notesArray = [];
        querySnapshop.forEach((doc) => {
          notesArray.push({ ...doc.data(), id: doc.id });
        });
        setNotes(notesArray);
      });
  };
  console.log(notes);

  useEffect(() => {
    console.log("holaaaaa");
    if (userId) {
      setUser(userId.uid);
      getNotes(userId.uid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <section id="sectionNotes">
      <header id="headerNotes">
        <div>
          <img id="logoAllNotesNot" src={logoAllNotes} alt="logo" />
        </div>
        <p id="HiUser">Hi! ... </p>

        <button id="buttonAddNote" onClick={openModal} type="button">
          Add your new note
          <img id="logoPencil" src={pencil} alt="logoPencil" />
        </button>

        <button
          id="buttonLogOut"
          onClick={LogOut}
          type="button"
          className="button"
        >
          Log Out
        </button>
      </header>

      <article>
        <div>
          <img id="line" src={line} alt="line"></img>
        </div>
        

        <div id="listNotes">
          {notes.map((note) => {
            return (
              <div id="publishedNote">
                <div key={note.id}>
                  <h2 id="noteTitle">{note.Title}</h2>
                  <div id="containerNoteDate">
                  <p id="noteDate">{note.Date}</p>
                  </div>
                  <textarea id="textNoteMessage" disabled="true">
                    {note.Contents}
                  </textarea>

                  <>
                    <button id="btnEditNote">
                      {<img id="imgEdit" src={btnEdit} alt="btnEdit"></img>}
                    </button>
                    <button id="btnDeleteNote">
                      {
                        <img
                          id="imgDelete"
                          src={btnDelete}
                          alt="btnDelete"
                        ></img>
                      }
                    </button>
                  </>
                </div>
              </div>
            );
          })}
        </div>
      </article>

      {/* Modal form add new note */}
      <Modal isOpen={isOpenModal} closeModal={closeModal} title="New Note">
        <form onSubmit={addNote}>
          <div className="form-note">
            <input
              id="title"
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={handleInputChange}
              required
            ></input>
          </div>
          <div className="form-note">
            <p id="DateToRemember">Date to remember</p>
            <input
              id="date"
              type="date"
              placeholder="Date to remember"
              name="date"
              value={date}
              onChange={handleInputChange}
              required
            ></input>
          </div>
          <div className="form-note">
            <textarea
              id="message"
              type="text"
              placeholder="Note"
              name="message"
              rows="5"
              value={message}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <button id="buttonPost" type="submit" className="button">
            <img id="imgBtnPost" src={savePost} alt="savePost" />
          </button>
        </form>
      </Modal>
    </section>
  );
};

export default Notes;
