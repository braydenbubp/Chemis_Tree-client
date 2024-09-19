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
    <>
      <h3 className="text-center my-4 text-white">Create trees to connect compounds in various ways</h3>
      <div className="text-center my-4">
        <Button onClick={() => { router.push('/tree/new'); }}>
          Create a new Tree
        </Button>
      </div>
      <div className="display">
        {trees.map((tree) => (
          <TreeCard key={tree.id} treeObj={tree} onUpdate={getUserTrees} />
        ))}
        <style>
          {`
          .display {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(${150}px, 1fr));
            gap: 12px;
            padding: 16px;
          }
        `}
        </style>
      </div>
    </>
  );
}
