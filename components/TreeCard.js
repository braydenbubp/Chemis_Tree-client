/* eslint-disable react/prop-types */
import Link from 'next/link';
import { Button } from 'react-bootstrap';

export default function TreeCard({ treeObj }) {
  return (
    <>
      <Link href={`/tree/${treeObj.id}`} passHref>
        <Button id="treeView" className="trees">
          {treeObj.name}
        </Button>
      </Link>
    </>
  );
}
