const endpoint = 'https://chemis-tree-290c6a7d08a8.herokuapp.com';

const getAllElements = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/elements`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleElement = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/elements/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getAllElements,
  getSingleElement,
};
