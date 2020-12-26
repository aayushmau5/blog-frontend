import axios from "axios";
import { useQuery } from "react-query";

import Card from "../Card/Card";
import "./Blogs.css";

function Blogs() {
  let blogs = [];
  let display = "";

  const { status, data, error } = useQuery("blogs", () =>
    axios.get("http://localhost:8080/blogs")
  );

  if (data) {
    blogs = data.data.blogs;
  }

  if (status === "loading") {
    display = <h1>Loading....</h1>;
  } else if (status === "error") {
    display = <h2>Error: {error.message}</h2>;
  } else {
    display = blogs.map((blog) => <Card key={blog._id} blogData={blog} />);
  }

  return (
    <div className="blogs-home">
      <h1>Blogs</h1>
      {display}
    </div>
  );
}

export default Blogs;
