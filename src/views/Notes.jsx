import { auth, fires } from "../configuration/Firebase";
import "../styles/notes.css";
import { useForm } from "../hooks/useForm";
import { useHistory } from "react-router-dom";
import logoAllNotes from "../assets/LogoAllNotes.png";
import pencil from "../assets/Pencil.png";
import savePost from "../assets/Save.png";
import line from "../assets/Line.png";
import Modal from "../components/Modal";
import useModal from "../hooks/useModal";

const Notes = () => {
  const [formValues, handleInputChange] = useForm({
    title: "",
    date: "",
    message: "",
  });

  const { title, date, message } = formValues;
  const [isOpenModal, openModal, closeModal] = useModal();
  const history = useHistory();

  const addNote = (e) => {
    e.preventDefault();
    const storeCollection = fires.collection(title, date, message);
    return storeCollection.add({
      Title: title,
      Date: date,
      Contents: message,
    });
  };

  const LogOut = (e) => {
    e.preventDefault();
    auth.signOut().then(() => history.push("/"));
  };

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
      <div>
        <img id="line" src={line} alt="line"></img>
      </div>

      <Modal isOpen={isOpenModal} closeModal={closeModal} title="New Note">
        <form onSubmit={addNote}>
          <div className="form-note">
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={handleInputChange}
              required
            ></input>
          </div>
          <div className="form-note">
            <input
              id="date"
              type="date"
              name="date"
              placeholder="Date to remember"
              value={date}
              onChange={handleInputChange}
              required
            ></input>
          </div>
          <div className="form-note">
            <textarea
              id="message"
              type="text"
              name="message"
              placeholder="Note"
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
