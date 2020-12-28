import "./Card.css";
import { Link } from "react-router-dom";

function Card({ blogData }) {
  let date = new Date(blogData.createdAt);
  date = date.toDateString();

  const summary = blogData.post.slice(0, 80) + "...";

  return (
    <>
      <div className="card">
        <div className="blogs-title">
          <Link to={`blog/${blogData._id}`}>{blogData.title}</Link>
        </div>
        <div className="blogs-post">{summary}</div>
        <div className="blogs-author">
          <Link to={`user/${blogData.author._id}`}>
            {blogData.author.username}
          </Link>
        </div>
        <div className="blogs-date">{date}</div>
      </div>
    </>
  );
}

export default Card;
