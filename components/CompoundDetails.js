/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Image from 'next/image';
import { deleteCompound, getSingleCompound } from '../api/compounds';

const API_BASE_URL = 'http://localhost:8000';
const PUBCHEM_API_BASE = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug';
const PUBCHEM_VIEW_API_BASE = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound';

export default function CompoundDetail({ compoundId }) {
  const [compound, setCompound] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cidData, setCidData] = useState(null);
  const [description, setDescription] = useState('');

  const router = useRouter();

  const getCidData = async (cid) => {
    try {
      const response = await fetch(`${PUBCHEM_API_BASE}/compound/cid/${cid}/JSON`);
      if (!response.ok) {
        throw new Error('failed to get data');
      }
      const data = await response.json();
      setCidData(data.PC_Compounds[0]);
    } catch (err) {
      console.warn(err);
    }
  };

  const getDescription = async (cid) => {
    try {
      const response = await fetch(`${PUBCHEM_VIEW_API_BASE}/${cid}/JSON`);
      if (!response.ok) {
        throw new Error('failed to get description');
      }
      const data = await response.json();
      const descriptionSection = data.Record.Section.find((section) => section.TOCHeading === 'Names and Identifiers');
      const descriptionRecord = descriptionSection?.Section.find((section) => section.TOCHeading === 'Record Description');
      setDescription(descriptionRecord?.Information[0]?.Value?.StringWithMarkup[0]?.String || 'No description available.');
    } catch (err) {
      setDescription('Failed to load description.');
    }
  };

  const getOneCompound = async () => {
    setLoading(true);
    try {
      const data = await getSingleCompound(compoundId);
      setCompound(data);
      if (data.cid) {
        await getCidData(data.cid);
        await getDescription(data.cid);
      }
    } catch (error) {
      console.error('Failed to fetch', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (compoundId) {
      getOneCompound();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compoundId]);

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
        {compound?.info_link && (
          <div className="linkInfo">
            <h4>Information on this compound</h4>
          </div>
        )}
        {cidData && (
          <p><strong>InChI:</strong> {cidData.props.find((p) => p.urn.label === 'InChI')?.value?.sval}</p>
        )}
        {description && (
          <p>{description}</p>
        )}
        <a href={compound?.info_link}>For more information go here!</a>
      </div>

      <>
        <Button id="del-compound" onClick={deleteThisCompound}>
          Delete
        </Button>
      </>
    </>
  );
}
