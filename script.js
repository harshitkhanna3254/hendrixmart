import axios from "axios";

// const { data: data1 } = await axios.get(
//   "https://jsonplaceholder.typicode.com/todos/1"
// );
// console.log(data1);

// const { data: data2 } = await axios.get(
//   "https://jsonplaceholder.typicode.com/todos/2"
// );

// const { data: data3 } = await axios.get(
//   "https://jsonplaceholder.typicode.com/todos/2"
// );
// const { data: data4 } = await axios.get(
//   "https://jsonplaceholder.typicode.com/todos/2"
// );
// const { data: data5 } = await axios.get(
//   "https://jsonplaceholder.typicode.com/todos/2"
// );
// const { data: data6 } = await axios.get(
//   "https://jsonplaceholder.typicode.com/todos/2"
// );
// const { data: data7 } = await axios.get(
//   "https://jsonplaceholder.typicode.com/todos/2"
// );

const timeElapsed = Date.now();
console.log(typeof timeElapsed + " :: " + timeElapsed);

const today = new Date(timeElapsed);
console.log(typeof today + " :: " + today);

console.log(typeof today.toLocaleString() + " :: " + today.toLocaleString());
// console.log("Hello");
// console.log(data2);

const d = new Date("2021-05-11T19:28:54.212Z");
console.log(d);
