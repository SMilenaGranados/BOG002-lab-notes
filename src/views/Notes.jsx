import { auth, fires } from "../configuration/Firebase";
import firebase from "firebase/app";
import "../styles/notes.css";
import { useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import logoAllNotes from "../assets/LogoAllNotes.png";
import pencil from "../assets/Pencil.png";
import line from "../assets/Line.png";
import btnEdit from "../assets/Edit.png";
import btnDelete from "../assets/Delete.png";
import useModal from "../hooks/useModal";
import LoadModal from "../components/LoadModal";

const Notes = () => {
  const [isOpenModal, openModal, closeModal] = useModal();
  const { setUser } = useContext(UserContext);
  const history = useHistory();
  const [notes, setNotes] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const userId = firebase.auth().currentUser;
  console.log("userId ", userId);

  const addOrEditing = async (objectValues) => {
    try {
      if (currentId === "") {
        await fires.collection("notes").doc().set(objectValues);
      } else {
        await fires.collection("notes").doc(currentId).update(objectValues);
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const LogOut = (e) => {
    e.preventDefault();
    auth.signOut().then(() => history.push("/"));
  };

  const deleteNote = (id) => {
    fires.collection("notes").doc(id).delete();
    console.log("Ha sido eliminado");
  };

  const getNotes = async (usuario) => {
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

  useEffect(() => {
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

        <button
          id="buttonAddNote"
          onClick={() => {
            openModal();
            setCurrentId("");
          }}
          type="button"
        >
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

        {/* Published Notes */}
        <div id="listNotes">
          {notes.map((note) => {
            return (
              <div id="publishedNote">
                <div key={note.id}>
                  <h2 id="noteTitle">{note.title}</h2>
                  <div id="containerNoteDate">
                    <p id="noteDate">{note.date}</p>
                  </div>
                  <div>
                    <p id="textNoteMessage">{note.message}</p>
                  </div>

                  <>
                    <button
                      onClick={() => {
                        setCurrentId(note.id);
                        openModal();
                      }}
                      type="button"
                      id="btnEditNote"
                    >
                      <img id="imgEdit" src={btnEdit} alt="btnEdit"></img>
                    </button>
                    <button
                      id="btnDeleteNote"
                      onClick={() => deleteNote(note.id)}
                    >
                      <img id="imgDelete" src={btnDelete} alt="btnDelete"></img>
                    </button>
                  </>
                </div>
              </div>
            );
          })}
        </div>
      </article>

      {/* Modal form add new note */}

      <LoadModal
        isOpenModal={isOpenModal}
        closeModal={closeModal}
        addOrEditing={addOrEditing}
        currentId={currentId}
        notes={notes}
      />
    </section>
  );
};

export default Notes;
