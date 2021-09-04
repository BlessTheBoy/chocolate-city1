import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./style.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Comment from "./../../components/Comment";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "500px",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement("#album");

function Album() {
  let { username, id } = useParams();

  // State for holding artist details and album list
  const [title, setTitle] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [comments, setComments] = useState(null);

  // getting title if it is not passed as a prop
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((response) => response.json())
      .then((data) =>
        setTitle(data.find((album) => album.id === Number(id)).title)
      );
  }, [id]);

  // Retrieving album photos and comments
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)
      .then((response) => response.json())
      .then((data) => data.filter((pic) => pic.albumId === Number(id)))
      .then((pics) => {
        setPhotos(pics);
        fetch("https://jsonplaceholder.typicode.com/comments")
          .then((response) => response.json())
          .then((data) =>
            setComments(data.filter((comment) => comment.postId === Number(id)))
          );
      });
  }, [id]);

  // Modal variables
  const [modalIsOpen, setIsOpen] = useState(false);
  const postButton = useRef(null);
  const nameInputGroup = useRef(null);
  const emailInputGroup = useRef(null);
  const commentInputGroup = useRef(null);
  const nameError = useRef(null);
  const emailError = useRef(null);
  const commentError = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [validName, setValidName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validComment, setValidComment] = useState(false);

  if (validName && validEmail && validComment) {
    postButton.current.disabled = false;
  }

  function openModal() {
    setIsOpen(true);
  }

  function validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  function validate(state, setState, inputGroup, errElement, validState) {
    setState(state);

    if (!state) {
      inputGroup.current.classList.add("error");
      errElement.current.innerHtml = "field cannot be empty";
      validState(false);

      return;
    } else {
      if (setState === setEmail && !validateEmail(state)) {
        inputGroup.current.classList.add("error");
        errElement.current.textContent = "enter valid email";
        validState(false);

        return;
      }

      inputGroup.current.classList.remove("error");
      inputGroup.current.classList.add("success");
      validState(true);
    }
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="album" id="album">
      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="albumModal">
          <h3>Comment</h3>
          <form>
            <div className="input_group" ref={nameInputGroup}>
              <label htmlFor="name">Name</label>
              <span className="err" ref={nameError}>
                error message
              </span>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) =>
                  validate(
                    e.target.value,
                    setName,
                    nameInputGroup,
                    nameError,
                    setValidName
                  )
                }
              />
            </div>
            <div className="input_group" ref={emailInputGroup}>
              <label htmlFor="email">Email</label>
              <span className="err" ref={emailError}>
                error message
              </span>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) =>
                  validate(
                    e.target.value,
                    setEmail,
                    emailInputGroup,
                    emailError,
                    setValidEmail
                  )
                }
              />
            </div>
            <div className="input_group" ref={commentInputGroup}>
              <label htmlFor="comment">Comment</label>
              <span className="err" ref={commentError}>
                error message
              </span>
              <textarea
                name="comment"
                id="comment"
                cols="30"
                rows="10"
                value={comment}
                onChange={(e) =>
                  validate(
                    e.target.value,
                    setComment,
                    commentInputGroup,
                    commentError,
                    setValidComment
                  )
                }
              ></textarea>
            </div>
            <div className="buttons">
              <button onClick={closeModal}>Cancel</button>
              <button onClick={closeModal} ref={postButton} disabled>
                Post
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <div className="album_header">
        {title && <h1>{title}</h1>}
        <h2>Album</h2>
        <p>
          <Link to={`/artist/${username}`}>@{username}</Link>
        </p>
      </div>
      <div className="album_carousel">
        {photos && (
          <Carousel>
            {photos.map((photo) => (
              <div key={photo.id}>
                <a href={photo.url}>
                  <img src={photo.thumbnailUrl} alt={photo.title} />
                </a>
                <p className="legend">{photo.title}</p>
              </div>
            ))}
          </Carousel>
        )}
      </div>
      <div className="album_comments">
        <div className="header">
          <h2>Comments</h2>
          <button onClick={openModal}>Add comment</button>
        </div>
        {comments && (
          <div className="list">
            {comments.map(({ id, name, email, body }) => (
              <Comment key={id} id={id} name={name} email={email} body={body} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Album;
