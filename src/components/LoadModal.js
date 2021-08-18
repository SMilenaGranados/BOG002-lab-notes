import React, {useContext, useState, useEffect} from "react";
import Modal from "../components/Modal";
import { fires } from "../configuration/Firebase";
import { UserContext } from "../context/UserContext";

const LoadModal = ({isOpenModal, closeModal, addOrEditing, currentId}) => {

    const { user } = useContext(UserContext);

    const initialState = {
        title: "",
        date: "",
        message: "",
    }
    const [formValues, setFormValues] = useState(initialState);
    const { title, date, message } = formValues;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addOrEditing({...formValues, uid: user});
        setFormValues({...initialState, uid: user})
        closeModal()
    }

    const getLinkById = async (id) => {
        const doc = await fires.collection("notes").doc(id).get();
        setFormValues({...doc.data()});
    };

    useEffect(() => {
        if (currentId === "") {
            setFormValues({...initialState});
        } else {
            getLinkById(currentId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentId]);

    return (
        <Modal isOpen={isOpenModal} closeModal={closeModal} title="New Note">
            <form onSubmit={handleSubmit}>
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
                {currentId === '' ? 'Guardar' : 'Editar'}               
            </button>
            </form>
        </Modal>
    )
}

export default LoadModal