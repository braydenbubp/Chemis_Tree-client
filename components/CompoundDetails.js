/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Image from 'next/image';
import { deleteCompound, getSingleCompound } from '../api/compounds';

const API_BASE_URL = 'http://localhost:8000';

export default function CompoundDetail({ compoundId }) {
  const [compound, setCompound] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const getOneCompound = () => {
    setLoading(true);
    getSingleCompound(compoundId).then((data) => {
      setCompound(data);
      setLoading(false);
    }).catch((error) => {
      console.error('Failed to fetch', error);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (compoundId) {
      getOneCompound();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!compound) {
    return <div>No Compound Found</div>;
  }

  const deleteThisCompound = () => {
    if (window.confirm(`Delete ${compound.molecular_formula}`)) {
      deleteCompound(compound.id).then(() => router.push('/compounds'));
    }
  };
  console.warn(compound);
  const getImgSrc = () => {
    if (compound.model_2d_url) {
      return compound.model_2d_url.startsWith('http') ? compound.model_2d_url
        : `${API_BASE_URL}${compound.model_2d_url}`;
    } if (compound.model_2d) {
      return `${API_BASE_URL}${compound.model_2d}`;
    }
    return null;
  };
  const imgSrc = getImgSrc();

  return (
    <>
      <div>
        <h1>{compound?.iupac_name}</h1>
        <h1>{compound?.molecular_formula}</h1>
        <h2>{compound?.molecular_weight}</h2>
        <div className="compound-img">
          {imgSrc && (
          <Image
            src={imgSrc}
            alt={`Structure of ${compound.iupac_name}`}
            width={300}
            height={300}
            layout="responsive"
            objectFit="contain"
            unoptimized
          />
          )}

        </div>
      </div>
      <>
        <Button id="del-compound" onClick={deleteThisCompound}>
          Delete
        </Button>
      </>
    </>
  );
}
