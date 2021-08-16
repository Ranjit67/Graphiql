import { useState } from "react";
import { useQuery } from "react-apollo";
// import { gql } from "apollo-boost";
import { getAuthorQuery } from "../Query/Query";

export default function AddBook() {
  //   const { getAuthorQuery } = Query();
  const { loading, error, data } = useQuery(getAuthorQuery);
  const [bookName, setBookName] = useState();
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState();
  const submitForm = (e) => {
    e.preventDefault();
    console.log(bookName);
    console.log(genre);
    console.log(authorId);
  };
  return (
    <form onSubmit={submitForm}>
      <div>
        <label>Book name</label>
        <input
          type="text"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />
      </div>
      <div>
        <label>Genre</label>
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>
      <div>
        <label>Author</label>
        <select value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
          <option>Select Author</option>
          {data?.authors?.map((author) => (
            <option key={author?.id} value={author.id}>
              {author?.name}
            </option>
          ))}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}
