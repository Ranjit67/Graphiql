import { gql } from "apollo-boost";
const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;
const getAuthorQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

export { getBooksQuery, getAuthorQuery };
