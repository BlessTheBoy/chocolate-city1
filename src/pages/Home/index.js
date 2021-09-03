import { useEffect, useState } from "react";
import ArtistCard from "../../components/ArtistCard";
import "./style.scss";

function Home() {
  // State for holding users
  const [artists, setArtists] = useState(null);

  useEffect(() => {
    // Retrieving users
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setArtists(data));
  }, []);

  return (
    <div className="home">
      <h1 className="home_heading">Artists</h1>
      {artists &&
        artists.map(
          ({ id, name, username, email, address, phone, website, company }) => (
            <ArtistCard
              key={id}
              id={id}
              name={name}
              username={username}
              email={email}
              address={address}
              phone={phone}
              website={website}
              company={company}
            />
          )
        )}
    </div>
  );
}

export default Home;
