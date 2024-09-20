const endpoint = 'https://chemis-tree-290c6a7d08a8.herokuapp.com';

const getAllTrees = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/trees`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleTree = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/trees/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createTree = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/trees`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateTree = (treeId, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/trees/${treeId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteTree = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/trees/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getAllTrees,
  getSingleTree,
  createTree,
  updateTree,
  deleteTree,
};
