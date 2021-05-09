import axios from "axios";

const { data: data1 } = await axios.get(
  "https://jsonplaceholder.typicode.com/todos/1"
);
console.log(data1);

const { data: data2 } = await axios.get(
  "https://jsonplaceholder.typicode.com/todos/2"
);

const { data: data3 } = await axios.get(
  "https://jsonplaceholder.typicode.com/todos/2"
);
const { data: data4 } = await axios.get(
  "https://jsonplaceholder.typicode.com/todos/2"
);
const { data: data5 } = await axios.get(
  "https://jsonplaceholder.typicode.com/todos/2"
);
const { data: data6 } = await axios.get(
  "https://jsonplaceholder.typicode.com/todos/2"
);
const { data: data7 } = await axios.get(
  "https://jsonplaceholder.typicode.com/todos/2"
);

console.log("Hello");
console.log(data2);
