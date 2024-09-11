/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { deleteTree, getSingleTree } from '../api/trees';
import { useAuth } from '../utils/context/authContext';

export default function TreeDetail({ treeId }) {
  const [tree, setTree] = useState([]);

  const router = useRouter();
  const { user } = useAuth();

  const getOneTree = () => {
    getSingleTree(treeId).then((data) => {
      setTree(data);
    });
  };

  const deleteThisTree = () => {
    if (window.confirm(`Delete ${tree.name}`)) {
      deleteTree(tree.id).then(() => router.push('/trees'));
    }
  };

  useEffect(() => {
    getOneTree();
  }, []);

  return (
    <>
      <>
        <h1>{tree?.name}</h1>
      </>
      <h3>Compounds: </h3>
      <ListGroup>
        {tree.compounds && tree.compounds.length > 0 ? (
          tree.compounds.map((compound) => (
            <ListGroup.Item key={compound.id}>
              {compound.iupac_name} - {compound.molecular_formula}
              <div>
                <Button onClick={() => { router.push(`/compound/${compound.id}`); }}>
                  View
                </Button>
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>This Tree Is Empty</ListGroup.Item>
        )}

      </ListGroup>
      {user.uid === tree?.uid?.uid ? (
        <>
          <Button onClick={() => router.push(`/tree/edit/${tree.id}`)}>Edit</Button>
          <Button id="del-compound" onClick={deleteThisTree}>
            Delete
          </Button>
        </>

      ) : (
        <p>View Only</p>
      )}
    </>

  );
}
