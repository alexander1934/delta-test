import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Modal from "react-modal";
import ModalContent from "./ModalContent/ModalContent";

function App() {
  let [images, setImages] = useState([]);

  let [isLoading, setLoading] = useState(false);

  let [info, setInfo] = useState({});

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (id) => {
    setModalIsOpen(true);
    fetch(`http://test-backend.itdelta.agency/api/image/${id}`, setInfo)
    setLoading(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  let fetch = (url, setResponce) => {
    axios
      .get(url)
      .then((responce) => {
        setResponce(responce.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetch("http://test-backend.itdelta.agency/api/images", setImages);
  }, []);
  return (
    <div className="App">
      <div className="container">
        <div className="photo-grid">
          {images.map((item) => {
            return (
              <div>
              <button onClick={()=> openModal(item.id) }><img src={item.image} alt="" className="grid-item" /></button>
            </div>
          )})}
        </div>
        {isLoading ? <p></p> : <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                <ModalContent closeModal={closeModal} info={info} />
        </Modal>}
      </div>
    </div>
  );
}

export default App;
