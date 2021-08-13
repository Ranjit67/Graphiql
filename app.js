const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();
// database connection
mongoose.connect(
  "mongodb+srv://ranjit_7:jW9GyIvTsq8OOztF@cluster0.y5crp.mongodb.net/learningAccessoriesDb?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true }
);
mongoose.connection.on("open", () => {
  console.log("Connection establish complete");
});
// bind express with graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
