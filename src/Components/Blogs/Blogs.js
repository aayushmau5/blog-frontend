import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

import Card from "../Card/Card";
import "./Blogs.css";

const dataPerPage = 6;
let totalPage = 1;

function Blogs() {
  const [page, setPage] = useState(1);
  let blogs = [];
  let display = "";

  const { status, data, error } = useQuery(
    ["blogs", page],
    () => axios.get(`/blogs?data=${dataPerPage}&page=${page}`),
    { keepPreviousData: true, cacheTime: 900000 }
  );

  if (data) {
    blogs = data.data.blogs;
    totalPage = Math.ceil(data.data.blogs.length / dataPerPage);
    console.log(totalPage, blogs);
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
      <h1 className="blogs-heading">Blogs</h1>
      <div className="pagination-links">
        {page !== 1 && page !== 0 ? (
          <button onClick={() => setPage((oldVal) => oldVal - 1)}>Prev</button>
        ) : null}
        <div className="page-num">{page}</div>
        {page !== totalPage && totalPage !== 0 ? (
          <button onClick={() => setPage((oldVal) => oldVal + 1)}>Next</button>
        ) : null}
      </div>
      {display}
    </div>
  );
}

export default Blogs;
