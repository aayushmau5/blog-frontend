import "./Card.css";
import { Link } from "react-router-dom";

function Card({ blogData }) {
  let date = new Date(blogData.createdAt);
  date = date.toDateString();

  const summary = blogData.post.slice(0, 80) + '...';

  return (
    <>
      <div className="card">
        <div className="blog-title">
          <Link to={`blog/${blogData._id}`}>{blogData.title}</Link>
        </div>
        <div className="blog-post">{summary}</div>
        <div className="blog-author">{blogData.author.username}</div>
        <div className="blog-date">{date}</div>
      </div>
    </>
  );
}

export default Card;
