import { useEffect, useState } from 'react';
import { getAllCompounds } from '../api/compounds';
import CompoundCard from '../components/CompoundCard';

export default function Compounds() {
  const [compounds, setCompounds] = useState([]);

  const getCompounds = () => {
    getAllCompounds().then(setCompounds);
  };

  useEffect(() => {
    getCompounds();
  }, []);

  return (
    <div>
      {compounds.map((compound) => (
        <CompoundCard key={compound.id} compoundObj={compound} onUpdate={getAllCompounds} />
      ))}
    </div>
  );
}
