function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export function getData(category = "tents") {
  return fetch(`../json/${category}.json`)
    .then(convertToJson)
    .then((data) => data);// or witten as .then(function(data) { return data; })
}

export async function findProductById(id) {
  const products = await getData();
  return products.find((item) => item.Id === id); // or written as return products.find(function(item) { return item.Id === id; })
}