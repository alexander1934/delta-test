import { useState, useEffect } from "react";
import s from "./ModalContent.module.css";
import axios from "axios";


const ModalContent = (props) => {
  let [userComment, setUserComment] = useState("");

  function changeText(event) {
    setUserComment(event.target.value);
  }

  let postRequest = () => axios.post(`http://test-backend.itdelta.agency/api/image/${props.info.id}/comments`, {
    comment: userComment
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

  return (
    <div className={s.container}>
      <img src={props.info.largeImage} alt="" className={s.largeImage} />
      <div>
        <p>Comments:</p>
        <div>
          {props.info.comments.map((comment) => {
            return (
              <div className={s.comment}>
                <p className={s.author}>{comment.author}</p>
                <p>{comment.text}</p>
              </div>
            );
          })}
        </div>
        <input
          value={userComment}
          type="text"
          placeholder="Type comment..."
          className={s.input}
          onChange={changeText}
        />
      </div>
      <div className={s.buttonBlock}>
        <button onClick={props.closeModal} className={s.button}>
          Закрыть
        </button>
        <button onClick={() => postRequest()} className={s.button}>
          Отправить комментарий
        </button>
      </div>
    </div>
  );
};

export default ModalContent;
