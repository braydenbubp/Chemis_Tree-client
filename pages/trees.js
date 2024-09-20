import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getTreesByUser } from '../api/trees';
import TreeCard from '../components/TreeCard';
import { useAuth } from '../utils/context/authContext';

export default function Trees() {
  const [trees, setTrees] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const getUserTrees = () => {
    getTreesByUser(user.uid).then(setTrees);
  };

  useEffect(() => {
    getUserTrees();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
