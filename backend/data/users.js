import bcrypt from "bcryptjs";

const users = [
  {
    name: "Harshit Khanna",
    email: "harshitkhanna@example.com",
    password: bcrypt.hashSync("harshitkhanna", 10),
    isAdmin: true,
  },
  {
    name: "Jane Doe",
    email: "janedoe@example.com",
    password: bcrypt.hashSync("janedoe", 10),
  },
  {
    name: "John Doe",
    email: "johndoe@example.com",
    password: bcrypt.hashSync("johndoe", 10),
  },
  {
    name: "Cristiano Ronaldo",
    email: "cristiano@example.com",
    password: bcrypt.hashSync("cristiano", 10),
  },
  {
    name: "Leo Messi",
    email: "mesi@example.com",
    password: bcrypt.hashSync("mesi", 10),
  },
];

export default users;
