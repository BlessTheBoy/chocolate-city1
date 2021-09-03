import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./style.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

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

  return (
    <div className="album">
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
      <div className="album_comments"></div>
    </div>
  );
}

export default Album;
