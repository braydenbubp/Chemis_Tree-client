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
    <div>
      {compounds.map((compound) => (
        <CompoundCard key={compound.id} compoundObj={compound} onUpdate={getCompounds} />
      ))}
    </div>
  );
}
