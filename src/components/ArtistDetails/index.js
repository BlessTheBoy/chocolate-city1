import "./style.scss";
import artistImage from "../../assets/artistImage.png";

function ArtistDetails({
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
    <div className="artistDetails">
      <img
        src={artistImage}
        alt={`${name}'s pic`}
        className="artistDetails_image"
      />
      <div className="artistDetails_details">
        <h1 className="artistDetails_name">{name}</h1>
        <p className="artistDetails_username">@{username}</p>
        <div className="artistDetails_contacts">
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
        <div className="artistDetails_details2">
          <address className="address">
            <p className="subhead">Address</p>
            <span>{address.street}</span> <br />
            <span>{address.suite}</span>
            <span>{address.city}</span>
            <span className="address_zip">{address.zipcode}</span>
          </address>
          <div className="company">
            <p className="subhead">company</p>
            <p>
              <strong>{company.name}</strong>
            </p>
            <p>{company.catchPhrase}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistDetails;
