/* eslint-disable react/prop-types */
import Image from 'next/image';
import Link from 'next/link';

const API_BASE_URL = 'https://chemis-tree-290c6a7d08a8.herokuapp.com';

export default function CompoundCard({ compoundObj }) {
  const getImgSrc = () => {
    if (compoundObj.model_2d_url) {
      return compoundObj.model_2d_url.startsWith('http') ? compoundObj.model_2d_url
        : `${API_BASE_URL}${compoundObj.model_2d_url}`;
    } if (compoundObj.model_2d) {
      return `${API_BASE_URL}${compoundObj.model_2d}`;
    }
    return null;
  };
  const imgSrc = getImgSrc();

  return (
    <div id="compoundCard">
      <Link href={`/compound/${compoundObj.id}`} passHref>
        <div
          className={`compound ${compoundObj.bonds}`}
          style={{
            cursor: 'pointer',
            width: `${150}px`,
            height: `${150}px`,
            position: 'relative',
          }}
        >
          {imgSrc && (
          <Image
            src={imgSrc}
            alt={`Structure of ${compoundObj.iupac_name}`}
            layout="fill"
            objectFit="contain"
            unoptimized
          />
          )}
        </div>
      </Link>
    </div>
  );
}
