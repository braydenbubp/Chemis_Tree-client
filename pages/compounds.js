import { useEffect, useState } from 'react';
import { getCompoundsByUser } from '../api/compounds';
import CompoundCard from '../components/CompoundCard';
import { useAuth } from '../utils/context/authContext';

export default function Compounds() {
  const [compounds, setCompounds] = useState([]);

  const { user } = useAuth();

  const getCompounds = () => {
    getCompoundsByUser(user.uid).then(setCompounds);
  };

  useEffect(() => {
    getCompounds();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="display">
      {compounds.map((compound) => (
        <CompoundCard key={compound.id} compoundObj={compound} onUpdate={getCompounds} />
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
  );
}
