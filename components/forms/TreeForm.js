/* eslint-disable react/prop-types */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Button, FloatingLabel, Form, Modal, ListGroup,
  Spinner,
} from 'react-bootstrap';
import { createTree, updateTree } from '../../api/trees';
import { getCompoundsByUser } from '../../api/compounds';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  name: '',
  compounds: [],
};

export default function TreeForm({ treeObj }) {
  const [input, setInput] = useState(initialState);
  const [showModal, setShowModal] = useState(false);
  const [userCompounds, setUserCompounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (user) {
      setLoading(true);
      getCompoundsByUser(user.uid).then((compounds) => {
        setUserCompounds(compounds);
        setLoading(false);
      });
    }
  }, [user]);

  useEffect(() => {
    if (treeObj) {
      setInput({
        name: treeObj.name || '',
        compounds: treeObj?.compounds ? treeObj.compounds.map((c) => c.id) : [],
      });
    }
  }, [treeObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((preVal) => ({ ...preVal, [name]: value }));
  };

  const handleCompoundSelection = (compoundId) => {
    setInput((preVal) => ({
      ...preVal,
      compounds: preVal?.compounds.includes(compoundId) ? preVal?.compounds.filter((id) => id !== compoundId) : [...preVal.compounds, compoundId],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...input,
      uid: user.uid,
    };
    if (treeObj?.id) {
      updateTree(treeObj.id, payload).then(() => router.push(`/tree/${treeObj?.id}`));
    } else {
      createTree(payload).then(() => router.push('/trees'));
    }
  };

  const handleModalEdit = () => {
    if (loading) {
      return (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    }
    if (userCompounds.length === 0) {
      return <div>No compounds found, try creating some!</div>;
    }
    return (
      <ListGroup key={`compound-list-${userCompounds.length}`}>
        {userCompounds.map((compound) => (
          <ListGroup.Item
            key={compound.id}
            onClick={() => handleCompoundSelection(compound.id)}
            active={input.compounds.includes(compound.id)}
          >
            {compound.molecular_formula}
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  };

  return (
    <>
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

        <Button onClick={() => setShowModal(true)} className="mb-3">Select Compounds you want to add to this tree</Button>
        <div style={{ color: 'white' }}>Selected Compounds: {input.compounds.length}</div>

        <Button type="submit">{treeObj?.id ? 'Update' : 'Create'} Tree</Button>
      </Form>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Make Selections</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {handleModalEdit()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
