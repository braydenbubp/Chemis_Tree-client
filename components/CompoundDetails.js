/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { getSingleCompound } from '../api/compounds';

export default function CompoundDetail({ compoundId }) {
  const [compound, setCompound] = useState(null);

  const getOneCompound = () => {
    getSingleCompound(compoundId).then((data) => {
      setCompound(data);
    });
  };

  useEffect(() => {
    if (compoundId) {
      getOneCompound();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>{compound?.iupac_name}</h1>
      <h1>{compound?.molecular_formula}</h1>
      <h2>{compound?.molecular_weight}</h2>
    </div>
  );
}
