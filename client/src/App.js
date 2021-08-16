import "./App.css";
import BookList from "./component/BookList";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import AddBook from "./component/AddBook";
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});
function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        hello
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
