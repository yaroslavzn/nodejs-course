// Object property shorthand

// const name = "Rick";
// const userAge = 26;

// const user = {
//   name,
//   age: userAge,
//   location: "Poltava"
// };

// console.log(user);

// Object destructuring

const product = {
  name: "MacBook Pro",
  price: 1750,
  ram: 16,
  cpu: "Core i7"
};

const { name, price } = product;

// console.log(name, price);

const transaction = (type, { name, ram, cpu }) => {
  console.log(name, ram, cpu, type);
};

transaction("order", product);
