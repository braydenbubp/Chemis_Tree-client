/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { deleteTree, getSingleTree } from '../api/trees';
import { useAuth } from '../utils/context/authContext';
import CompoundCard from './CompoundCard';

const Branches = ({ compounds, depth = 0 }) => {
  if (compounds.length === 0) return null;

  const [root, ...children] = compounds;
  const splitIndex = Math.floor(Math.random() * children.length);
  const leftBranch = children.slice(0, splitIndex);
  const rightBranch = children.slice(splitIndex);

  return (
    <div className="d-flex flex-column align-items-center">
      <CompoundCard compoundObj={root} />
      {children.length > 0 && (
      <>
        <div className="bg-secondary my-2" style={{ width: '1px', height: '2rem' }} />
        <div className="d-flex justify-content-center" style={{ gap: '2rem' }}>
          {leftBranch.length > 0 && <Branches compounds={leftBranch} depth={depth + 1} />}
          {rightBranch.length > 0 && <Branches compounds={rightBranch} depth={depth + 1} />}
        </div>
      </>
      )}
    </div>
  );
};

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
    <div className="container-fluid my-4">
      <h1 className="mb-4 text-center text-white">{tree.name}</h1>

      {tree.compounds && tree.compounds.length > 0 ? (
        <div className="d-flex justify-content-center">
          <Branches compounds={tree.compounds} />
        </div>
      ) : (
        <Alert variant="info">
          <Alert.Heading>No Compounds</Alert.Heading>
          <p>This Tree Is Empty</p>
        </Alert>
      )}

      <div className="mt-4 d-flex justify-content-center">
        {user.uid === tree?.uid?.uid ? (
          <>
            <Button variant="primary" onClick={() => router.push(`/tree/edit/${tree.id}`)} className="me-2">Edit</Button>
            <Button variant="danger" onClick={deleteThisTree}>Delete</Button>
          </>
        ) : (
          <p className="text-muted">View Only</p>
        )}
      </div>
    </div>
  );
}
