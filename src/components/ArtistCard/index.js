import "./style.scss";
import artistImage from "../../assets/artistImage.png";
import { Link } from "react-router-dom";

function ArtistCard({
  id,
  name,
  username,
  email,
  address,
  phone,
  website,
  company,
}) {
  return (
    <Link to={`/artist/${id}`}>
      <div className="artistCard">
        <img
          src={artistImage}
          alt={`${name}'s pic`}
          className="artistCard_image"
        />
        <div className="artistCard_details">
          <h2 className="artistCard_name">{name}</h2>
          <p className="artistCard_username">@{username}</p>
          <div className="artistCard_contacts">
            <a href={`mailto:${email}`} className="email">
              {email}
            </a>
            <a href={`tel:${phone}`} className="phone">
              {phone}
            </a>
            <a href={`https://${website}`} className="website">
              {website}
            </a>
          </div>
          <div className="artistCard_details2">
            <address className="address">
              <span>{address.street}</span> <br />
              <span>{address.suite}</span>
              <span>{address.city}</span>
              <span className="address_zip">{address.zipcode}</span>
            </address>
            <div className="company">
              <p>
                <strong>{company.name}</strong>
              </p>
              <p>{company.catchPhrase}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ArtistCard;
