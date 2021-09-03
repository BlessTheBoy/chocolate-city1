import "./style.scss";
import artistImage from "../../assets/artistImage.png";

function Comment({ id, name, email, body }) {
  return (
    <div className="comment">
      <div className="comment_header">
        <img src={artistImage} alt="" />
        <div className="header_details">
          <p className="name">{name}</p>
          <a href={`mailto:${email}`} className="email">
            {email}
          </a>
        </div>
      </div>
      <main>{body}</main>
    </div>
  );
}

export default Comment;
