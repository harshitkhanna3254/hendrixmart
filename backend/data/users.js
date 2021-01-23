import bcrypt from "bcryptjs";

const users = [
  {
    name: "Harshit Khanna",
    email: "harshitkhanna@gmail.com",
    password: bcrypt.hashSync("harshitkhanna", 10),
    isAdmin: true,
  },
  {
    name: "Jane Doe",
    email: "janedoe@gmail.com",
    password: bcrypt.hashSync("janedoe", 10),
  },
  {
    name: "John Doe",
    email: "johndoe@gmail.com",
    password: bcrypt.hashSync("johndoe", 10),
  },
];

export default users;
