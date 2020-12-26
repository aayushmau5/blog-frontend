import "./Card.css";
import {Link} from 'react-router-dom';

function Card({ blogData }) {
  const doSomething = () => {
    console.log(`Blog opened ${blogData.id}`);
  };

  return (
    <>
      <div className="card" onClick={doSomething}>
        <div className="blog-title"><Link to={`blog/${blogData.id}`}>{blogData.title}</Link></div>
        <div className="blog-post">{blogData.post}</div>
        <div className="blog-author">{blogData.author}</div>
        <div className="blog-date">{blogData.createdAt}</div>
      </div>
    </>
  );
}

export default Card;
