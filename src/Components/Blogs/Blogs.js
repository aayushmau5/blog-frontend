import Card from "../Card/Card";
import "./Blogs.css";

function Blogs() {
  const blogs = [
    {
      id: 1,
      title: "A title",
      post: "A post",
      author: "A author",
      createdAt: "a date",
    },
    {
      id: 2,
      title: "Another title",
      post: "Another post",
      author: "Another author",
      createdAt: "another date",
    },
    {
      id: 3,
      title: "Another title",
      post: "lorem ipsum dolor sit amet, something something yada yada yada",
      author: "Another author",
      createdAt: "another date",
    },
  ];
  return (
    <>
      <div className="blogs-home">
        <h1>Blogs</h1>
        {blogs.map((blog) => (
          <Card key={blog.id} blogData={blog} />
        ))}
      </div>
    </>
  );
}

export default Blogs;
