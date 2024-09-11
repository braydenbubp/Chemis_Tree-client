/* eslint-disable react/prop-types */
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { createTree, updateTree } from '../../api/trees';

const initialState = {
  name: '',
};

export default function TreeForm({ user, treeObj }) {
  const [input, setInput] = useState(initialState);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((preVal) => ({ ...preVal, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...input,
      uid: user.uid,
    };
    if (treeObj?.id) {
      updateTree(payload).then(() => router.push(`/trees/${treeObj.id}`));
    } else {
      createTree(payload).then(() => router.push('/trees'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{treeObj?.id ? 'Update' : 'Create'} Tree</h2>
      <FloatingLabel controlId="floatingInput1" label="Give your tree a name!" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Give your tree a name!"
          name="name"
          value={input.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button type="submit">{treeObj?.id ? 'Update' : 'Create'} Tree</Button>
    </Form>
  );
}
