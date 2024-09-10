/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { deleteCompound, getSingleCompound } from '../api/compounds';

export default function CompoundDetail({ compoundId }) {
  const [compound, setCompound] = useState(null);

  const router = useRouter();

  const getOneCompound = () => {
    getSingleCompound(compoundId).then((data) => {
      setCompound(data);
    });
  };

  const deleteThisCompound = () => {
    if (window.confirm(`Delete ${compound.molecular_formula}`)) {
      deleteCompound(compound.id).then(() => router.push('/compounds'));
    }
  };

  useEffect(() => {
    if (compoundId) {
      getOneCompound();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        <h1>{compound?.iupac_name}</h1>
        <h1>{compound?.molecular_formula}</h1>
        <h2>{compound?.molecular_weight}</h2>
      </div>
      <>
        <Button id="del-compound" onClick={deleteThisCompound}>
          Delete
        </Button>
      </>
    </>
  );
}
