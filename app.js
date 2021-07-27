const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Event = require("./module/event");
const User = require("./module/user");
const user = require("./module/user");
const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const dataUser = async (userId) => {
  try {
    if (!userId) return;
    const userData = await User.findById(userId);
    if (!userData) throw new Error("The user data...");
    return { ...userData._doc, _id: userData.id };
  } catch (error) {
    return error;
  }
};
app.use(
  "/graphql",
  graphqlHttp.graphqlHTTP({
    schema: buildSchema(`
    type event {
      _id:ID!
      title:String!
      description:String!
      price:Float!
      date:String!
      creator: user!
    }
    type user {
      _id:ID
      email:String!
      password:String
      createdEvents:[event!]
    }
    input eventInput {
      title:String!
      description:String!
      price:Float!
    }
    input userInput {
      email:String!
      password:String!
    }
          type RootQuery {
              events: [event!]!
          }
          type RootMutation {
              createEvent(eventInput: eventInput): event
              createUser(userInput:userInput):user
          }
          schema {
              query: RootQuery
              mutation: RootMutation
          }
      `),
    rootValue: {
      events: async () => {
        const findData = await Event.find();

        return findData.map(async (ev) => {
          console.log(ev);
          return {
            ...ev._doc,
            _id: ev._doc._id.toString(),
            creator: await dataUser.bind(this, ev._doc.creator),
          };
        });
      },
      createEvent: async (args) => {
        try {
          const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: args.eventInput.price,
            date: new Date().toISOString(),
            creator: "608a147928ba093ed42b477e",
          });
          const saver = await event.save();
          const userCheck = await User.findById("608a147928ba093ed42b477e");
          if (!userCheck) throw new Error("User not found..");
          userCheck.createdEvents.push(event);
          userCheck.save();
          return { ...saver._doc };
        } catch (error) {
          return error;
        }
      },
      createUser: async (args) => {
        try {
          const findUser = await User.findOne({ email: args.userInput.email });
          if (findUser) throw new Error("User exit already");
          const hash = await bcrypt.hash(args.userInput.password, 10);
          const user = new User({
            email: args.userInput.email,
            password: hash,
          });
          const saver = await user.save();
          return { ...saver._doc, password: null, _id: user.id };
          //   const findUser = await User.findById("608a147928ba093ed42b477e")
          // if(findUser) throw new Error("User exit already..")
          // const push = await user.createEvent.push(event)
          // return await push.save()
        } catch (error) {
          return error;
        }
      },
    },
    graphiql: true,
  })
);
//database connection
mongoose.connect(
  `mongodb+srv://fghgfgfgh_5:IkByHjFSSbgcWBeG@cluster0.b5vz0.mongodb.net/EventDB?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.on("connected", () => {
  console.log("connection successful...");
});
mongoose.connection.on("error", (err) => {
  console.log(err);
});
//database connection end
app.listen(4000, () => {
  console.log("4000 port is ready to start...");
});

//mongodb+srv://fghgfgfgh_5:IkByHjFSSbgcWBeG@cluster0.b5vz0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//fghgfgfgh_5
//IkByHjFSSbgcWBeG
//mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
//https://downloads.mongodb.org/windows/mongodb-shell-windows-x86_64-4.4.5.zip
