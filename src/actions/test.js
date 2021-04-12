const axios = require("axios");
const promises = [];

for (let i = 0; i < 5; i++) {
  promises.push(axios.get(`https://fakestoreapi.com/carts/user/${i}`));
}
const getCarts = async () => {
  const a = await Promise.all(promises);
  console.log(a.map((item) => item.data));
};

getCarts();
