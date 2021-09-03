import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./style.scss";
import ArtistDetails from "../../components/ArtistDetails";

function Artist() {
  let { username } = useParams();

  // State for holding artist details and album list
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState(null);

  // Retrieving artist details and album list
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => data.find((user) => user.username === username))
      .then((user) => {
        setArtist(user);
        fetch("https://jsonplaceholder.typicode.com/albums")
          .then((response) => response.json())
          .then((data) =>
            setAlbums(data.filter((album) => album.userId === Number(user.id)))
          );
      });
  }, [username, artist]);

  return (
    <div className="artist">
      {artist && (
        <ArtistDetails
          id={artist.id}
          name={artist.name}
          username={artist.username}
          email={artist.email}
          address={artist.address}
          phone={artist.phone}
          website={artist.website}
          company={artist.company}
        />
      )}

      {albums && (
        <div className="artist_albums">
          <h2>Albums</h2>
          <ol>
            {albums.map((album) => (
              <li>
                <Link to={`/artist/${artist.username}/${album.title}`}>
                  {album.title}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default Artist;
