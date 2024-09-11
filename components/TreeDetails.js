/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { deleteTree, getSingleTree } from '../api/trees';

export default function TreeDetail({ treeId }) {
  const [tree, setTree] = useState([]);

  const router = useRouter();

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
      <Button id="del-compound" onClick={deleteThisTree}>
        Delete
      </Button>
    </>

  );
}
