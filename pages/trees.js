import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getAllTrees } from '../api/trees';
import TreeCard from '../components/TreeCard';

export default function Trees() {
  const [trees, setTrees] = useState([]);
  const router = useRouter();

  const getUserTrees = () => {
    getAllTrees().then(setTrees);
  };

  useEffect(() => {
    getUserTrees();
  }, []);

  return (
    <div>
      <Button onClick={() => { router.push('/tree/new'); }}>
        Create a new Tree
      </Button>
      {trees.map((tree) => (
        <TreeCard key={tree.id} treeObj={tree} onUpdate={getUserTrees} />
      ))}
    </div>
  );
}
