import React from "react";
import { useQuery } from "react-apollo";
import { getBooksQuery } from "../Query/Query";

function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);
  // console.log(data?.books);
  // console.log(loading);
  // console.log(error);

  return (
    <div>
      {loading ? (
        <p>Loading ....</p>
      ) : (
        <ul>
          {data?.books?.map((item, index) => (
            <li key={item.id}>{item?.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default BookList;
