/* eslint-disable react/prop-types */
import Link from 'next/link';
import { Button } from 'react-bootstrap';

export default function CompoundCard({ compoundObj }) {
  return (
    <>
      <Link href={`/compound/${compoundObj.id}`} passHref>
        <Button id="compoundView" className={`compound ${compoundObj.bonds}`}>
          {compoundObj.iupac_name}
        </Button>
      </Link>
    </>
  );
}
