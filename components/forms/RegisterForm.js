/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createNewUser, patchUser } from '../../api/users';

export default function RegisterForm({ user }) {
  const update = user?.id;

  const { oAuthUser, updateUser } = useAuth();

  const initialState = {
    name: '',
    uid: oAuthUser.uid,
  };

  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    if (user?.id) {
      setFormInput(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((preVal) => ({ ...preVal, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!update) {
      createNewUser(formInput).then(() => {
        updateUser(oAuthUser.uid).then(() => {
          router.push('/');
        });
      });
    } else {
      patchUser(formInput, user.id).then(() => {
        updateUser(oAuthUser.uid).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <form className="new-user-form" onSubmit={handleSubmit}>
      {update ? (
        (<h1> Update your info:</h1>)
      ) : <h1> Shwelcome - Please Do This:</h1>}
      <div className="field">
        <label className="label" htmlFor="name">Name</label>
        <div className="control">
          <input
            name="name"
            className="form-control"
            value={formInput.first_name}
            onChange={handleChange}
            placeholder="Name..."
          />
        </div>
      </div>
    </form>
  );
}
