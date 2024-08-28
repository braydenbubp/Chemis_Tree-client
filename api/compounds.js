const endpoint = 'http://localhost:8000';

const getAllCompounds = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/compounds`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleCompound = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/compounds/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createCompound = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/compounds/get_compound_by_element`, {
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

const updateCompound = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/compounds/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteCompound = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/compounds/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getAllCompounds,
  getSingleCompound,
  createCompound,
  updateCompound,
  deleteCompound,
};
